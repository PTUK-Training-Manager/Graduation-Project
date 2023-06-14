import React, { useEffect, useMemo, useState } from 'react';
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
import ClearIcon from '@mui/icons-material/Clear';
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
import './PendingRequests.css';
import { getPendingRequests } from './api';
import theme from 'src/styling/customTheme';
import { deleteRquest } from './api';
import useSnackbar from 'src/hooks/useSnackbar';
import uselogic from './definition';
import usePendingRequestsController from './hooks/usePendingRequestsController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';

const PendingRequest: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = usePendingRequestsController({
    pagination,
  });
  const {
    PendingRequestsDataGrid,
    confirmDialogOpen,
    handleDeleteCancel,
    handleDeleteClick,
    handleDeleteRequest,
  } = uselogic();
  return (
    <>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Request</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this request?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteRequest}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
            Pending Requests
          </Typography>
          <PendingRequestsDataGrid data={rows} />

        </Stack>
      </Grid>
    </>
  );
};

export default PendingRequest;
