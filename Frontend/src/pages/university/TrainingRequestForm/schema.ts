import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  studentId: Yup.string().required("Student Number is required"),
  type: Yup.string().required("Type is required"),
  semester: Yup.string().required("Semester is required"),
  companyId: Yup.string().required("Company Name is required"),
  companyBranchId: Yup.string().required("Location of Company is required"),
});
