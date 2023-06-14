import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
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
import EvaluStepper from './components/EvaluStepper';
import './Finished200Hours.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useFinishedRequiredHoursController from './hooks/useFinishedRequiredHoursController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import uselogic from './definition';



const Finished200Hours: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useFinishedRequiredHoursController({
    pagination,
  });
  const {
  TraineesFinishedRequierHoursDataGrid,
  handleCloseDialog,
  handleOpenDialog,
  isOpen,
  trainingId,
  open,
  } = uselogic();

  
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
          Trainees Finished Required Houres
          </Typography>
          <TraineesFinishedRequierHoursDataGrid data={rows} />
        </Stack>
      </Grid>
         
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '25%' }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <EvaluStepper trainingId={trainingId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Finished200Hours;
