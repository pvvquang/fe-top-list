"use client";
import InputField from "@/components/atoms/inputs/InputField";
import Modal from "@/components/molecules/modal";
import { Category } from "@/types/category.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface IProps {
  onClose: () => void;
  onSubmit: (categoryName: string) => Promise<void>;
  category: Category | null;
}

const schema = yup.object().shape({
  categoryName: yup
    .string()
    .required("Please enter category name!")
    .min(5, "Category name is too short"),
});
type FormValues = yup.InferType<typeof schema>;

function ModalAddCategory({ onClose, onSubmit, category }: IProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: !!category ? category : { categoryName: "" },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<FormValues> = async (data) => {
    await onSubmit(data.categoryName);
    onClose();
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Modal.Header title="Add New Category" />
        <Modal.Body>
          <div className="px-6 py-4">
            <InputField
              label="Category Name"
              placeholder="Enter category name..."
              {...register("categoryName")}
              errorMessage={errors.categoryName?.message}
              error={
                touchedFields.categoryName && !!errors.categoryName?.message
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer onCancel={onClose} onSubmit={() => {}} />
      </form>
    </Modal>
  );
}

export default ModalAddCategory;
