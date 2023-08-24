"use client";
import Button from "@/components/atoms/buttons";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";
import FormPost from "@/components/templates/FormPost";
import { PathConstant } from "@/constants";
import { useAdminContent } from "@/context/AdminProvider";
import Toast from "@/libs/toastify";
import { createNewPost } from "@/services/post.service";
import { IPostRequest } from "@/types/post.type";
import { useRouter } from "next/navigation";

function PostCreatePage() {
  const router = useRouter();
  const { fetchWithLoading } = useAdminContent();

  const handleCreatePost = (post: IPostRequest) => {
    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });
    fetchWithLoading(async () => {
      await createNewPost(formData).then(() => {
        Toast.success({ message: "Post has been successfully created!" });
        router.push(PathConstant.ROUTE_ADMIN_POST);
      });
    });
  };

  return (
    <div className="px-4 py-6">
      <Button
        variant="text"
        color="info"
        onClick={() => router.push(PathConstant.ROUTE_ADMIN_POST)}>
        <span className="flex items-center gap-2">
          <IconArrowDown width={10} className="rotate-90" /> Back to List Post
        </span>
      </Button>

      <FormPost onSubmit={handleCreatePost} />
    </div>
  );
}

export default PostCreatePage;
