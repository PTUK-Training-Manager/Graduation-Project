import {useMutation} from "@tanstack/react-query";
import useSnackbar from "src/hooks/useSnackbar";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import {sendResetPasswordRequest} from "src/pages/Login/api";
import {useLoginContext} from "../context/LoginContext";


const useLoginAPI = () => {

    const {showSnackbar} = useSnackbar();
    const {onCloseDialog} = useLoginContext();

    const {mutate: resetPassword, isLoading: isSendingResetPasswordRequest} = useMutation({
        mutationKey: ["SendResetPasswordRequest"],
        mutationFn: sendResetPasswordRequest,
        onSuccess: () => {
            showSnackbar({severity: "success", message: "A message has been sent to your email"});
        },
        onError: (error: AxiosBaseError) => {
            const errorMessage = extractErrorMessage(error);
            showSnackbar({severity: "warning", message: errorMessage});
        },
        onSettled: () => onCloseDialog(),
    })

    return {
        resetPassword,
        isSendingResetPasswordRequest,
    };
};

export default useLoginAPI;