import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Radio,
  RadioGroup,
} from '@mui/material';
import './style.css';

import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FC, SyntheticEvent } from 'react';
import useCompletedTraineesController from '../hooks/useCompletedTraineesController';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
interface EvaluationFormDialogProps {}
const EvaluationFormDialog: FC<EvaluationFormDialogProps> = ({}) => {
  const { response, isOpen, currentTab, handleChangeTab, open } =
    useCompletedTraineesController();

  return (
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            Field Training
          </Typography>
        </Stack>
        <Divider />

        {/* Student */}
        <Stack gap={2}>
          <Card sx={{ minWidth: 100, mb: '5px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Student Information:
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Student Name: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Student Number: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.studentId}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  PhoneNumber: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  academic specialization: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.department}
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
                <Typography sx={{ fontWeight: '600' }}>
                  Company Name: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Company Branch: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.location}{' '}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Email: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.User.email}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  PhoneNumber: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Manegar Name: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.managerName}
                  </Typography>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Trainer Name: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Trainer.name}
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
                <Typography sx={{ fontWeight: '600' }}>
                  Starting Date: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.startDate}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Ending Date: {' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.endDate}
                  </Typography>
                </Typography>
              </Stack>

              
              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                 {response[0]?.Answered_Questions[7]?.Question?.question}: {' '}
                  <Typography
                    sx={{display: 'inline-block',fontWeight: '400'  }}
                  >
                    {response[0]?.Answered_Questions[7]?.Note?.note} days
                  </Typography>
                </Typography>
              </Stack>
              
              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Number of training days for the student: {' '}
                  <Typography
                    sx={{display: 'inline-block',fontWeight: '400' }}
                  >
                    {response[0]?.Evaluations.length} days
                  </Typography>
                </Typography>
              </Stack>
              
            </CardContent>
          </Card>
          <Divider />

        </Stack>
      </Container>
    </>
  );
};
export default EvaluationFormDialog;
