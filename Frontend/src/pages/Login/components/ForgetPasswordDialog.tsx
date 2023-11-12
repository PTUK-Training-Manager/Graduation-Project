import React, { FC } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormikContext } from "formik";
import TextFieldWrapper from "src/components/FormsUI/TextField";
import { useLoginContext } from "../context/LoginContext";
import { DialogType } from "../constants";
import useLoginAPI from "src/pages/Login/hooks/useLoginAPI";
import { LoginRequestBody } from "../api/request.dto";

const ForgetPasswordDialog: FC = () => {
  const { values } = useFormikContext<LoginRequestBody>();
  const { openDialog, onCloseDialog } = useLoginContext();
  const { resetPassword, isSendingResetPasswordRequest } = useLoginAPI();

  const isOpen = openDialog === DialogType.FORGET_PASSWORD;

  const sendResetPasswordRequest = () => {
    if (!values.username) {
      return;
    }
      resetPassword({ username: values.username });
  };
  

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog">Forgot Password</DialogTitle>
      <DialogContent sx={{ pt: "20px !important", pb: 0 }}>
        <TextFieldWrapper  name="username" label="Enter Your Username" required sx={{ mb: 2.5 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog} color="error">
          Cancel
        </Button>
        <LoadingButton
          color="primary"
          onClick={sendResetPasswordRequest}
          loading={isSendingResetPasswordRequest}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ForgetPasswordDialog;
