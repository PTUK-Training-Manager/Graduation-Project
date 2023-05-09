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
import { getTrainers } from "../api";

interface useAddTrainerAPIProps {
}
interface Row {
    id: string;
    companyId: string;
    fieldId: string;
    Field: {
      id: string;
      field: string;
    };
    name: string;
    status: string;
    userId: string;
  }
const AddTrainerQueryKey = ["addTrainerRequest"];

const useAddTrainerFormController = () => {
    const [updatedata, setUpdateData] = useState<Row[]>([]);

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
                getTrainers()
        .then((result) => {
          setUpdateData((prevData) => [data.data, ...prevData]);
        console.log(result.data);
        })
        .catch((error) => console.log(error));

        console.log(data.data);
                }else if(data.success==false)
                showSnackbar({severity: "warning", message: data.message});

            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error in Adding Company"});
            }
        }
    );

    

    return {formikProps, mutate, isLoading,updatedata};
};

export default useAddTrainerFormController;
