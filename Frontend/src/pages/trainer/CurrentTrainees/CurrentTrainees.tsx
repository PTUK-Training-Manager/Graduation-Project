import React from 'react';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import uselogic from './definition';
import theme from 'src/styling/customTheme';
import { Grid, Typography } from '@mui/material';
import ProgressFormDialog from './components/ProgressFormDialog';
import useCurrentTrainees from './hooks/useCurrentTraineesController';

const CurrentTrainees: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } = useCurrentTrainees();

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
          <CurrentTraineesDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
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
