import {useMutation} from "@tanstack/react-query";
import {addCompany} from "../api";
import {useFormik} from "formik";
import {validationSchema} from "../schema";
import {INITIAL_FORM_STATE} from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";

interface useAddCompanyAPIProps {
}

const AddCompanyQueryKey = ["addCompany"];

const useAddCompanyController = () => {

    const {showSnackbar} = useSnackbar();


    const formikProps = useFormik({
        initialValues: INITIAL_FORM_STATE,
        onSubmit: (values) => {
            mutate(values);
        },
        validationSchema,
        validateOnMount: true,
    });

    const {mutate, isLoading, error} = useMutation(
        AddCompanyQueryKey,
        addCompany,
        {
            onSuccess: (data) => {
                const {id,name,phoneNumber,managerName,location,email} = data?.data;
                console.log(data.data)
                showSnackbar({severity: "success", message: "Adding Company successfull"});
            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error in Adding Company"});
            }
        }
    );

    return {formikProps, mutate, isLoading};
};

export default useAddCompanyController;
