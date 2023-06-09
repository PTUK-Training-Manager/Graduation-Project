import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EvaluStepper from './components/EvaluStepper';
import './SubmittedStudents.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useSubmittedTraineesController from './hooks/useSubmittedTraineesController';

const SubmittedStudents: React.FC = () => {
  const { columns, rows, isOpen, trainingId, handleCloseDialog } =
  useSubmittedTraineesController();
  const { t } = useTranslation();

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
            Submitted Students
          </Typography>
          <DataGrid
            className="dataGrid"
            sx={{
              boxShadow: 10,
              border: 1,
              borderColor: '#cacaca',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            columns={columns}
            rows={rows}
            getRowId={(row) => row['id']}
            initialState={{
              pagination: { paginationModel: { pageSize: 30 } },
            }}
            pageSizeOptions={[10, 20, 30]}
            slots={{
              toolbar: GridToolbar,
              pagination: DataGridPagination,
            }}
          />
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

export default SubmittedStudents;
