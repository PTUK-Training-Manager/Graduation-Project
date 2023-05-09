import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import useCompletedTraineesController from '../hooks/useCompletedTraineesController';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
interface EvaluationFormDialogProps {
  // isOpen: boolean;
  // currentTab: string;
  // handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
  // handleCloseDialog: () => void;
  // data?: Row[];
}
const EvaluationFormDialog: FC<EvaluationFormDialogProps> = ({}) => {
  const { response, isOpen, currentTab, handleChangeTab, open } =
    useCompletedTraineesController();
 
  return (
    <React.Fragment>
      <Stack sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontStyle: 'oblique', mt: '20px' }}>
          Field Traning
        </Typography>
      </Stack>
      <Divider />
      <Container sx={{ p: '50px' }}>
        {/* Student */}

        <Card sx={{ minWidth: 100, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student Information:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>Student Name:</Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                Student Number:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                Phone:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                academic specialization:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Divider />

        {/* Company */}
        <Card sx={{ minWidth: '100%', mb: '5px' }}>
          <CardContent sx={{}}>
            <Typography variant="h6" gutterBottom>
              Company Information:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label="            Company Name         "
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="                Email            "
                  autoComplete="Email"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  autoComplete="phone"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id=" manegarName "
                  name="manegarName"
                  label="Manegar Name"
                  autoComplete="manegarName"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id=" trainerName "
                  name="TrainerName"
                  label=" Trainer Name"
                  autoComplete="Trainer"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Divider />

        <Card sx={{ minWidth: '100%', mb: '5px' }}>
          <CardContent sx={{}}>
            <Typography variant="h6" gutterBottom>
              Student working time
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="date"
                  name="date"
                  label="  Starting Date "
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="date"
                  name="date"
                  label="  Ending Date "
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="Time"
                  name="Time"
                  label="                The daily working period            "
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id=" absence "
                  name="absence"
                  label="                number of absence's Day            "
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id=" trainingDays "
                  name="trainingDays"
                  label="                Number of training days for the student            "
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <Typography sx={{ fontWeight: '600' }}>
                  Did the student keep working hours?
                  <FormControlLabel control={<Checkbox />} label="yes" />
                  <FormControlLabel control={<Checkbox />} label="No" />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Divider />

        {/* Student benefit from training: */}

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student benefit from training:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600', display: 'inline-block' }}>
                The main work done by the student during the training
                <TextField
                  sx={{ display: 'inline-block' }}
                  required
                  id=" trainingDays "
                  name="trainingDays"
                  label=""
                  variant="standard"
                />
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                The ability of the student to carry out the tasks assigned to
                him was:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                The student's ability to benefit from the work assigned to him
                was:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }}>
                The practical application of the theoretical subjects studied by
                the student in the college was:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Divider />
     
      </Container>
    </React.Fragment>
  );
};
export default EvaluationFormDialog;