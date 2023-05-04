import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Radio,
  RadioGroup,
} from '@mui/material';
import './style.css';
import { Row,Evaluation } from '../types';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FC, SyntheticEvent } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
interface EvaluationFormDialogProps {
  isOpen: boolean;
  currentTab: string;
  trainingId: string;
  handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
  handleCloseDialog: () => void;
  response: Evaluation ; // add ? to allow for undefined values
  data?: Row[];
}
const EvaluationFormDialog: FC<EvaluationFormDialogProps> = ({
  isOpen,
  currentTab,
  handleChangeTab,
  handleCloseDialog,
  trainingId,
  response,
  data,
}) => {
// export default function Review() {
  return (
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            Field Traning
          </Typography>
        </Stack>
        <Divider />

        {/* Student */}

        <Card sx={{ minWidth: 100, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student Information:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Student Name: {/* {response.Student.name} */}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
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
              <Typography sx={{ fontWeight: '600' }} component="div">
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
              <Typography sx={{ fontWeight: '600' }} component="div">
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

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Company Information:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Company Name:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Email
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
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
              <Typography sx={{ fontWeight: '600' }} component="div">
                Manegar Name{' '}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Trainer Name{' '}
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

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student working time{' '}
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Starting Date :
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Ending Date{' '}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                The daily working period
                <Typography variant="h5" component="div">
                  From{bull}nev{bull}To{bull}lent
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                number of absence's Day
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Number of training days for the student
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                Did the student keep working hours?
                <FormControlLabel control={<Checkbox disabled />} label="yes" />
                <FormControlLabel control={<Checkbox disabled />} label="No" />
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Divider />

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student benefit from training:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                The main work done by the student during the training
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                The ability of the student to carry out the tasks assigned to
                him
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
                    disabled
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    disabled
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    disabled
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel disabled control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
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
                    disabled
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    disabled
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    disabled
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel disabled control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
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
                    disabled
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    disabled
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    disabled
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel disabled control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Divider />
      </Container>
    </>
  );
};
export default EvaluationFormDialog;
