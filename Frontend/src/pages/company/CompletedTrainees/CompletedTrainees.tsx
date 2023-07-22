import React, {
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EvaluStepper from './components/EvaluStepper';
import './CompletedTrainees.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import uselogic from './definition';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';

const CompletedTrainees: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useCompletedTraineesController({
    pagination,
  });
  const printRef = useRef(null);
  const handlePrint = () => {
    if (printRef.current) {
      //@ts-ignore
      printRef.current.handlePrint();
    }
  };
  const {
    handleCloseDialog,
    handleOpenDialog,
    isOpen,
    open,
    trainingId,
    CompletedTraineesDataGrid,
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
            {t('Completed Trainees')}
          </Typography>
          <CompletedTraineesDataGrid data={rows} />
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
          <div ref={printRef} className="print-layout">
            <EvaluStepper trainingId={trainingId} />
          </div>
        </DialogContent>
        <ReactToPrint
          trigger={() => (
            <Button onClick={() => handlePrint()} variant="outlined">
              Print
            </Button>
          )}
          content={() => printRef.current}
          documentTitle="Evaluation Training"
          pageStyle="print"
        />
      </Dialog>
    </>
  );
};

export default CompletedTrainees;
