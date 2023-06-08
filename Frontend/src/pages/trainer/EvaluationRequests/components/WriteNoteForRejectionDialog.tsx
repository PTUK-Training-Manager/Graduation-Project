import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC } from 'react';

interface DeleteTrainerDialogProps {
  writeNoteOpenDialog: boolean;
  handleWriteNoteClose: () => void;
  handleWriteNoteSave: () => void;
  onSetNote: (note: string) => void;
}

const WriteNoteForRejectionDialog: FC<DeleteTrainerDialogProps> = ({
  writeNoteOpenDialog,
  handleWriteNoteClose,
  handleWriteNoteSave,
  onSetNote,
}) => {
  return (
    <Dialog
      open={writeNoteOpenDialog}
      onClose={handleWriteNoteClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Write a Note </DialogTitle>
      <DialogContent>
        Please write notes for the student why you rejected this progress
        Request!
        <TextField
          margin="dense"
          label="Note"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          //@ts-ignore
          onSetNote(e.target.value)
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleWriteNoteClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleWriteNoteSave} color="error" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WriteNoteForRejectionDialog;
