import {useMutation} from "@tanstack/react-query";
import {login} from "../api";
import {useFormik} from "formik";
import {validationSchema} from "../schema";
import {INITIAL_FORM_STATE} from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";

const LoginQueryKey = ["Login"];

const useLoginController = () => {

    const {showSnackbar} = useSnackbar();

    const {onLogin} = useAccountContext();

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
                const {username, roleId} = data?.data;
                onLogin({username, roleId}, {shouldNavigate: true});
                showSnackbar({severity: "success", message: data.message});
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