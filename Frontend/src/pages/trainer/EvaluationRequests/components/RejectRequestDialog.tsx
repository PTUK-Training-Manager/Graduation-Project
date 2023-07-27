import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface DeleteTrainerDialogProps {
  openRejectRequestDialog: boolean;
  handleRejectRequestClose: () => void;
  handleWriteNoteOpen: () => void;
}

const RejectRequestDialog: FC<DeleteTrainerDialogProps> = ({
  openRejectRequestDialog,
  handleRejectRequestClose,
  handleWriteNoteOpen,
}) => {
  return (
    <Dialog
      open={openRejectRequestDialog}
      onClose={handleRejectRequestClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Reject Request</DialogTitle>
      <DialogContent>Are you sure you want to reject this Progress Request?</DialogContent>
      <DialogActions>
        <Button onClick={handleRejectRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleWriteNoteOpen} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectRequestDialog;
