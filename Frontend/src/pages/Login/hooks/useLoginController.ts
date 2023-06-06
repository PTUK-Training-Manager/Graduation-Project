import {useMutation} from "@tanstack/react-query";
import {login} from "../api";
import {useFormik} from "formik";
import {validationSchema} from "../schema";
import {INITIAL_FORM_STATE} from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import {useLocation, useNavigate} from "react-router-dom";

const LoginQueryKey = ["Login"];

const useLoginController = () => {

    const {showSnackbar} = useSnackbar();

    const {onLogin} = useAccountContext();

    const location = useLocation();
    const navigate = useNavigate();

    const formikProps = useFormik({
        initialValues: INITIAL_FORM_STATE,
        onSubmit: (values, { resetForm }) => {
            mutate(values);
            resetForm();
          },
        validationSchema,
        validateOnMount: true,
    });

    const {mutate, isLoading} = useMutation(
        LoginQueryKey,
        login,
        {
            onSuccess: (data) => {
                localStorage.setItem("access-token", data?.accessToken ?? "");
                const {username, roleId} = data?.data;
                showSnackbar({severity: "success", message: data.message});
                onLogin({username, roleId}, {shouldNavigate: true});
            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error logging in"});
            }
        }
    );

    return {formikProps, mutate, isLoading};
};

export default useLoginController;