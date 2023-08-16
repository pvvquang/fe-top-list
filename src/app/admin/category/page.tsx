"use client";

import Button from "@/components/atoms/buttons";
import TableBase from "@/components/molecules/tables";
import { TableColumn } from "@/components/molecules/tables/table.type";
import ModalAddCategory from "@/components/organisms/modals/ModalAddCategory";
import { useState } from "react";

function CategoryPage() {
  const [openModalAddCategory, setOpenModalAddCategory] =
    useState<boolean>(false);

  const columns: TableColumn[] = [
    {
      id: "categoryName",
      label: "Category Name",
    },
    {
      id: "delete",
      label: "Action",
      align: "center",
    },
  ];

  const rows = [
    {
      categoryName: "Viet Name",
      delete: <Button label="Delete" onClick={() => {}} />,
    },
    {
      categoryName: "News",
      delete: <Button label="Delete" onClick={() => {}} />,
    },
    {
      categoryName: "Trending",
      delete: <Button label="Delete" onClick={() => {}} />,
    },
  ];

  return (
    <div className="px-10 py-12 max-w-[980px]">
      <div className="flex items-center justify-between pb-4">
        <h2>List Category</h2>
        <Button
          variant="contained"
          label="Add Category"
          onClick={() => setOpenModalAddCategory(true)}
        />
      </div>

      <TableBase rows={rows} columns={columns} />
      {openModalAddCategory && (
        <ModalAddCategory
          onClose={() => setOpenModalAddCategory(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
}

export default CategoryPage;
