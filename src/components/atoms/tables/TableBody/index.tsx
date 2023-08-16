import ConditionalRender from "../../ConditionalRender";
import { TableColumn } from "../table.type";

interface IProps {
  columns: TableColumn[];
  rows: any[];
  useCheckbox?: boolean;
}

function TableBody({ rows, useCheckbox, columns }: IProps) {
  return (
    <tbody>
      <ConditionalRender conditional={!!rows.length} fallback={<TableNoData />}>
        {rows.map((row, i) => (
          <tr key={i}>
            {useCheckbox && (
              <td>
                <input type="checkbox" />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.id}>
                <div>{row[column.id]}</div>
              </td>
            ))}
          </tr>
        ))}
      </ConditionalRender>
    </tbody>
  );
}

function TableNoData() {
  return (
    <tr>
      <td colSpan={100}>No Data</td>
    </tr>
  );
}

export default TableBody;
