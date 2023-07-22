import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import theme from 'src/styling/customTheme';
import { Grid, Typography } from '@mui/material';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import AllTrainingsCompanyDataGrid from './definition';

const AllTrainings: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } =
    useAllTrainingsController();

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
          <AllTrainingsCompanyDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default AllTrainings;
