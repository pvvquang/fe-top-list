import { User } from "./auth.type";
import { Category } from "./category.type";
import { IMedia } from "./media.type";

export interface IPostState {
  title: string;
  slug: string;
  content: string;
  userId: string;
  categoryId: number;
  thumbnail: IMedia | File | null;
  imageKeys: string[];
  type: string;
  trending: boolean;
  author: string;
  meta: string;
}

export interface IPost extends IPostState {
  id: string;
  user: User;
  category: Category;
  isPublish: boolean;
  publishedAt: Date;
}
