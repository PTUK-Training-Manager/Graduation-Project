import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import useTrainingRequestsController from './hooks/useTrainingRequestsController';
import uselogic from './definition';
import theme from 'src/styling/customTheme';
import { Box, Grid, Typography } from '@mui/material';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import AcceptRequestDialog from './components/AcceptRequestDialog';
const TrainingRequests: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useTrainingRequestsController({
    pagination,
  });
  const { TrainingRequestsDataGrid,handleAcceptOptionClick,handleCancelAcceptRequest,acceptRequestDialogOpen } = uselogic();

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
            Training Requests
          </Typography>
          <TrainingRequestsDataGrid data={rows} />
        </Stack>
      </Grid>
      <AcceptRequestDialog
       acceptRequestDialogOpen={acceptRequestDialogOpen}
       //@ts-ignore
       handleAcceptRequest={handleAcceptOptionClick}
       handleCancelAcceptRequest={handleCancelAcceptRequest}
      />
    </>
  );
};

export default TrainingRequests;
