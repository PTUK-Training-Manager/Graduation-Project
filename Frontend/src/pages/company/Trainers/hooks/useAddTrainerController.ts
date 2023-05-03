import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {validationSchema} from "../schema";
import {INITIAL_FORM_STATE} from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import {AxiosBaseError} from "src/types";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import extractErrorMessage from "src/utils/extractErrorMessage";
import { useState } from "react";
import { addTrainerRequest } from "src/addTrainer";

interface useAddTrainerAPIProps {
}

const AddTrainerQueryKey = ["addTrainerRequest"];

const useAddTrainerFormController = () => {

    const {showSnackbar} = useSnackbar();

    const formikProps = useFormik({
        initialValues: INITIAL_FORM_STATE,
        onSubmit: (values, { resetForm }) => {
            mutate(values);
            resetForm();
            formikProps.setFieldValue('field' , null)
          },
        validationSchema,
        validateOnMount: true,
    });

    const {mutate, isLoading} = useMutation(
        AddTrainerQueryKey,
        addTrainerRequest,
        {
            onSuccess: (data) => {
                console.log(data.data)
                if(data.success==true){
                showSnackbar({severity: "success", message: data.message});
                // setData((prevData) => [...prevData, data.data]); // update data state with newly added company
                }else if(data.success==false)
                showSnackbar({severity: "warning", message: data.message});

            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error in Adding Company"});
            }
        }
    );

    

    return {formikProps, mutate, isLoading};
};

export default useAddTrainerFormController;
