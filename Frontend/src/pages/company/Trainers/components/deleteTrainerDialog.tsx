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
          {t("Cancel")}
        </Button>
        <Button onClick={handleDeleteTrainer} color="error" variant="contained">
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTrainerDialog;
