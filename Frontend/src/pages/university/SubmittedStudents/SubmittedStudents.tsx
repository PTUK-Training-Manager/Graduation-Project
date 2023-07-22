import React from 'react';
import { useTranslation } from 'react-i18next';
import EvaluStepper from './components/EvaluStepper';
import './SubmittedStudents.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import useSubmittedTraineesController from './hooks/useSubmittedTraineesController';
import uselogic from './definition';

const SubmittedStudents: React.FC = () => {
  const {
    SubmittedTraineesDataGrid,
    handleCloseDialog,
    isOpen,
    trainingId,
  } = uselogic();

  const { rows, totalRows, isFetching, onGetDataGrid } =
    useSubmittedTraineesController();

    //@ts-ignore
  const { t, i18n } = useTranslation();

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
            {t('Submitted Students')}
          </Typography>
          <SubmittedTraineesDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{
          left: '15%',
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent
          sx={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
        >
          <EvaluStepper trainingId={trainingId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmittedStudents;
