import Modal from "@/components/molecules/modal";

interface IProps {
  title: string;
  description?: string;
  onClose: () => void;
  onSubmit: () => void;
}

function ModalConfirm({ title, description, onClose, onSubmit }: IProps) {
  return (
    <Modal>
      <Modal.Header title={title} />
      <Modal.Body content={description || ""} />
      <Modal.Footer onCancel={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}

export default ModalConfirm;
