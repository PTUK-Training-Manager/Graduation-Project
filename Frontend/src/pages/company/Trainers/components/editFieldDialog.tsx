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
import { FieldOption } from '../types';
interface EditFieldForTrainerDialogProps {
  updateFieldForTrainerDialogOpen: boolean;
  handleUpdateFieldDialogClose: () => void;
  handleSaveUpdatedValueField: () => void;
  fieldOptions: FieldOption[];
  formikProps: any;
  onSetNewFieldId: (id: string) => void;
}

const EditTrainerDialog: FC<EditFieldForTrainerDialogProps> = ({
  updateFieldForTrainerDialogOpen,
  handleUpdateFieldDialogClose,
  handleSaveUpdatedValueField,
  fieldOptions,
  formikProps,
  onSetNewFieldId,
}) => {
  return (
    <Dialog
      fullWidth
      className="dialog-box"
      open={updateFieldForTrainerDialogOpen}
      onClose={handleUpdateFieldDialogClose}
      BackdropProps={{ invisible: true }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Field</DialogTitle>
      <DialogContent>
        <Autocomplete
          id="field"
          options={fieldOptions}
          getOptionLabel={(option) => option.Field.field}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Field"
              variant="outlined"
            />
          )}
          onChange={(event, newValue) => {
            formikProps.setFieldValue('fieldId', newValue?.id || '');
            onSetNewFieldId(newValue?.id || '');
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateFieldDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveUpdatedValueField} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTrainerDialog;
