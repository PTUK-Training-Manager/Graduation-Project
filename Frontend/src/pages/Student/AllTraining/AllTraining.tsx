import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import theme from 'src/styling/customTheme';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import EvaluStepper from './components/EvaluStepper';
import ProgressFormDialog from './components/ProgressFormDialog';
import Transition from 'src/components/Transition';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import { useNavigate } from 'react-router-dom';
import { progressForm } from 'src/api/progress';
import { Response } from './types';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';

const AddCompanyForm: React.FC = () => {
  const [isEvaluationReportOpen, setIsEvaluationReportOpen] = useState(false);
  const [isProgressReportOpen, setIsProgressReportOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();

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

  // useEffect(() => {
  //   progressForm({ trainingId: trainingId }).then((res) => {
  //     //@ts-ignore
  //     setReponse(res.data);
  //   });
  // }, [trainingId]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useAllTrainingsController({
    pagination,
  });
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
            All Trainings
          </Typography>

          <>
            {rows?.map((training) => (
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
                      <Typography> Company Name </Typography>
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
                        {training.CompanyBranch.Company.name}{' '}
                      </Typography>

                      <Chip
                        label={training.status}
                        color={mapStatusToColor[training.status] as any}
                        size="medium"
                        variant="filled"
                        sx={{ fontSize: '1rem', width: '8rem' }}
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
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <EvaluStepper trainingId={trainingId} />
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
