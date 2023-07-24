import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface DeleteTrainerDialogProps {
  openAcceptRequestDialog: boolean;
  handleAcceptRequestClose: () => void;
  handleAcceptRequestClick: () => void;
}

const AcceptRequestDialog: FC<DeleteTrainerDialogProps> = ({
  openAcceptRequestDialog,
  handleAcceptRequestClose,
  handleAcceptRequestClick,
}) => {
  return (
    <Dialog
      open={openAcceptRequestDialog}
      onClose={handleAcceptRequestClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Accept Request</DialogTitle>
      <DialogContent>Are you sure you want to accept this Progress Request?</DialogContent>
      <DialogActions>
        <Button onClick={handleAcceptRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAcceptRequestClick} color="success" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AcceptRequestDialog;
