"use client";

import FormPost from "@/components/templates/FormPost";
import { getPostById } from "@/services/post.service";
import { IPost, IPostState } from "@/types/post.type";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function PostEditPage() {
  const params = useParams();
  //state
  const [postInfo, setPostInfo] = useState<IPost | null>(null);

  const postState: IPostState = useMemo(() => {
    const result: IPostState = {
      title: postInfo?.title || "",
      slug: postInfo?.slug || "",
      content: postInfo?.content || "",
      userId: postInfo?.user.id || "",
      categoryId: postInfo?.category.id || 0,
      imageKeys: postInfo?.imageKeys || [],
      trending: postInfo?.trending || false,
      type: postInfo?.type || "",
      author: postInfo?.author || "",
      meta: postInfo?.meta || "",
      thumbnail: postInfo?.thumbnail,
    };
    return result;
  }, [postInfo]);

  //side-effect
  useEffect(() => {
    if (!params.id) return;
    getPostById(params.id as string).then((res) => setPostInfo(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ postInfo });
  return (
    <div>
      <FormPost onSubmit={() => {}} formDataProp={postState} />
    </div>
  );
}

export default PostEditPage;
