import { toast, ToastOptions } from "react-toastify";
/**
 * Type for specifying the type of toast.
 * @typedef {"success" | "error" | "info" | "warning" | "default"} ToastType
 */
/**
 * Object mapping toast types to their values.
 * @type {{SUCCESS: ToastType, ERROR: ToastType, INFO: ToastType, WARNING: ToastType, DEFAULT: ToastType}}
 */
export const ToastTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
  DEFAULT: "default",
};
/**
 * Show a toast with the specified message and type.
 * @param {string} message - The message to display in the toast.
 * @param {ToastType} type - The type of toast to display.
 */



export const showToast = (message: string, type = ToastTypes.DEFAULT) => {
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  switch (type) {
    case ToastTypes.SUCCESS:
      toast.success(message, toastOptions);
      break;
    case ToastTypes.ERROR:
      toast.error(message, toastOptions);
      break;
    case ToastTypes.INFO:
      toast.info(message, toastOptions);
      break;
    case ToastTypes.WARNING:
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};