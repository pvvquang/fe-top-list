import Button from "@/components/atoms/buttons";
import { TableColumn, getALignmentClass } from "..";
import ConditionalRender from "../../../atoms/ConditionalRender";
import Dropdown from "@/components/atoms/Dropdown";
import IconArrowDown from "@/components/atoms/icons/IconArrowDown";

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
                    <TableCellAction />
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

function TableCellAction() {
  const options = [
    { id: "1", label: "Edit" },
    { id: "2", label: "Delete" },
  ];
  return (
    <Dropdown options={options} mode="fixed">
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
