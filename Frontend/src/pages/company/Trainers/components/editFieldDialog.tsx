/* eslint-disable react/react-in-jsx-scope */
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
import { FieldData } from '../api/types';
import { useTranslation } from 'react-i18next';

interface EditFieldForTrainerDialogProps {
  updateFieldForTrainerDialogOpen: boolean;
  handleUpdateFieldDialogClose: () => void;
  handleSaveUpdatedValueField: () => void;
  fieldOptions: FieldData[];
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
  //@ts-ignore
  const {t}=useTranslation();

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
            formikProps.setFieldValue('fieldId', newValue?.fieldId || '');
            onSetNewFieldId(newValue?.fieldId || '');
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateFieldDialogClose} color="primary">
          {t("Cancel")}
        </Button>
        <Button onClick={handleSaveUpdatedValueField} color="primary">
          {t("Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTrainerDialog;
