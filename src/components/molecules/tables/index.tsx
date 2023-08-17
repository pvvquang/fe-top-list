import Pagination from "@/components/atoms/Pagination";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import SelectController from "@/components/atoms/Select/SelectController";
import ConditionalRender from "@/components/atoms/ConditionalRender";

export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  sortBy?: string;
  orderBy?: "asc" | "desc";
  ellipsisNumber?: number;
  actions?: Array<"delete" | "edit">;
}

interface TableProps {
  columns: TableColumn[];
  rows: any[];
  useCheckbox?: boolean;
}

const PAGE_SIZES = [
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 50, label: "50" },
  { id: 100, label: "100" },
];

const PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 10,
};

function TableBase({ columns, rows, useCheckbox = false }: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead columns={columns} useCheckbox={useCheckbox} />
        <TableBody columns={columns} rows={rows} useCheckbox={useCheckbox} />
      </table>

      <ConditionalRender conditional={!!rows.length}>
        <div className="flex justify-between mt-4">
          <SelectController
            onChange={(e) => {}}
            defaultValue={PAGINATION.PAGE_SIZE}
            options={PAGE_SIZES}
          />
          <Pagination
            page={PAGINATION.PAGE}
            totalPage={10}
            onPageChange={() => {}}
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
