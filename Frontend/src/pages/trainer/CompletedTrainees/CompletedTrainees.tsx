import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';

import EvaluStepper from './components/EvaluStepper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';
import uselogic from './definition';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';

const SubmittedStudents: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useCompletedTraineesController({
    pagination,
  });
  const {
    AllTrainingsCompanyDataGrid,
    handleCloseDialog,
    handleOpenDialog,
    isOpen,
    open,
    trainingId
    
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
            Completed Trainees
          </Typography>
          <AllTrainingsCompanyDataGrid data={rows} />
        </Stack>
      </Grid>
  
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '50%' }}
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
