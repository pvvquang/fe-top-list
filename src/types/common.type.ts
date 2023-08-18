export interface SelectOption {
  id: number | string;
  label: string;
}

export interface Metadata {
  totalItems: number;
  totalPages: number;
}

export interface ListResponse<T> {
  data: T;
  metadata: Metadata;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IModalState<T> {
  data: T | null;
  open: boolean;
}
