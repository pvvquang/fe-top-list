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
    <table>
      <TableHead columns={columns} useCheckbox={useCheckbox} />
      <TableBody columns={columns} rows={rows} useCheckbox={useCheckbox} />
    </table>
  );
}
export default TableBase;
