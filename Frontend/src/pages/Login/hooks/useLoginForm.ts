import react from "react";
import {useFormik} from "formik";
import {INITIAL_FORM_STATE, LoginMutationKey} from "src/pages/Login/constants";
import {validationSchema} from "src/pages/Login/schema";
import {useMutation} from "@tanstack/react-query";
import {login} from "src/pages/Login/api";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";

const useLoginForm = () => {
    const {showSnackbar} = useSnackbar();
    const {onLogin} = useAccountContext();

    const {mutate: loginMutate, isLoading} = useMutation({
            mutationFn: login,
            onSuccess: (data) => {
                console.log(data.accessToken);
                // ----------
                localStorage.setItem("access-token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.data));
                // ----------
                const {username, roleId} = data?.data;
                onLogin(data?.data, {shouldNavigate: true});
                showSnackbar({severity: "success", message: data.message});
            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error logging in"});
            },
        }
    );

    const formikProps = useFormik({
        initialValues: INITIAL_FORM_STATE,
        onSubmit: (values, {resetForm}) => {
            loginMutate(values);
            resetForm();
        },
        validationSchema,
        validateOnMount: true,
    });

    return {
        formikProps,
        isLoading,
    };
};

export default useLoginForm;
