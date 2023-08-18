"use client";
import ConditionalRender from "@/components/atoms/ConditionalRender";
import Button from "@/components/atoms/buttons";
import TableBase, {
  PAGINATION,
  TableColumn,
} from "@/components/molecules/tables";
import ModalAddCategory from "@/components/organisms/modals/ModalAddCategory";
import ModalConfirm from "@/components/organisms/modals/ModalConfirm";
import { AppConstant } from "@/constants";
import { useAdminContent } from "@/context/AdminProvider";
import Toast from "@/libs/toastify";
import {
  createCategory,
  deleteCategoryById,
  fetchCategories,
  updateCategoryById,
} from "@/services/category.service";
import { Category } from "@/types/category.type";
import { IModalState, IPagination, Metadata } from "@/types/common.type";
import { getQueryStringFromObject } from "@/utils";
import { useEffect, useState } from "react";

const columns: TableColumn[] = [
  {
    id: "index",
    label: "STT",
  },
  {
    id: "categoryName",
    label: "Category Name",
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
    actions: ["delete", "edit"],
  },
];

function CategoryPage() {
  const { fetchWithLoading } = useAdminContent();

  const [modalAddCategory, setModalAddCategory] = useState<
    IModalState<Category>
  >(AppConstant.MODAL_STATE_DEFAULT);
  const [categories, setCategories] = useState<Category[]>([]);
  const [metaData, setMetaData] = useState<Metadata>({
    totalItems: 0,
    totalPages: 0,
  });
  const [objectQuery, setObjectQuery] = useState<IPagination>({
    page: PAGINATION.PAGE,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [popupDeleteState, setPopupDeleteState] = useState<
    IModalState<Category>
  >(AppConstant.MODAL_STATE_DEFAULT);

  const createData = (category: Category, i: number) => {
    return {
      ...category,
      index: (objectQuery.page - 1) * objectQuery.pageSize + (i + 1),
    };
  };
  console.log({ objectQuery });

  const getCategories = () => {
    setLoading(true);
    const queryPrams = getQueryStringFromObject(objectQuery || {});
    fetchCategories(queryPrams)
      .then((response) => {
        const _categories = response.data.map(createData);
        setCategories(_categories);
        setMetaData(response.metadata);
      })
      .finally(() => setLoading(false));
  };

  const handleAddCategory = async (categoryName: string) => {
    fetchWithLoading(async () => {
      await createCategory(categoryName).then(() => {
        Toast.success({ message: "Category has been successfully created!" });
        getCategories();
      });
    });
  };

  const handleUpdateCategory = async (categoryName: string) => {
    if (!modalAddCategory.data?.id) return;
    const _category = { id: modalAddCategory.data.id, categoryName };
    fetchWithLoading(async () => {
      await updateCategoryById(_category).then(() => {
        Toast.success({ message: "Category has been successfully updated!" });
        getCategories();
      });
    });
  };

  const handleDeleteCategory = async () => {
    fetchWithLoading(async () => {
      if (!popupDeleteState.data?.id) return;
      await deleteCategoryById(popupDeleteState.data?.id).then(() => {
        Toast.success({ message: "Category has been successfully deleted!" });
        getCategories();
      });
    });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectQuery]);

  return (
    <div className="px-10 py-12 max-w-[980px]">
      <div className="flex items-center justify-between pb-4">
        <h2 className="font-semibold">List Category</h2>
        <Button
          variant="contained"
          label="Add Category"
          onClick={() =>
            setModalAddCategory((prev) => ({ ...prev, open: true }))
          }
        />
      </div>

      <TableBase
        rows={categories}
        columns={columns}
        pagination={{
          page: objectQuery.page,
          totalPages: metaData.totalPages,
          totalItems: metaData.totalItems,
        }}
        onChangePage={(page) => setObjectQuery((prev) => ({ ...prev, page }))}
        onChangePageSize={(pageSize) =>
          setObjectQuery((prev) => ({
            ...prev,
            pageSize,
            page: PAGINATION.PAGE,
          }))
        }
        loading={loading}
        onDelete={(data: Category) => setPopupDeleteState({ data, open: true })}
        onEdit={(data: Category) => setModalAddCategory({ data, open: true })}
      />

      <ConditionalRender conditional={modalAddCategory.open}>
        <ModalAddCategory
          onClose={() => setModalAddCategory(AppConstant.MODAL_STATE_DEFAULT)}
          onSubmit={(categoryName: string) =>
            modalAddCategory.data
              ? handleUpdateCategory(categoryName)
              : handleAddCategory(categoryName)
          }
          category={modalAddCategory.data}
        />
      </ConditionalRender>

      <ConditionalRender conditional={popupDeleteState.open}>
        <ModalConfirm
          title="Delete Category"
          description={`Do you want to delete category ${popupDeleteState.data?.categoryName} ?`}
          onClose={() => setPopupDeleteState(AppConstant.MODAL_STATE_DEFAULT)}
          onSubmit={handleDeleteCategory}
        />
      </ConditionalRender>
    </div>
  );
}

export default CategoryPage;
