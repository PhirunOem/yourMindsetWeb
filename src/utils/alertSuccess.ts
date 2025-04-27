import { toast, ToastOptions } from "react-toastify";

export const AlertSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
    });
};
