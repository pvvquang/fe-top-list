"use client";
import Select from "@/components/atoms/Select";
import UploadFile from "@/components/atoms/UploadFile";
import Button from "@/components/atoms/buttons";
import InputField from "@/components/atoms/inputs/InputField";
import { useAdminContent } from "@/context/AdminProvider";
import { fetchCategories } from "@/services/category.service";
import { deleteMediaByKey } from "@/services/media.service";
import { SelectOption } from "@/types/common.type";
import { IPostRequest } from "@/types/post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Editor from "../atoms/editor/Editor";

const schema = yup.object({
  title: yup.string().required("Input field required"),
  slug: yup.string().required("Input field required"),
  content: yup.string().required("Input field required"),
  userId: yup.string(),
  categoryId: yup
    .number()
    .typeError("Input field required")
    .nullable()
    .required(),
  thumbnail: yup
    .mixed<FileList>() // Pass in the type of `fileUpload`
    .test("thumbnail", "You need to provide a file", (files) => {
      if (files && files.length > 0) return true;
      return false;
    }),
  imageKeys: yup.array<string[]>(),
  trending: yup.boolean(),
  type: yup.string(),
  author: yup.string(),
  meta: yup.string(),
});

type FormValues = yup.InferType<typeof schema>;

interface IProps {
  onSubmit: (data: IPostRequest) => void;
}

function FormPost({ onSubmit }: IProps) {
  const [categories, setCategories] = useState<SelectOption[]>([]);

  const { userInfo } = useAdminContent();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    control,
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
  });

  console.log(getValues());

  const _onSubmit: SubmitHandler<FormValues> = (data) => {
    const newPost: IPostRequest = {
      title: data.title,
      slug: data.slug,
      content: passImageKeyToContent(data.content, data.imageKeys),
      userId: userInfo?.id || "",
      categoryId: data.categoryId,
      file: data.thumbnail?.[0] as File,
      imageKeys: data.imageKeys || [],
      type: data.type || "",
      // trending: data.trending || false,
      author: data.author || "",
      meta: data.author || "",
    };
    console.log({ newPost });

    onSubmit(newPost);
  };

  function passImageKeyToContent(content: string, imageKeys?: string[]) {
    if (!imageKeys || !imageKeys.length) return content;
    const imageKeysUsed = new Set<string>();
    const newDiv = document.createElement("div");
    newDiv.innerHTML = content;
    const imgElements = newDiv.querySelectorAll("img");
    console.log({ imgElements }, newDiv.innerHTML);
    // loop img element to replace source link to image keys
    Array.from(imgElements).forEach((element) => {
      const sourceImage = element.getAttribute("src");
      console.log({ sourceImage });
      if (!sourceImage) return;
      const imgKeyFound = imageKeys.find((c) => sourceImage.includes(c));
      console.log({ imgKeyFound });
      if (!imgKeyFound) return;
      element.setAttribute("src", `{{${imgKeyFound}}}`);
      imageKeysUsed.add(imgKeyFound);
    });
    console.log({ imageKeysUsed });
    // handle delete imageKeys don't use
    const imageKeysNotUsed = imageKeys.filter((key) => !imageKeysUsed.has(key));
    if (imageKeysNotUsed.length) {
      imageKeysNotUsed.forEach((key) => deleteMediaByKey(key));
    }

    return newDiv.innerHTML;
  }

  useEffect(() => {
    fetchCategories("").then((response) => {
      const categoriesOption: SelectOption[] = response.data.map(
        (category) => ({
          id: category.id,
          label: category.categoryName,
        })
      );
      categoriesOption.unshift({
        id: "none",
        label: "Choose a option",
      });
      setCategories(categoriesOption);
    });
  }, []);

  return (
    <form
      className="px-4 py-2  mt-3 border rounded-md"
      onSubmit={handleSubmit(_onSubmit)}>
      <div className="mt-2">
        <InputField
          label="Title"
          placeholder="Enter title..."
          {...register("title")}
          errorMessage={errors.title?.message}
        />
      </div>
      <div className="mt-3">
        <InputField
          label="Slug"
          placeholder="Enter slug..."
          {...register("slug")}
          errorMessage={errors.slug?.message}
        />
      </div>
      <div className="mt-3">
        <InputField
          label="Meta"
          placeholder="Enter meta..."
          {...register("meta")}
        />
      </div>
      <div className="mt-3">
        <Select
          label="Category"
          options={categories}
          {...register("categoryId")}
          errorMessage={errors.categoryId?.message}
        />
      </div>
      <div className="mt-3">
        <UploadFile
          label="Thumbnail"
          {...register("thumbnail")}
          errorMessage={errors.thumbnail?.message}
          onDeleteFile={() => resetField("thumbnail")}
        />
      </div>

      <div className="mt-3">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors },
          }) => (
            <Editor
              label="Content"
              keyName="post-editor"
              value={value || ""}
              onChange={(data) => setValue("content", data)}
              onBlur={onBlur}
              onChangeFile={(data) =>
                setValue(
                  "imageKeys",
                  data.map((c) => c.key)
                )
              }
              errorMessage={errors.content?.message}
            />
          )}
        />
      </div>

      <Button
        classNameProps="mt-6"
        label="Submit"
        variant="contained"
        onClick={() => {}}
        type="submit"
      />
    </form>
  );
}

export default FormPost;
