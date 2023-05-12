import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import theme from 'src/styling/customTheme';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
} from '@mui/material';
import { useState } from 'react';
import useSnackbar from 'src/hooks/useSnackbar';
import ProgressFormDialog from 'src/pages/university/CurrentTrainees/components/ProgressFormDialog';
import EvaluStepper from 'src/pages/university/CompletedTrainees/components/EvaluStepper';
import Transition from 'src/components/Transition';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import { getAllTrainings } from './api';

const AddCompanyForm: React.FC = () => {
  
  const { data } = useAllTrainingsController();
  const [isOpen, setIsOpen] = useState(false);
  const [OpenEvaluatin, setOpenEvaluatin] = useState(false);

  const handleOpenDialog = () => {
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenEvaluDialog = () => {
    console.log(OpenEvaluatin);
    setOpenEvaluatin((prev) => !prev);
  };

  const handleCloseEvaluDialog = () => {
    setOpenEvaluatin(false);
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
            All Training
          </Typography>

          <>
            {data?.map((training, index: number) => (
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
                      justifyContent: 'space-between'
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
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog()}
                      sx={{
                        background:
                          'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                      }}
                    >
                     Training Evaluation Report
                    </Button>
                    )}
                    {(training.status == 'running' || training.status == 'canceled') && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog()}
                      sx={{
                        background:
                          'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
                      }}
                    >
                      Progress Report 
                    </Button>
                    )}
                    {(training.status == 'submitted' || training.status == 'rejected' || training.status == 'accepted' || training.status == 'pendeing' || training.status == 'cancelled') && (
                   <Typography sx={{fontWeight:"600",color:'white'}}>
                    No something to show!
                   </Typography>
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}
          </>
        </Stack>
      </Grid>
      <ProgressFormDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        currentTab={''}
        trainingId={''}
        handleChangeTab={function (
          event: React.SyntheticEvent<Element, Event>,
          newValue: string
        ): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dialog
        open={OpenEvaluatin}
        onClose={handleCloseEvaluDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '50%' }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <EvaluStepper />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCompanyForm;
