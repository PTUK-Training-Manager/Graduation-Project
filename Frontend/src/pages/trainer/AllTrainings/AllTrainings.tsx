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
import './AllTrainings.css';
import theme from 'src/styling/customTheme';
import { getAllTrainings } from './api';
import { Grid, Stack, TableCell, Typography } from '@mui/material';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useAllTrainingsController from './hooks/useAllTrainingsController';

const AllTrainings: React.FC = () => {
  const { columns, rows, data } = useAllTrainingsController();

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
            All Trainings
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
    </>
  );
};

export default AllTrainings;
