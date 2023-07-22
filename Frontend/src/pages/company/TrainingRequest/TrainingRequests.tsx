import React from 'react';
import Stack from '@mui/material/Stack';
import useTrainingRequestsController from './hooks/useTrainingRequestsController';
import uselogic from './definition';
import theme from 'src/styling/customTheme';
import {Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AcceptRequestDialog from './components/AcceptRequestDialog';
import RejectRequestDialog from './components/RejectRequestDialog';
const TrainingRequests: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } =
    useTrainingRequestsController();

  const {
    TrainingRequestsDataGrid,
    handleAcceptOptionClick,
    handleCancelAcceptRequest,
    acceptRequestDialogOpen,
    rejectRequestDialogOpen,
    handleRejectOptionClick,
    handleCancelRejectRequest,
  } = uselogic();
  //@ts-ignore
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
            {t('TrainingRequests')}
          </Typography>
          <TrainingRequestsDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
      <AcceptRequestDialog
        acceptRequestDialogOpen={acceptRequestDialogOpen}
        //@ts-ignore
        handleAcceptRequest={handleAcceptOptionClick}
        handleCancelAcceptRequest={handleCancelAcceptRequest}
      />
      <RejectRequestDialog
        rejectRequestDialogOpen={rejectRequestDialogOpen}
        handleRejectRequest={handleRejectOptionClick}
        handleCancelRejectRequest={handleCancelRejectRequest}
      />
    </>
  );
};

export default TrainingRequests;
