import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridClasses,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import './EditTraining.css';
import { getCurrentTrainees } from './api';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import theme from "src/styling/customTheme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { handleTrainingRequest } from '../TrainingRequest/api';
import { HandleTrainingRequestBody } from '../TrainingRequest/types';
import { assignTrainer } from 'src/assignTrainer';
import { assignTrainerRequestBody } from 'src/assignTrainer/request.dto';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { getTrainers } from '../Trainers/api';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useSnackbar from 'src/hooks/useSnackbar';

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
interface Row {
  id: string;
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
  Trainer: {
    name: string;
  };
  trainerId: string;
}

interface Trainer {
    id: string;
    companyId: string;
    fieldId: string;
    Field: {
      id: string;
      field: string;
    };
    name: string;
    status: string;
    userId: string;
}

const EditTraining: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const { showSnackbar } = useSnackbar();
  const [cancelId, setCanceledId] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainerID, setTrainerID] = useState<string>('');
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<Trainer[]>([]);
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);

  const handleverifyClick = () => {
    setConfirmEditOpen(true);
  };

  const handleVerifyCancel = () => {
    setConfirmEditOpen(false);
    setJoinDialogOpen(false);
  };

  const trainerColumns = [
    { field: 'id', headerName: 'Trainer Id', width: 400, flex: 0.3 },
    { field: 'name', headerName: 'Trianer Name', width: 400, flex: 0.3 },
    { field: 'field', headerName: 'field', width: 400, flex: 0.3 },
    {
      field: 'joinTrainer',
      headerName: 'Join Trainer ',
      flex: 0.3,
      width: 400,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          aria-label="edit field"
          onClick={() => handleJoin(params.id)}
        >
          <CheckBoxIcon
            sx={{ color: 'blue', backgroundColor: 'white' }}
            className="edit-icon"
          />
        </IconButton>
      ),
    },
  ];

  const handleJoinClick = (id: string) => {
    setTrainingID(id);
    setJoinDialogOpen(true);
    handleJoinDialogOpen();
  };
  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };

  const handleJoinDialogOpen = async () => {
    try {
      const result = await getTrainers();
      setAvailableTrainers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };

  const handleVerifyJoin = () => {
    const body: assignTrainerRequestBody = {
      trainingId: trainingID,
      trainerId: trainerID,
    };
    assignTrainer(body)
      .then((result) => {
        if (result.success === true) {
          const trainerName=result.data.name
          console.log(trainerName)
          const updatedData = data.map((row) => {
            if (row.id === trainingID) {
              return { 
                ...row, 
                Trainer: {
                ...row.Trainer,
                name: trainerName
              } };
            }
            return row;
          });
          setData(updatedData);
          showSnackbar({ severity: 'success', message: result.message });
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurrentTrainees()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCancelClick = (id: string) => {
    setCanceledId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    const body: HandleTrainingRequestBody = {
      trainingId: cancelId,
      status: 'canceled',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== cancelId));
          setCanceledId('');
          setConfirmDialogOpen(false);
        } else if (result.success === false) {
          showSnackbar({ severity: 'warning', message: result.message });
          setCanceledId('');
          setConfirmDialogOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 220 },
    { field: 'studentName', headerName: 'Student Name', width: 220, flex: 0.5 },
    {
      field: 'companyBranch',
      headerName: 'Company Branch',
      width: 220,
      flex: 0.5,
    },
    { field: 'trainerName', headerName: 'Trainer', width: 220, flex: 0.5 },

    {
      field: 'editTrainer',
      headerName: 'Edit Trainer',
      flex: 0.3,
      width: 220,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <>
          <IconButton aria-label="edit field"
                    onClick={() => handleJoinClick(params.id)}
          >
            <EditIcon
              sx={{ color: 'white', backgroundColor: 'orange' }}
              className="edit-icon"
            />
          </IconButton>
        </>
      ),
    },
    {
      field: 'cancel',
      headerName: 'Cancel Training',
      sortable: false,
      filterable: false,
      alignContent: 'centre',
      renderCell: (params: { [x: string]: any; id: any }) => (
        <>
          <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="cancel training"
            onClick={() => handleCancelClick(params.row.id)}
          >
            <ClearIcon />
          </IconButton>
        </>
      ),
      minwidth: 150,
      flex: 0.3,
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyBranch: row.CompanyBranch.location,
    trainerName: row.Trainer.name,
    Trainer: row.Trainer,
    Student: row.Student,
    trainerId: row.trainerId,
    companyBranchId: row.companyBranchId,
  }));

  return (
    <>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Cancel Training</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this training?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            No
          </Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
        <DialogContent>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              sx={{
                width: '500px', // set the width to 800px
              }}
              columns={trainerColumns}
              rows={availableTrainers}
              getRowId={(row) => row['id']}
              initialState={{
                pagination: { paginationModel: { pageSize: 30 } },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
              slots={{
                toolbar: GridToolbar,
                pagination: CustomPagination,
              }}
            />
          </div>
          {/* <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={availableTrainers} columns={trainerColumns} />
  </div> */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleJoinDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmEditOpen}
        onClose={handleVerifyCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Verify Edit Joining</DialogTitle>
        <DialogContent>
          Are you sure you want to join this trainer to this training?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyJoin} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container sx={{
            p: 3,
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}>
            <Stack gap={1.5} sx={{
                width: '100%',
                height: '100%',
            }}>
                <Typography component="h1" variant="h5" fontWeight={500}>
                    Edit Training
                </Typography>
                <DataGrid
                    className="dataGrid"
                    sx={{
                        boxShadow: 10,
                        border: 1,
                        borderColor: '#cacaca',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main'
                        }
                    }}
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row['id']}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 30}},
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    slots={{
                        toolbar: GridToolbar,
                        pagination: CustomPagination,
                    }}
                />
            </Stack>
        </Grid>
    </>
  );
};

export default EditTraining;