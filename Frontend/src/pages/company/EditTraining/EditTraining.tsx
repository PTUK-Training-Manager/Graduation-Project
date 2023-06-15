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
import { assignTrainer } from '../AcceptedRequests/api'
import { AssignTrainerRequestBody } from '../AcceptedRequests/api/request.dto';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { getTrainers } from '../Trainers/api';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useSnackbar from 'src/hooks/useSnackbar';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import uselogic from './definition';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useTranslation } from 'react-i18next';

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

  // const handleJoinClick = (id: string) => {
  //   setTrainingID(id);
  //   setJoinDialogOpen(true);
  //   handleJoinDialogOpen();
  // };
  // const handleJoinDialogClose = () => {
  //   setJoinDialogOpen(false);
  // };

  // const handleJoinDialogOpen = async () => {
  //   try {
  //     const result = await getTrainers();
  //     setAvailableTrainers(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useCurrentTraineesController({
    pagination,
  });
  const handleVerifyJoin = () => {
    const body: AssignTrainerRequestBody = {
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

  // useEffect(() => {
  //   getCurrentTrainees()
  //     .then((result) => {
  //       setData(result.data);
  //       console.log(result.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const handleCancelClick = (id: string) => {
    setCanceledId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };
  const {
    CurrentTraineesDataGrid,
  } = uselogic();
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
                    // onClick={() => handleJoinClick(params.id)}
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

  const {t}=useTranslation();

  return (
    <>
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
{t("EditTraining")}
                </Typography>
                <CurrentTraineesDataGrid data={rows} />

            </Stack>
        </Grid>
    </>
  );
};

export default EditTraining;