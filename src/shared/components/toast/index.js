import { toast } from "react-toastify";

export default {
    close: (key) => {
        useSnackbarRef.closeSnackbar(key)
    },
    success(msg) {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: 2000,
            icon: false,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
        });
    },
    warning(msg) {
        toast.warning(msg, {
            position: "bottom-center",
            autoClose: 2000,
            icon: false,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
        });
    },
    info(msg) {
        toast.info(msg, {
            position: "bottom-center",
            autoClose: 2000,
            icon: false,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
        });
    },
    error(msg) {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 2000,
            icon: false,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
            });
    },
}