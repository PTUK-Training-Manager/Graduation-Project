import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import uselogic from './definition';
import theme from 'src/styling/customTheme';
import { Box, Grid, Typography } from '@mui/material';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import ProgressFormDialog from './components/ProgressFormDialog';

const CurrentTrainees: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { rows } = useCurrentTraineesController({
    pagination,
  });
  const {
    CurrentTraineesDataGrid,
    isOpen,
    response,
    trainingId,
    handleCloseDialog,
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
            Current Trainees
          </Typography>
          <CurrentTraineesDataGrid data={rows} />
        </Stack>
      </Grid>
      <ProgressFormDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        //@ts-ignore
        response={response}
        //@ts-ignore
        data={rows}
        trainingId={trainingId}
      />
    </>
  );
};

export default CurrentTrainees;
