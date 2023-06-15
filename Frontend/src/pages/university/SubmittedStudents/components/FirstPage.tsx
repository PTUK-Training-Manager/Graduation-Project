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
const FirstPage: FC<FirstPageProps> = ({ response }) => {
  const {t}=useTranslation();
  return (
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
          {t("FieldTraining")}
          </Typography>
        </Stack>
        <Divider />

        {/* Student */}
        <Stack gap={2}>
          <Card sx={{ minWidth: 100, mb: '5px' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("Student Information")}
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("StudentName")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("StudentNumber")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.studentId}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("PhoneNumber")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Student.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("academicspecialization")}:{' '}
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
                {t("CompanyInformation")}:
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("CompanyName")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.name}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("CompanyBranch")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.location}{' '}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("Email")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.User.email}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("PhoneNumber")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.phoneNumber}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("ManegarName")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.CompanyBranch.Company.managerName}
                  </Typography>
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("TrainerName")}:{' '}
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
                {t("Student_working_time")}{' '}
              </Typography>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("StartingDate")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.startDate}
                  </Typography>
                </Typography>
              </Stack>

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {t("EndingDate")}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.endDate}
                  </Typography>
                </Typography>
              </Stack>

              {/* <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                  {response[0]?.Answered_Questions[1]?.Question?.question}:{' '}
                  <Typography
                    sx={{ display: 'inline-block', fontWeight: '400' }}
                  >
                    {response[0]?.Answered_Questions[1]?.Note?.note} days
                  </Typography>
                </Typography>
              </Stack> */}

              <Stack>
                <Typography sx={{ fontWeight: '600' }}>
                 {t("Number_of_training_days")}:{' '}
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
