import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { TableColumn } from "./table.type";

interface TableProps {
  columns: TableColumn[];
  rows: any[];
  useCheckbox?: boolean;
}

function TableBase({ columns, rows, useCheckbox = false }: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead columns={columns} useCheckbox={useCheckbox} />
        <TableBody columns={columns} rows={rows} useCheckbox={useCheckbox} />
      </table>
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
