import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorAlert = (message) => {
    toast.dismiss();
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { backgroundColor: "red" },
        style: { color: "red" },
    });
};

export const successAlert = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { backgroundColor: "success" },
        style: { color: "success" },
    });
};
