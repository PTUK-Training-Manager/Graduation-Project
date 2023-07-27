import { useMutation } from "@tanstack/react-query";
import { addFaculty } from "../api";
import { useFormik } from "formik";
import { validationSchema } from "../schema";
import { INITIAL_FORM_STATE } from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import { AxiosBaseError } from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";

const AddFacultyQueryKey = ["addFaculty"];

const useAddFacultyController = () => {
  const { showSnackbar } = useSnackbar();

  const formikProps = useFormik({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }) => {
      mutate(values);
      resetForm();
    },
    validationSchema,
    validateOnMount: true,
  });

  const { mutate, isLoading } = useMutation(AddFacultyQueryKey, addFaculty, {
    onSuccess: data => {
      console.log(data.data);
      if (data.success == true) {
        showSnackbar({ severity: "success", message: data.message });
      } else if (data.success == false)
        showSnackbar({ severity: "warning", message: data.message });
    },
    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      showSnackbar({
        severity: "error",
        message: errorMessage ?? "Error in Adding Faculty",
      });
    },
  });

  return { formikProps, mutate, isLoading };
};

export default useAddFacultyController;
