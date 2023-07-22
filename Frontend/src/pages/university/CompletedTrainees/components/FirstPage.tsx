import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import './style.css';

import React, { FC } from 'react';
import { EvaluationData } from 'src/api/types';
import { useTranslation } from 'react-i18next';
import RichTextEditor from 'src/containers/RichTextEditor';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

interface FirstPageProps {
  response: EvaluationData[];
}

const FirstPage: FC<FirstPageProps> = ({ response }) => {
  //@ts-ignore
  const { t, i18n } = useTranslation();

  return (
    <>
      <Container sx={{ p: 1 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            {t('FieldTraining')}{' '}
          </Typography>
        </Stack>
        <Divider />

        {/* Student */}
        <Stack gap={4}>
          <Card
            sx={{
              minWidth: 275,
              borderLeft: 6,
              borderColor: 'black',
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Student Information:
                  </Typography>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('StudentName')}{' '}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.Student.name}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('StudentNumber')}{' '}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.studentId}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('PhoneNumber')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.Student.phoneNumber}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('academicspecialization')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.Student.department}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Divider />

          {/* Company */}

          <Card
            sx={{
              minWidth: 275,
              borderLeft: 6,
              borderColor: 'black',
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('CompanyInformation')}:
                  </Typography>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('CompanyName')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.CompanyBranch.Company.name}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('CompanyBranch')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.CompanyBranch.location}{' '}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('Email')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.CompanyBranch.Company.User.email}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('PhoneNumber')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.CompanyBranch.Company.phoneNumber}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('ManagerName')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.CompanyBranch.Company.managerName}
                    </Typography>
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('TrainerName')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.Trainer.name}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Divider />

          <Card
            sx={{
              minWidth: 275,
              borderLeft: 6,
              borderColor: 'black',
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('Student_working_time')}
                  </Typography>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('StartingDate')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.startDate}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('EndingDate')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.endDate}
                    </Typography>
                  </Typography>
                </Stack>

                <Stack>
                  <Typography sx={{ fontWeight: '600' }}>
                    {t('Number_of_training_days')}
                    <Typography
                      sx={{ display: 'inline-block', fontWeight: '400' }}
                    >
                      {response[0]?.Evaluations.length}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Divider />
          <Typography variant="h6" gutterBottom>
            Student benefit from training:
          </Typography>
          {response[0]?.Answered_Questions?.map((item, index) => {
            const re = JSON.stringify(item.Note?.note);
            const result = `${re}`;
            console.log(item.Note?.note);
            console.log(result);
            return (
              <>
                <Stack gap={2} spacing={2}>
                  <Stack gap={5} spacing={2}>
                    <Card
                      sx={{
                        minWidth: 275,
                        borderLeft: 6,
                        borderColor: 'black',
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Question {index + 1} :
                          </Typography>
                          <Stack gap={1.5} direction="row">
                            <Typography sx={{ fontWeight: '600' }}>
                              {item.Question.question}
                            </Typography>
                          </Stack>
                          {item.Answer?.answer && (
                            <>
                              <Stack>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={item.Answer.answer}
                                >
                                  <FormControlLabel
                                    disabled
                                    value="excellent"
                                    control={<Radio />}
                                    label="Excellent"
                                  />
                                  <FormControlLabel
                                    disabled
                                    value="good"
                                    control={<Radio />}
                                    label="Good"
                                  />
                                  <FormControlLabel
                                    disabled
                                    value="acceptable"
                                    control={<Radio />}
                                    label="Acceptable"
                                  />
                                  <FormControlLabel
                                    disabled
                                    value="weak"
                                    control={<Radio />}
                                    label="Weak"
                                  />
                                </RadioGroup>
                              </Stack>
                            </>
                          )}
                          {item.Note?.note && (
                            <Stack gap={1.5}>
                              <Typography sx={{ fontWeight: '600' }}>
                                Note:{' '}
                              </Typography>

                              <RichTextEditor
                                editable={false}
                                //@ts-ignore
                                content={item.Note?.note}
                              />
                            </Stack>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </>
            );
          })}
          <Divider />
          <Typography></Typography>
          <Typography></Typography>
          <Typography></Typography>
          <Typography variant="h6" gutterBottom>
            Progress Report
          </Typography>
          {response[0]?.Evaluations.map((item, index: number) => {
            const re = JSON.stringify(item.skills);
            const result = `${re}`;
            console.log(item.skills);
            console.log(result);
            return (
              <>
                <Stack gap={2} spacing={2}>
                  <Stack gap={5} spacing={2}>
                    <Card
                      sx={{
                        minWidth: 275,
                        borderLeft: 6,
                        borderColor: 'black',
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Day {index + 1}
                          </Typography>
                          <Stack gap={1.5} direction="row">
                            <WatchLaterIcon color="action" />
                            <Typography sx={{ fontWeight: '600' }}>
                              Start Time :
                              <Typography
                                sx={{
                                  display: 'inline-block',
                                  fontWeight: '400',
                                }}
                              >
                                {item.startTime}
                              </Typography>
                            </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                            <WatchLaterIcon color="action" />
                            <Typography sx={{ fontWeight: '600' }}>
                              End Time :
                              <Typography
                                sx={{
                                  display: 'inline-block',
                                  fontWeight: '400',
                                }}
                              >
                                {item.endTime}
                              </Typography>
                            </Typography>
                          </Stack>
                          <Stack gap={1.5}>
                            <Stack gap={1.5} direction="row">
                              <FormatListNumberedIcon color="action" />
                              <Typography sx={{ fontWeight: '600' }}>
                                Skills:
                              </Typography>
                            </Stack>
                            <RichTextEditor
                              editable={false}
                              //@ts-ignore
                              content={item.skills}
                            />
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};
export default FirstPage;
