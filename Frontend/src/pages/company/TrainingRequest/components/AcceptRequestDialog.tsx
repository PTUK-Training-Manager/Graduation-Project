import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { FC } from 'react';

interface AcceptRequestDialog {
        acceptRequestDialogOpen: boolean;
        handleCancelAcceptRequest: () => void;
        handleAcceptRequest: () => void;
      }
      
const AcceptRequestDialog: FC<AcceptRequestDialog> = ({
  acceptRequestDialogOpen,
  handleCancelAcceptRequest,
  handleAcceptRequest,
})  => {
  
  return (
    <Dialog
      open={acceptRequestDialogOpen}
      onClose={handleCancelAcceptRequest}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Accept Request</DialogTitle>
      <DialogContent>
        Are you sure you want to accept this training Request?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelAcceptRequest} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAcceptRequest} color="error" variant="contained">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AcceptRequestDialog;
