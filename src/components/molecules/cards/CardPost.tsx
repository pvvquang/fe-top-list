import Button from "@/components/atoms/buttons";
import { IPost } from "@/types/post.type";
import Image from "next/image";

interface IProps {
  post: IPost;
  onView?: (post: IPost) => void;
  onEdit?: (post: IPost) => void;
  onDelete?: (post: IPost) => void;
}

function CardPost({ post, onView, onDelete, onEdit }: IProps) {
  return (
    <div className="border rounded-md overflow-hidden flex flex-col relative">
      <div className="relative h-[250px] group">
        <Image
          className=""
          src={post.thumbnail.link}
          alt={post.thumbnail.originalName}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-0 transition-all group-hover:opacity-60 duration-300" />
        <div className="absolute inset-0 z-10  flex items-center justify-center gap-2 transition-all opacity-0 group-hover:opacity-100 duration-300">
          <Button
            label="View"
            color="info"
            onClick={() => onView && onView(post)}
          />
          <Button label="Edit" onClick={() => onEdit && onEdit(post)} />
          <Button
            label="Delete"
            color="error"
            onClick={() => onDelete && onDelete(post)}
          />
        </div>
      </div>
      <div className="px-3 pt-2 pb-4 text-gray-600">
        <div
          className="truncate font-semibold text-md text-black"
          title={post.title}>
          {post.title}
        </div>
        <div className="text-sm mt-1">
          {new Date(post.publishedAt).toUTCString()}
        </div>
        <div className="text-sm mt-1">{post.category.categoryName}</div>
      </div>
    </div>
  );
}

export default CardPost;
