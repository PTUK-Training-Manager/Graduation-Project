import {useMutation} from "@tanstack/react-query";
import useSnackbar from "src/hooks/useSnackbar";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import {sendResetPasswordRequest} from "src/pages/Login/api";
import {useLoginContext} from "../context/LoginContext";


const useLoginAPI = () => {

    const {showSnackbar} = useSnackbar();
    const {onCloseDialog} = useLoginContext();

    // const {onLogin} = useAccountContext();

    // const {mutate: loginMutate, isLoading} = useMutation(
    //     LoginQueryKey,
    //     login,
    //     {
    //         onSuccess: (data) => {
    //             const {username, roleId} = data?.data;
    //             onLogin({username, roleId}, {shouldNavigate: true});
    //             showSnackbar({severity: "success", message: data.message});
    //         },
    //         onError: (error: AxiosBaseError) => {
    //             const errorMessage = extractErrorMessage(error);
    //             showSnackbar({severity: "error", message: errorMessage ?? "Error logging in"});
    //         }
    //     }
    // );

    // const handleSend = () => {
    //     sendResetPasswordRequest({username: username}).then(
    //         (res: { success: boolean; message: any }) => {
    //             if (res.success === true) {
    //                 showSnackbar({severity: 'success', message: 'A message has been sent to your Gmail'});
    //                 seteUserName('')
    //                 setOpenDialog(false);
    //             } else if (res.success === false) {
    //                 showSnackbar({severity: 'warning', message: res.message});
    //                 seteUserName('');
    //                 setOpenDialog(false);
    //             }
    //         }
    //     );
    // };

    const {mutate: resetPassword, isLoading: isSendingResetPasswordRequest} = useMutation({
        mutationKey: ["SendResetPasswordRequest"],
        mutationFn: sendResetPasswordRequest,
        onSuccess: data => {
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