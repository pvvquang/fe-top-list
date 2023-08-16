import { TableColumn } from "../table.type";

interface IProps {
  useCheckbox?: boolean;
  columns: TableColumn[];
}

function TableHead({ useCheckbox, columns }: IProps) {
  return (
    <thead>
      <tr>
        {useCheckbox && (
          <th>
            <input type="checkbox" />
          </th>
        )}
        {columns.map((column) => (
          <th key={column.id}>
            <div className={`flex`}>{column.label}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
