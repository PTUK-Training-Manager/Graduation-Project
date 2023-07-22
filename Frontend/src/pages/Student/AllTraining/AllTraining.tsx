/* eslint-disable react/jsx-key */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import theme from 'src/styling/customTheme';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import Chip from '@mui/material/Chip';
import EvaluStepper from './components/EvaluStepper';
import ProgressFormDialog from './components/ProgressFormDialog';
import Transition from 'src/components/Transition';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import { useNavigate } from 'react-router-dom';
import { progressForm } from 'src/api/progress';
import { Response } from './types';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';

const AddCompanyForm: React.FC = () => {
  const [isEvaluationReportOpen, setIsEvaluationReportOpen] = useState(false);
  const [isProgressReportOpen, setIsProgressReportOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
      //@ts-ignore
      setReponse(res.data);
    });
  }, [trainingId]);
  const mapStatusToColor: Record<string, string> = {
    completed: 'success',
    rejected: 'error',
    accepted: 'primary',
    running: 'warning',
    canceled: 'error',
    submitted: 'info',
    pending: 'action',
  };

  const handleOpenEvaluationReportDialog = (trainingId: string) => {
    setTrainingId(trainingId);
    console.log(isEvaluationReportOpen);
    setIsEvaluationReportOpen((prev) => !prev);
  };
  const handleClickFillEvaluationReport = () => {
    navigate('/Progress');
  };
  const handleCloseEvaluationReportDialog = () => {
    setIsEvaluationReportOpen(false);
  };
  const handleCloseDialog = () => {
    setIsProgressReportOpen(false);
    setTrainingId('');
  };
  const handleCloseProgressReportDialog = () => {
    setIsProgressReportOpen(false);
  };

  const handleOpenProgressReportDialog = (trainingId: string) => {
    setTrainingId(trainingId);
    setIsProgressReportOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const { rows } = useAllTrainingsController();
  //@ts-ignore
  const { t } = useTranslation();
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
            width: '80%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            {t('All Trainings')}
          </Typography>

          <>
            {rows.map((training) => (
              <Box
                sx={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3.5,
                    flexGrow: 1,
                    borderLeft: `8px solid ${green['900']}`,
                  }}
                >
                  <Stack spacing={1}>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Typography> {t('CompanyName')} </Typography>
                      <Typography sx={{ color: 'white' }}>
                        Evaluation Trainininasd Report..
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Typography>
                        {training?.CompanyBranch?.Company?.name}{' '}
                      </Typography>
                      <Chip
                        label={training.status}
                        size="medium"
                        variant="filled"
                        sx={{
                          color:
                            training.status === 'completed'
                              ? '#008000'
                              : training.status === 'running'
                              ? '#ff4700    '
                              : training.status === 'rejected'
                              ? '#800000'
                              : training.status === 'canceled'
                              ? '#800000'
                              : undefined,
                          fontSize: '1rem',
                          width: '8rem',
                          backgroundColor:
                            training.status === 'completed'
                              ? 'rgba(0,130,0,0.5)'
                              : training.status === 'running'
                              ? 'rgba(253,88,0,0.6)'
                              : training.status === 'rejected'
                              ? 'rgb(255, 0, 0, 0.7)'
                              : training.status === 'canceled'
                              ? 'rgb(255, 0, 0, 0.7)'
                              : 'transparent',
                        }}
                      />

                      {training.status == 'completed' && (
                        <Button
                          color="success"
                          onClick={() =>
                            handleOpenEvaluationReportDialog(training.id)
                          }
                          variant="contained"
                          sx={{
                            width: '12rem',
                            background:
                              'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                          }}
                        >
                          Evaluation Report
                        </Button>
                      )}
                      {training.status == 'running' && (
                        <Button
                          color="success"
                          onClick={() =>
                            handleOpenProgressReportDialog(training.id)
                          }
                          variant="contained"
                          sx={{
                            width: '12rem',
                          }}
                        >
                          Progress Report
                        </Button>
                      )}

                      {training.status == 'canceled' && (
                        <Button
                          color="success"
                          onClick={() =>
                            handleOpenProgressReportDialog(training.id)
                          }
                          variant="contained"
                          sx={{
                            width: '12rem',
                            background:
                              'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                          }}
                        >
                          Progress Report
                        </Button>
                      )}
                      {(training.status == 'submitted' ||
                        training.status == 'rejected' ||
                        training.status == 'accepted' ||
                        training.status == 'pendeing' ||
                        training.status == 'cancelled') && (
                        <Typography sx={{ color: 'white' }}>
                          Evaluation Traininingasd.
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            ))}
          </>
        </Stack>
      </Grid>

      <Dialog
        open={isEvaluationReportOpen}
        onClose={handleCloseEvaluationReportDialog}
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
            <EvaluStepper trainingId={trainingId} />
          </div>{' '}
        </DialogContent>
      </Dialog>
      <Dialog
        open={isProgressReportOpen}
        onClose={handleCloseProgressReportDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '50%' }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <ProgressFormDialog
            handleCloseDialog={handleCloseDialog}
            isOpen={isProgressReportOpen}
            response={response}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCompanyForm;
