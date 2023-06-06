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
import { TrainersData, FieldData } from '../api/response.dto';
import { Dialog, IconButton } from '@mui/material';
import { getField, deleteTrianer, updateFieldForTrianer } from '../api';

const AddTrainerQueryKey = ['addTrainerRequest'];

const useAllTrainersFormController = () => {
  const [updatedTrainersInformation, setUpdatedTrainersInformation] = useState<
    TrainersData[]
  >([]);
  const [TrainersInformation, setTrainersInformation] = useState<
    TrainersData[]
  >([]);
  const [deleteId, setDeleteId] = useState<string>('');
  const [updatedTrainerID, setUpdatedTrainerID] = useState<string>('');
  const [newFieldId, setNewFieldId] = useState<string>('');
  const [fieldOptions, setFieldOptions] = useState<FieldData[]>([]);
  const [updateFieldForTrainerDialogOpen, setUpdateFieldForTrainerDialogOpen] =
    useState(false);
  const [deleteTrainerDialogOpen, setDeleteTrainerDialogOpen] =
    useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const onSetNewFieldId = (id: string) => setNewFieldId(id);

  const handleDeleteTrainer = () => {
    deleteTrianer({ id: deleteId }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setTrainersInformation((prevData) =>
            prevData.filter((row) => row.id !== deleteId)
          );
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
          setTrainersInformation((prevData) =>
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
        <IconButton
          onClick={() => handleUpdateFieldDialogOpen(params.id)}
          aria-label="edit field"
        >
          <EditIcon sx={{ color: '#820000' }} className="edit-icon" />
        </IconButton>
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
        <IconButton
          sx={{ ml: 3.5 }}
          color="error"
          aria-label="delete trianer"
          onClick={() => handleClickDeleteTrainerButton(params.row.id)}
        >
          <ClearIcon className="clear" />
        </IconButton>
      ),
    },
  ];

  const rows = TrainersInformation.map((row) => ({
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
      formikProps.setFieldValue('fieldId', null);
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
              setUpdatedTrainersInformation((prevData) => [
                data.data,
                ...prevData,
              ]);
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
        setTrainersInformation(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, [updatedTrainersInformation]);

  useEffect(() => {
    getField().then((res) => {
      if (res.success) {
        console.log(res.data);
        const options = res.data.map((field) => ({
          id: field.id,
          fieldId: field.Field.id,
          companyId: field.Field.field,
          Field: field.Field,
        })) as FieldData[];
        setFieldOptions(options);
        console.log(fieldOptions);
      }
    });
  }, []);

  return {
    formikProps,
    mutate,
    isLoading,
    updatedTrainersInformation,
    TrainersInformation,
    rows,
    columns,
    fieldOptions,
    handleUpdateFieldDialogOpen,
    handleUpdateFieldDialogClose,
    handleSaveUpdatedValueField,
    Dialog,
    deleteTrainerDialogOpen,
    handleDeleteTrainer,
    handleCancelDeleteTrainer,
    onSetNewFieldId,
    updateFieldForTrainerDialogOpen,
  };
};

export default useAllTrainersFormController;
