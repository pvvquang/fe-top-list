"use client";
import Button from "@/components/atoms/buttons";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";
import FormPost from "@/components/templates/FormPost";
import { createNewPost } from "@/services/post.service";
import { IPostRequest } from "@/types/post.type";

function PostCreatePage() {
  const handleCreatePost = (post: IPostRequest) => {
    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });
    createNewPost(formData).then((res: any) => console.log(res));
  };

  return (
    <div className="px-4 py-6">
      <Button variant="text" color="info" onClick={() => {}}>
        <span className="flex items-center gap-2">
          <IconArrowDown width={10} className="rotate-90" /> Back to List Post
        </span>
      </Button>

      <FormPost onSubmit={handleCreatePost} />
    </div>
  );
}

export default PostCreatePage;
