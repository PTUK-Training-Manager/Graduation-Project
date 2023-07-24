/* eslint-disable react/react-in-jsx-scope */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FC } from "react";

interface AcceptRequestDialog {
  rejectRequestDialogOpen: boolean;
  handleCancelRejectRequest: () => void;
  handleRejectRequest: () => void;
}

const RejectRequestDialog: FC<AcceptRequestDialog> = ({
  rejectRequestDialogOpen,
  handleCancelRejectRequest,
  handleRejectRequest,
}) => {
  return (
    <Dialog
      open={rejectRequestDialogOpen}
      onClose={handleCancelRejectRequest}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Reject Request</DialogTitle>
      <DialogContent>Are you sure you want to reject this training Request?</DialogContent>
      <DialogActions>
        <Button onClick={handleCancelRejectRequest} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleRejectRequest} color="error" variant="contained">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectRequestDialog;
