import { User } from "./auth.type";
import { Category } from "./category.type";
import { IMedia } from "./media.type";

export interface IPostState {
  title: string;
  slug: string;
  content: string;
  userId?: string;
  categoryId: number;
  thumbnail?: IMedia;
  file?: FileList | null;
  imageKeys: string[];
  type?: string;
  trending?: boolean;
  author?: string;
  meta?: string;
}

export interface IPost extends Omit<IPostState, "thumbnail"> {
  id: string;
  user: User;
  category: Category;
  isPublish: boolean;
  publishedAt: Date;
  thumbnail: IMedia;
}

export interface IPostRequest
  extends Omit<IPostState, "thumbnail" | "trending" | "file"> {
  file: File;
  trending?: boolean;
}
