import React, { useEffect, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import './AcceptedRequests.css';
import theme from "src/styling/customTheme";
import { getAcceptedTrainings } from './api';
import { assignTrainer } from 'src/assignTrainer';
import { assignTrainerRequestBody } from 'src/assignTrainer/request.dto';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { getTrainers } from '../Trainers/api';
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
  CompanyBranch: {
    location: string;
  };
  Student: {
    name: string;
  };
}

interface Trainer {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

const AcceptedTrainings: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainerID, setTrainerID] = useState<string>('');
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<Trainer[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const handleverifyClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleVerifyCancel = () => {
    setConfirmDialogOpen(false);
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
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) =>
            prevData.filter((row) => row.id !== trainingID)
          );
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAcceptedTrainings()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 200,flex:0.3 },
    { field: 'studentName', headerName: 'Student Name', width: 200,flex:0.3 },
    { field: 'branch', headerName: 'Company Branch', width: 200,flex:0.3 },
    {
      field: 'join',
      headerName: 'Join Trainer',
      width: 200,
      flex:0.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          sx={{ ml: 3 }}
          aria-label="progress form"
          onClick={() => handleJoinClick(params.id)}
        >
          <PersonAddAlt1Icon
            sx={{ color: '#820000' }}
            className="manage-icon"
          />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    branch: row.CompanyBranch.location,
    companyBranchId: row.companyBranchId,
    CompanyBranch: row.CompanyBranch,
    Student: row.Student,
  }));

  return (
    <>
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
        open={confirmDialogOpen}
        onClose={handleVerifyCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Verify Joining</DialogTitle>
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
                    Accepted Requests
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

export default AcceptedTrainings;