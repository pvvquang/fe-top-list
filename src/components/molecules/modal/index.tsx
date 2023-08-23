import { ReactNode } from "react";
import Button from "../../atoms/buttons";
import ConditionalRender from "../../atoms/ConditionalRender";

interface ModalProps {
  children: string | ReactNode;
}

function Modal({ children }: ModalProps) {
  return (
    <div className="fixed z-50 inset-0" aria-modal="true">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Header of Modal
interface HeaderModalProps {
  title: string;
  children?: ReactNode;
}

Modal.Header = function HeaderModal({ title }: HeaderModalProps) {
  return (
    <div className="sm:flex sm:items-center px-6 pt-6">
      <h3
        className="text-base font-semibold leading-6 text-gray-900"
        id="modal-title">
        {title}
      </h3>
    </div>
  );
};

// Body of Modal
interface BodyModalProps {
  content?: string;
  children?: ReactNode;
}

Modal.Body = function BodyModal({ content, children }: BodyModalProps) {
  return (
    <ConditionalRender conditional={!children} fallback={children}>
      <div className="px-6 py-4">
        <p className="text-sm text-gray-500">{content}</p>
      </div>
    </ConditionalRender>
  );
};

// Footer of Modal
interface FooterModalProps {
  labelSubmit?: string;
  labelCancel?: string;
  onSubmit?: () => void;
  onCancel: () => void;
  children?: ReactNode | JSX.Element;
}

Modal.Footer = function FooterModal({
  labelSubmit = "Submit",
  labelCancel = "Cancel",
  onSubmit,
  onCancel,
  children,
}: FooterModalProps) {
  const handleSubmit = async () => {
    onSubmit && (await onSubmit());
    onCancel();
  };
  return (
    <ConditionalRender conditional={!children} fallback={children}>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
        <Button label={labelSubmit} type="submit" onClick={handleSubmit} />
        <Button label={labelCancel} color="info" onClick={onCancel} />
      </div>
    </ConditionalRender>
  );
};

export default Modal;
