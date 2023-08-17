import { TableColumn, getALignmentClass } from "..";

interface IProps {
  useCheckbox?: boolean;
  columns: TableColumn[];
}

function TableHead({ useCheckbox, columns }: IProps) {
  return (
    <thead className="text-xs text-gray-700 bg-gray-200">
      <tr>
        {useCheckbox && (
          <th className="px-6 py-3">
            <input type="checkbox" />
          </th>
        )}
        {columns.map((column) => (
          <TableHead.Item key={column.id} column={column} />
        ))}
      </tr>
    </thead>
  );
}

TableHead.Item = function TableHeaderItem({ column }: { column: TableColumn }) {
  return (
    <th className="px-6 py-3">
      <div className={`flex ${getALignmentClass(column.align)}`}>
        {column.label}
      </div>
    </th>
  );
};

export default TableHead;
