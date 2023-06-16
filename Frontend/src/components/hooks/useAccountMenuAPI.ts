import {useMutation} from "@tanstack/react-query";
import logoutQueryFn from "src/api/logout";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";
import {LOG_OUT_QUERY_KEY} from "../constants";

const useAccountMenuAPI = () => {

    const {showSnackbar} = useSnackbar();

    const {onLogout} = useAccountContext();

    const {mutate: logout, isLoading: isLoggingOut} = useMutation(
        LOG_OUT_QUERY_KEY,
        logoutQueryFn,
        {
            onSuccess: () => {
                onLogout();
            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error logging out"});
            }
        }
    );

  return {logout, isLoggingOut};
};

export default useAccountMenuAPI;
