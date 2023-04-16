import {useContext} from "react";
import {SnackbarContext} from "../context/SnackbarContext";

const useSnackbar = () => {
    if (!SnackbarContext) {
        throw new Error("useSnackbar must be used within the StoreProvider");
    }

    return useContext(SnackbarContext)
};

export default useSnackbar;
