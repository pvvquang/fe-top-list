"use client";
import ConditionalRender from "@/components/atoms/ConditionalRender";
import Button from "@/components/atoms/buttons";
import CardPost from "@/components/molecules/cards/CardPost";
import { PAGINATION } from "@/components/molecules/tables";
import ModalConfirm from "@/components/organisms/modals/ModalConfirm";
import { AppConstant, PathConstant } from "@/constants";
import { useAdminContent } from "@/context/AdminProvider";
import Toast from "@/libs/toastify";
import { deletePostById, getListPost } from "@/services/post.service";
import { IModalState, IPagination, Metadata } from "@/types/common.type";
import { IPost } from "@/types/post.type";
import { getQueryStringFromObject } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import stringFormat from "string-format";

function PostPage() {
  const router = useRouter();
  const { fetchWithLoading } = useAdminContent();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [objectQuery, setObjectQuery] = useState<IPagination>({
    page: PAGINATION.PAGE,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [metaData, setMetaData] = useState<Metadata>({
    totalItems: 0,
    totalPages: 0,
  });
  const [popupDeleteState, setPopupDeleteState] = useState<IModalState<IPost>>(
    AppConstant.MODAL_STATE_DEFAULT
  );

  const getPostFromApi = () => {
    const queryPrams = getQueryStringFromObject(objectQuery || {});
    getListPost(queryPrams).then((res) => {
      setPosts(res.data);
      setMetaData(res.metadata);
    });
  };

  const handleDeletePost = async () => {
    const postDeleteId = popupDeleteState.data?.id;
    await fetchWithLoading(async () => {
      if (!postDeleteId) return;
      await deletePostById(postDeleteId).then(() =>
        Toast.success({ message: "The Post has been successfully deleted!" })
      );
    });
  };

  useEffect(() => {
    getPostFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-10 py-12">
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-semibold">List Post</h2>
        <Button
          variant="contained"
          label="Add New Post"
          onClick={() => router.push(PathConstant.ROUTE_ADMIN_POST_CREATE)}
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        <ConditionalRender conditional={!!posts.length}>
          
          {posts.map((post) => (
            <CardPost
              post={post}
              key={post.id}
              onView={({ id }) =>
                router.push(`${PathConstant.ROUTE_ADMIN_POST}/${id}`)
              }
              onEdit={({ id }) =>
                router.push(
                  stringFormat(PathConstant.ROUTE_ADMIN_POST_EDIT, id)
                )
              }
              onDelete={(data) => setPopupDeleteState({ data, open: true })}
            />
          ))}
        </ConditionalRender>
      </div>

      <ConditionalRender conditional={popupDeleteState.open}>
        <ModalConfirm
          title="Delete Post"
          description={`Do you want to delete category ${popupDeleteState.data?.title} ?`}
          onClose={() => setPopupDeleteState(AppConstant.MODAL_STATE_DEFAULT)}
          onSubmit={handleDeletePost}
        />
      </ConditionalRender>
    </div>
  );
}

export default PostPage;
