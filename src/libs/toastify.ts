import { ToastOptions, toast } from "react-toastify";

interface ToastProps extends ToastOptions {
  message: string;
}

const defaultToastOption: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const Toast = {
  success(option: ToastProps) {
    toast.success(option.message, {
      ...defaultToastOption,
      ...option,
    });
  },
  info(option: ToastProps) {
    toast.info(option.message, {
      ...defaultToastOption,
      ...option,
    });
  },
  warn(option: ToastProps) {
    toast.warn(option.message, {
      ...defaultToastOption,
      ...option,
    });
  },
  error(option: ToastProps) {
    toast.error(option.message, {
      ...defaultToastOption,
      ...option,
    });
  },
};

export default Toast;
