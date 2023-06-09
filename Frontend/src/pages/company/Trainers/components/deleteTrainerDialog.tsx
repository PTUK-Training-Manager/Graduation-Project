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
import useAllTrainersFormController from '../hooks/useAllTrainersController';

interface DeleteTrainerDialogProps {
        deleteTrainerDialogOpen: boolean;
        handleCancelDeleteTrainer: () => void;
        handleDeleteTrainer: () => void;
        trainerName: string;
      }
      
const DeleteTrainerDialog: FC<DeleteTrainerDialogProps> = ({
  deleteTrainerDialogOpen,
  handleCancelDeleteTrainer,
  handleDeleteTrainer,
  trainerName,
})  => {
  
  return (
    <Dialog
      open={deleteTrainerDialogOpen}
      onClose={handleCancelDeleteTrainer}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Delete Trainer</DialogTitle>
      <DialogContent>
        Are you sure you want to delete trainer {trainerName}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDeleteTrainer} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteTrainer} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTrainerDialog;
