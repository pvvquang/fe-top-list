import Modal from "@/components/molecules/modal";

interface IProps {
  title: string;
  description?: string;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

function ModalConfirm({ title, description, onClose, onSubmit }: IProps) {
  const handleSubmit = () => {
    onSubmit().then(() => onClose());
  };

  return (
    <Modal>
      <Modal.Header title={title} />
      <Modal.Body content={description || ""} />
      <Modal.Footer onCancel={onClose} onSubmit={handleSubmit} />
    </Modal>
  );
}

export default ModalConfirm;
