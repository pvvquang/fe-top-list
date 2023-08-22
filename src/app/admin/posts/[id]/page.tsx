"use client";

import { getPostById } from "@/services/post.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IPost } from "@/types/post.type";

function PostDetail() {
  const params = useParams();

  const [postInfo, setPostInfo] = useState<IPost | null>(null);

  useEffect(() => {
    if (!params.id) return;
    getPostById(params.id as string).then((res) => setPostInfo(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ postInfo });

  return (
    <div className="p-4">
      <div className="mb-2">{postInfo?.title}</div>
      <div className="mb-2">{postInfo?.slug}</div>
      <div className="mb-2">{postInfo?.author}</div>
      <div className="mb-2">{postInfo?.category.categoryName}</div>
      <div
        className="mb-2"
        dangerouslySetInnerHTML={{ __html: postInfo?.content || "" }}
      />
    </div>
  );
}

export default PostDetail;
