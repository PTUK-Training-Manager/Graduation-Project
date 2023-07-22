/* eslint-disable react/react-in-jsx-scope */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
  //@ts-ignore
  const {t}=useTranslation();
  return (
    <Dialog
      open={deleteTrainerDialogOpen}
      onClose={handleCancelDeleteTrainer}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{t("DeleteTrainer")}</DialogTitle>
      <DialogContent>
        {t("Are you sure you want to delete trainer")} {trainerName}?
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
