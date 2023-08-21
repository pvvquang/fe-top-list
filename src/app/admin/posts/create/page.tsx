"use client";
import Button from "@/components/atoms/buttons";
import UploadFile from "@/components/atoms/dragdrop";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";
import InputField from "@/components/atoms/inputs/InputField";
import { IPostState } from "@/types/post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  slug: yup.string().required(),
  content: yup.string(),
  userId: yup.string(),
  categoryId: yup.number(),
  thumbnail: yup
    .mixed()
    .test("thumbnail", "You need to provide a file", (value: any) => {
      if (value.length > 0) return true;
      return false;
    }),
});

function PostCreatePage() {
  const form = useForm<IPostState>({
    resolver: yupResolver(schema),
  });

  console.log({ form });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
  } = form;

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  console.log({ errors, defaultValues: getValues() });

  return (
    <div className="px-4 py-6">
      <Button variant="text" color="info" onClick={() => {}}>
        <span className="flex items-center gap-2">
          <IconArrowDown width={10} className="rotate-90" /> Back to List Post
        </span>
      </Button>
      <form
        className="px-4 py-2  mt-3 border rounded-md"
        onSubmit={handleSubmit(onSubmit)}>
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
          <UploadFile
            label="Thumbnail"
            {...register("thumbnail")}
            errorMessage={errors.thumbnail?.message}
            onDeleteFile={() => resetField("thumbnail")}
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
    </div>
  );
}

export default PostCreatePage;
