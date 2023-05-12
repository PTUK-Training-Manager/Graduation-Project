import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { validationSchema } from '../schema';
import { INITIAL_FORM_STATE } from '../constants';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import EditIcon from '@mui/icons-material/Edit';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { addTrainerRequest } from '../api';
import { getTrainers } from '../api';
import { TrainersData } from '../api/response.dto';
import { FieldOption } from '../types';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { getField } from 'src/api/getfield';
import { deleteTrianer, updateFieldForTrianer } from '../api';

const AddTrainerQueryKey = ['addTrainerRequest'];

const useAllTrainersFormController = () => {
  useEffect(() => {
    getField().then((res) => {
      if (res.success) {
        console.log(res.data);
        const options = res.data.map((field) => ({
          id: field.id,
          fieldId: field.Field.id,
          companyId: field.Field.field,
          Field: field.Field,
        })) as FieldOption[];
        setFieldOptions(options);
        console.log(fieldOptions);
      }
    });
  }, []);

  const handleDeleteTrainer = () => {
    deleteTrianer({ id: deleteId }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setData((prevData) => prevData.filter((row) => row.id !== deleteId));
          setDeleteId('');
          setDeleteTrainerDialogOpen(false);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setDeleteId('');
          setDeleteTrainerDialogOpen(false);
        }
      }
    );
  };

  const handleClickDeleteTrainerButton = (Trainerid: string) => {
    setDeleteId(Trainerid);
    setDeleteTrainerDialogOpen(true);
  };

  const handleCancelDeleteTrainer = () => {
    setDeleteTrainerDialogOpen(false);
  };

  const [updateFieldForTrainerDialogOpen, setUpdateFieldForTrainerDialogOpen] =
    useState(false);

  const handleUpdateFieldDialogOpen = (id: string) => {
    setUpdatedTrainerID(id);
    setUpdateFieldForTrainerDialogOpen(true);
  };

  const handleUpdateFieldDialogClose = () => {
    setUpdateFieldForTrainerDialogOpen(false);
  };

  const handleSaveUpdatedValueField = () => {
    updateFieldForTrianer({ id: updatedTrainerID, fieldId: newFieldId }).then(
      (res) => {
        console.log(updatedTrainerID);
        console.log(newFieldId);
        if (res.success === true) {
          const fieldName = res.data.Field.field;
          showSnackbar({ severity: 'success', message: res.message });
          setData((prevData) =>
            prevData.map((row) => {
              if (row.id === updatedTrainerID) {
                return {
                  ...row,
                  Field: {
                    ...row.Field,
                    field: fieldName,
                  },
                };
              }
              return row;
            })
          );
          setUpdatedTrainerID('');
          setUpdateFieldForTrainerDialogOpen(false);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setUpdatedTrainerID('');
          setUpdateFieldForTrainerDialogOpen(false);
        }
      }
    );
    console.log(`New value: ${newFieldId}`);
    console.log(`Training ID : ${updatedTrainerID}`);
    handleUpdateFieldDialogClose();
  };
  const [updatedata, setUpdateData] = useState<TrainersData[]>([]);
  const [data, setData] = useState<TrainersData[]>([]);
  const [deleteId, setDeleteId] = useState<string>('');
  const [updatedTrainerID, setUpdatedTrainerID] = useState<string>('');
  const [newFieldId, setNewFieldId] = useState<string>('');
  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);

  const [deleteTrainerDialogOpen, setDeleteTrainerDialogOpen] =
    useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const columns = [
    { field: 'id', headerName: 'Trainer Id', width: 220, flex: 0.3 },
    { field: 'name', headerName: 'Trianer Name', width: 220, flex: 0.3 },
    { field: 'field', headerName: 'field', width: 220, flex: 0.3 },
    {
      field: 'editField',
      headerName: 'Edit Field',
      flex: 0.3,
      width: 220,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <>
          <IconButton
            onClick={() => handleUpdateFieldDialogOpen(params.id)}
            aria-label="edit field"
          >
            <EditIcon sx={{ color: '#820000' }} className="edit-icon" />
          </IconButton>
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
                  setNewFieldId(newValue?.id || '');
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
        </>
      ),
    },

    {
      field: 'delete',
      headerName: 'Delete Trainer',
      sortable: false,
      width: 220,
      filterable: false,
      alignContent: 'centre',
      renderCell: (params: { [x: string]: any; id: any }) => (
        <>
          <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete trianer"
            onClick={() => handleClickDeleteTrainerButton(params.row.id)}
          >
            <ClearIcon className="clear" />
          </IconButton>
          <Dialog
            open={deleteTrainerDialogOpen}
            onClose={handleCancelDeleteTrainer}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Delete Trainer</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this trainer?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDeleteTrainer} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteTrainer}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    name: row.name,
    field: row.Field.field,
    status: row.status,
    companyId: row.companyId,
    userId: row.userId,
  }));

  const formikProps = useFormik({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }) => {
      mutate(values);
      resetForm();
      // formikProps.setFieldValue('field' , null)
    },
    validationSchema,
    validateOnMount: true,
  });

  const { mutate, isLoading } = useMutation(
    AddTrainerQueryKey,
    addTrainerRequest,
    {
      onSuccess: (data) => {
        console.log(data.data);
        if (data.success == true) {
          showSnackbar({ severity: 'success', message: data.message });
          getTrainers()
            .then((result) => {
              setUpdateData((prevData) => [data.data, ...prevData]);
              console.log(result.data);
            })
            .catch((error) => console.log(error));

          console.log(data.data);
        } else if (data.success == false)
          showSnackbar({ severity: 'warning', message: data.message });
      },
      onError: (error: AxiosBaseError) => {
        const errorMessage = extractErrorMessage(error);
        showSnackbar({
          severity: 'error',
          message: errorMessage ?? 'Error in Adding Company',
        });
      },
    }
  );

  useEffect(() => {
    getTrainers()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, [updatedata]);

  return {
    formikProps,
    mutate,
    isLoading,
    updatedata,
    data,
    rows,
    columns,
    fieldOptions,
    handleUpdateFieldDialogOpen,
    handleUpdateFieldDialogClose,
    handleSaveUpdatedValueField,
    Dialog,
    deleteTrainerDialogOpen,
    handleDeleteTrainer,
    handleCancelDeleteTrainer
  };
};

export default useAllTrainersFormController;
