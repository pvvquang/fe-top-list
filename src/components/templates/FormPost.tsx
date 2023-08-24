"use client";
import Select from "@/components/atoms/Select";
import UploadFile from "@/components/atoms/UploadFile";
import Button from "@/components/atoms/buttons";
import InputField from "@/components/atoms/inputs/InputField";
import { useAdminContent } from "@/context/AdminProvider";
import { fetchCategories } from "@/services/category.service";
import { deleteMediaByKey } from "@/services/media.service";
import { SelectOption } from "@/types/common.type";
import { IPostRequest, IPostState } from "@/types/post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Editor from "../atoms/editor/Editor";
import ConditionalRender from "../atoms/ConditionalRender";

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
  file: yup
    .mixed<FileList>()
    .test("thumbnail", "You need to provide a file", (files) => {
      if (files && files.length > 0) return true;
      return false;
    })
    .nullable()
    .required(),
  imageKeys: yup.array().of(yup.string().required()).required(),
  trending: yup.boolean(),
  type: yup.string(),
  author: yup.string(),
  meta: yup.string(),
});

type FormValues = yup.InferType<typeof schema>;

interface IProps {
  onSubmit: (data: IPostRequest) => void;
  formDataProp?: IPostState;
}

function FormPost({ onSubmit, formDataProp }: IProps) {
  const [categories, setCategories] = useState<SelectOption[]>([]);

  const { userInfo } = useAdminContent();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    resetField,
    control,
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log(getValues(), { errors, formDataProp });

  const _onSubmit: SubmitHandler<IPostState> = (data) => {
    const newPost: IPostRequest = {
      title: data.title,
      slug: data.slug,
      content: passImageKeyToContent(data.content, data.imageKeys),
      userId: userInfo?.id || "",
      categoryId: data.categoryId,
      file: data.file?.[0] as File,
      imageKeys: data.imageKeys || [],
      type: data.type || "",
      // trending: data.trending || false,
      author: data.author || "",
      meta: data.meta || "",
    };
    onSubmit(newPost);
  };

  function passImageKeyToContent(content: string, imageKeys?: string[]) {
    if (!imageKeys || !imageKeys.length) return content;
    const imageKeysUsed = new Set<string>();
    const newDiv = document.createElement("div");
    newDiv.innerHTML = content;
    const imgElements = newDiv.querySelectorAll("img");
    // loop img element to replace source link to image keys
    Array.from(imgElements).forEach((element) => {
      const sourceImage = element.getAttribute("src");
      if (!sourceImage) return;
      const imgKeyFound = imageKeys.find((c) => sourceImage.includes(c));
      if (!imgKeyFound) return;
      element.setAttribute("src", `{{${imgKeyFound}}}`);
      imageKeysUsed.add(imgKeyFound);
    });
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

  useEffect(() => {
    if (!formDataProp) return;
    Object.entries(formDataProp).forEach(([key, value]) => {
      setValue(key as any, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataProp]);

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
        <ConditionalRender
          conditional={!formDataProp?.thumbnail && isSubmitted}>
          <UploadFile
            label="Thumbnail"
            {...register("file")}
            errorMessage={errors.file?.message}
            onDeleteFile={() => {
              resetField("file");
              isSubmitted && trigger("file");
            }}
          />
        </ConditionalRender>
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
              onChange={(data) => {
                setValue("content", data);
                isSubmitted && trigger("content");
              }}
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
