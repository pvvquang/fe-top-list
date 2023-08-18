export interface Category {
  id: number;
  categoryName: string;
}

export interface ResponseCategory {
  message: string;
  data: Category;
}
