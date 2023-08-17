export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  sortBy?: string;
  orderBy?: "asc" | "desc";
  ellipsisNumber?: number;
  actions?: Array<"delete" | "edit">;
}
