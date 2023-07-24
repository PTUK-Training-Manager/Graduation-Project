import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import RichTextEditor from "src/containers/RichTextEditor";
import { EditorState } from "lexical";

interface DeleteTrainerDialogProps {
  writeNoteOpenDialog: boolean;
  handleWriteNoteClose: () => void;
  handleWriteNoteSave: () => void;
  onSetNote: (note: EditorState) => void;
}

const WriteNoteForRejectionDialog: FC<DeleteTrainerDialogProps> = ({
  writeNoteOpenDialog,
  handleWriteNoteClose,
  handleWriteNoteSave,
  onSetNote,
}) => {
  return (
    <Dialog open={writeNoteOpenDialog} onClose={handleWriteNoteClose} maxWidth="lg" fullWidth>
      <DialogTitle>Write a Note </DialogTitle>
      <DialogContent>
        Please write notes for the student why you rejected this progress Request!
        <Stack>
          <RichTextEditor
            onChange={notee => {
              console.log(JSON.stringify(notee));
              onSetNote(notee);
            }}
          />
        </Stack>
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
