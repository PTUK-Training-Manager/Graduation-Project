import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs, { Dayjs } from 'dayjs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Stack from '@mui/material/Stack';
import theme from 'src/styling/customTheme';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import EvaluStepper from './components/EvaluStepper';
import ProgressFormDialog from './components/ProgressFormDialog';
import Transition from 'src/components/Transition';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import { useNavigate } from 'react-router-dom';

const AddCompanyForm: React.FC = () => {
  const { trainingData } = useAllTrainingsController();
  const [isEvaluationReportOpen, setIsEvaluationReportOpen] = useState(false);
  const [isProgressReportOpen, setIsProgressReportOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');

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

  const handleCloseProgressReportDialog = () => {
    setIsProgressReportOpen(false);
  };

  const handleOpenProgressReportDialog = (trainingId: string) => {
    setTrainingId(trainingId);
    setIsProgressReportOpen((prev) => !prev);
  };

  const navigate = useNavigate();

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
            All Training
          </Typography>

          <>
            {trainingData?.map((training, index: number) => (
              <Box
                sx={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#1b5e20',
                    minWidth: '6px',
                    minHeight: '100%',
                    mr: 2,
                  }}
                ></Box>
                <Paper elevation={3} sx={{ p: 3.5, flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack
                      gap={1}
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <FormLabel component="legend">Company Name </FormLabel>
                      <Typography>
                        {training.CompanyBranch.Company.name}
                      </Typography>
                    </Stack>
                    <Stack gap={1}>
                      <FormLabel component="legend">State</FormLabel>
                      <Typography
                        sx={{
                          color:
                            training.status === 'submitted'
                              ? '#82CD47'
                              : training.status === 'rejected'
                              ? 'red'
                              : training.status === 'running'
                              ? 'orange'
                              : training.status === 'accepted'
                              ? 'blue'
                              : training.status === 'completed'
                              ? 'green'
                              : training.status === 'pending'
                              ? 'gray'
                              : training.status === 'canceled'
                              ? 'red'
                              : 'black',
                          fontWeight: '600',
                        }}
                      >
                        {training.status}
                      </Typography>
                    </Stack>

                    {training.status == 'completed' && (
                      <Stack
                        direction="row"
                        spacing={2}
                        gap={2}
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleOpenEvaluationReportDialog(training.id)
                          }
                          variant="contained"
                          sx={{
                            background:
                              'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                          }}
                        >
                          Evaluation Report
                        </Button>
                      </Stack>
                    )}
                    {training.status == 'running' && (
                      <>
                        <Stack
                          direction="row"
                          spacing={2}
                          gap={2}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Tooltip title="Fill Daily Evalution Report">
                            <IconButton
                              size="small"
                              onClick={handleClickFillEvaluationReport}
                            >
                              <BorderColorIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Button
                            onClick={() =>
                              handleOpenProgressReportDialog(training.id)
                            }
                            variant="contained"
                            sx={{
                              background:
                                'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                            }}
                          >
                            Progress Report
                          </Button>
                        </Stack>
                      </>
                    )}

                    {training.status == 'canceled' && (
                      <>
                        <Stack
                          direction="row"
                          spacing={2}
                          gap={2}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <IconButton></IconButton>
                          <Button
                            onClick={() => handleOpenProgressReportDialog(training.id)}
                            variant="contained"
                            sx={{
                              background:
                                'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                            }}
                          >
                            Progress Report
                          </Button>
                        </Stack>
                      </>
                    )}
                    {(training.status == 'submitted' ||
                      training.status == 'rejected' ||
                      training.status == 'accepted' ||
                      training.status == 'pendeing' ||
                      training.status == 'cancelled') && (
                      <Stack
                        direction="row"
                        spacing={2}
                        gap={2}
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <IconButton></IconButton>
                        <Button sx={{ color: 'white' }}> Progress Form</Button>
                      </Stack>
                    )}
                  </Box>
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
          <ProgressFormDialog trainingId={trainingId} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCompanyForm;
