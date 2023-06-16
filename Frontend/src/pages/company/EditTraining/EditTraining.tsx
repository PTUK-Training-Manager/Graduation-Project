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
import theme from 'src/styling/customTheme';
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
import { assignTrainer } from '../AcceptedRequests/api';
import { AssignTrainerRequestBody } from '../AcceptedRequests/api/request.dto';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { getTrainers } from '../Trainers/api';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useSnackbar from 'src/hooks/useSnackbar';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import uselogic from './definition';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useTranslation } from 'react-i18next';
import uselogicc from './definitionForTrainers';
import useAllTrainersController from '../Trainers/hooks/useAllTrainersController';

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
  const trainerColumns = [
    { field: 'id', headerName: 'Trainer Id', width: 400, flex: 0.3 },
    { field: 'name', headerName: 'Trianer Name', width: 400, flex: 0.3 },
    { field: 'Field.field', headerName: 'field', width: 400, flex: 0.3 },
    {
      field: 'joinTrainer',
      headerName: 'Join Trainer',
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

  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 100,
  });
  const { trainerRows} = useAllTrainersController({
    pagination,
  });
  const { rows } = useCurrentTraineesController({
    pagination,
  });

  const {
    CurrentTraineesDataGrid,
    handleCancel,
    handleCancelClick,
    handleCloseDialog,
    handleDeleteCancel,
    handleJoin,
    handleJoinClick,
    handleJoinDialogClose,
    handleJoinDialogOpen,
    handleOpenDialog, 
    handleTrainingRequest,
     handleverifyClick, 
    handleVerifyJoin,
    availableTrainers,
    joinDialogOpen,
    confirmDialogOpen,
    handleVerifyCancel,
   confirmEditOpen, 
  } = uselogic();
  const {
   TrainerDialogDataGrid,
  //  handleVerifyCancel,
  //  handleverifyClick,
  //  confirmEditOpen
  } = uselogicc();

  return (
    <>
      <Grid
        container
        sx={{
          p: 3,
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Edit Training
          </Typography>
          <CurrentTraineesDataGrid data={rows} />
        </Stack>
      </Grid>
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
                      {/* <TrainerDialogDataGrid data={trainerRows} /> */}

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
    </>
  );
};

export default EditTraining;
