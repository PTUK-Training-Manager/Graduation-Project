import React from 'react';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import './EditTraining.css';
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
  Typography,
} from '@mui/material';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import uselogic from './definition';
import useCurrentTrainees from './hooks/useCurrentTraineesController';

const EditTraining: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } = useCurrentTrainees();
  //@ts-ignore

  const {
    CurrentTraineesDataGrid,
    handleCancel,
    handleDeleteCancel,
    handleJoin,
    handleJoinDialogClose,
    handleVerifyJoin,
    availableTrainers,
    joinDialogOpen,
    confirmDialogOpen,
    handleVerifyCancel,
    confirmEditOpen,
  } = uselogic();
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
  const trainerrows = availableTrainers.map((row) => ({
    id: row.id,
    name: row.name,
    field: row.Field.field,
    status: row.status,
    companyId: row.companyId,
    userId: row.userId,
  }));

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
          <CurrentTraineesDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />{' '}
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
              rows={trainerrows}
              getRowId={(row) => row['id']}
              initialState={{
                pagination: { paginationModel: { pageSize: 30 } },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
              slots={{
                toolbar: GridToolbar,
                pagination: DataGridPagination,
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
