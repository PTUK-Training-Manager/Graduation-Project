import React, { useRef, useState } from 'react';

import EvaluStepper from './components/EvaluStepper';
import './CompletedTrainees.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import uselogic from './definition';
import ReactToPrint from 'react-to-print';
import { Button } from '@material-ui/core';

const CompletedTrainees: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } =
    useCompletedTraineesController();

  const {
    CompletedTraineesDataGrid,
    handleCloseDialog,
    index,
    isOpen,
    studentId,
  } = uselogic();

  const printRef = useRef(null);
  const handlePrint = () => {
    if (printRef.current) {
      //@ts-ignore
      printRef.current.handlePrint();
    }
  };

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
          <CompletedTraineesDataGrid
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
        sx={{ left: '50%' }}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                backgroundColor: '#F1F1F1',
                color: 'black',
              }}
              onClick={() => handlePrint()}
              variant="outlined"
            >
              Print The Evaluation Report
            </Button>
          )}
          content={() => printRef.current}
          documentTitle="Evaluation Training"
          pageStyle="print"
        />
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <div ref={printRef} className="print-layout">
            <EvaluStepper index={index} studentId={studentId} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompletedTrainees;
