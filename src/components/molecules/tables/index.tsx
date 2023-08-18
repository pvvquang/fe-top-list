import ConditionalRender from "@/components/atoms/ConditionalRender";
import Pagination from "@/components/atoms/Pagination";
import SelectController from "@/components/atoms/Select/SelectController";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const PAGE_SIZES = [
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 50, label: "50" },
  { id: 100, label: "100" },
];

export const PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 10,
};

export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  sortBy?: string;
  orderBy?: "asc" | "desc";
  ellipsisNumber?: number;
  actions?: Array<"delete" | "edit">;
}

interface TablePagination {
  page: number;
  totalPages: number;
  totalItems?: number;
}

interface TableProps {
  columns: TableColumn[];
  rows: any[];
  useCheckbox?: boolean;
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
  onChangePage: (page: number) => void;
  onChangePageSize: (pageSize: number) => void;
  pagination: TablePagination;
  loading?: boolean;
}

function TableBase({
  columns,
  rows,
  useCheckbox = false,
  onChangePage,
  onChangePageSize,
  onDelete,
  onEdit,
  pagination,
  loading = false,
}: TableProps) {
  const { page, totalPages, totalItems = 0 } = pagination;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead columns={columns} useCheckbox={useCheckbox} />
        <TableBody
          columns={columns}
          rows={rows}
          useCheckbox={useCheckbox}
          onDelete={onDelete}
          onEdit={onEdit}
          loading={loading}
        />
      </table>

      <ConditionalRender conditional={!!rows.length}>
        <div className="flex justify-between mt-4">
          <SelectController
            onChange={(pageSize) => onChangePageSize(+pageSize)}
            defaultValue={PAGINATION.PAGE_SIZE}
            options={PAGE_SIZES}
          />
          <Pagination
            page={page}
            totalPage={totalPages}
            onPageChange={(page) => onChangePage(+page)}
            className="ml-auto"
          />
        </div>
      </ConditionalRender>
    </div>
  );
}

export const getALignmentClass = (align: TableColumn["align"]) => {
  if (align === "right") {
    return "justify-end";
  } else if (align === "center") {
    return "justify-center";
  } else {
    return "justify-start";
  }
};

export default TableBase;
