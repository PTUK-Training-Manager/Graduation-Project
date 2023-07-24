import React, { FC } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type TextFieldWrapperProps = Omit<TextFieldProps, "name"> & {
  name: string;
};
const TextFieldWrapper: FC<TextFieldWrapperProps> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>(name);

  const configTextField = {
    ...field,
    ...rest,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
