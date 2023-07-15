import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Container, Divider } from '@mui/material';
import './style.css';

import { FC } from 'react';
import { EvaluationData } from 'src/api/types';
import { useTranslation } from 'react-i18next';

interface FirstPageProps {
  response: EvaluationData[];
}
//@ts-ignore

const FirstPage: FC<FirstPageProps> = ({ response }) => {
  return (
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            FieldTraining
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
                  StudentName:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  StudentNumber:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.studentId}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  PhoneNumber:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  academicspecialization:{' '}
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
                CompanyInformation:
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  CompanyName:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  CompanyBranch:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.location}{' '}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Email:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.User.email}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  PhoneNumber:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                ManegarName:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.managerName}
                  </Typography>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  TrainerName:{' '}
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
                Student_working_time{' '}
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  StartingDate:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.startDate}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  EndingDate:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.endDate}
                  </Typography>
                </Typography>
              </Stack>

              {/* <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {response[0]?.Answered_Questions[7]?.Question?.question}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Answered_Questions[7]?.Note?.note} days
                  </Typography>
                </Typography>
              </Stack> */}

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  Number_of_training_days_for_the_student:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
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
export default FirstPage;
