import Button from "@/components/atoms/buttons";
import { TableColumn, getALignmentClass } from "..";
import ConditionalRender from "../../../atoms/ConditionalRender";
import Dropdown from "@/components/atoms/Dropdown";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";
import { SelectOption } from "@/types/common.type";

interface TableBodyProps {
  columns: TableColumn[];
  rows: any[];
  useCheckbox?: boolean;
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
}

function TableBody({
  rows,
  useCheckbox,
  columns,
  onDelete,
  onEdit,
}: TableBodyProps) {
  return (
    <tbody>
      <ConditionalRender conditional={!!rows.length} fallback={<TableNoData />}>
        {rows.map((row, i) => (
          <tr key={i} className="bg-white border-b">
            {useCheckbox && (
              <td className="px-6 py-4">
                <input type="checkbox" />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.id} className="px-6 py-4">
                <div className={`flex ${getALignmentClass(column.align)}`}>
                  <ConditionalRender
                    conditional={column.id === "actions"}
                    fallback={row[column.id]}>
                    <TableCellAction
                      onDelete={onDelete}
                      onEdit={onEdit}
                      row={row}
                    />
                  </ConditionalRender>
                </div>
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
      <td colSpan={100}>
        <div className="flex justify-center items-center h-[200px] border border-t-0">
          No Data
        </div>
      </td>
    </tr>
  );
}

enum TABLE_ACTIONS {
  EDIT = 1,
  DELETE = 2,
}

const tableActions = [
  { id: TABLE_ACTIONS.EDIT, label: "Edit" },
  { id: TABLE_ACTIONS.DELETE, label: "Delete" },
];

function TableCellAction({
  onDelete,
  onEdit,
  row,
}: Partial<TableBodyProps> & { row: any }) {
  const handleClickAction = (option: SelectOption) => {
    if (option.id === TABLE_ACTIONS.EDIT) {
      onEdit && onEdit(row);
    } else {
      onDelete && onDelete(row);
    }
  };

  return (
    <Dropdown options={tableActions} mode="fixed" onChange={handleClickAction}>
      <Button
        variant="outline"
        onClick={() => {}}
        color="info"
        classNameProps="gap-2 px-4 h-[38px]">
        <span>Actions</span>
        <IconArrowDown width={10} />
      </Button>
    </Dropdown>
  );
}

export default TableBody;
