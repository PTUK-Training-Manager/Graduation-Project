import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Radio, RadioGroup } from '@mui/material';
import './style.css';
import { FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { EvaluationData } from 'src/api/types';
import RichTextEditor from 'src/containers/RichTextEditor';

interface SecondPageProps {
  response: EvaluationData[];
}

const SecondPage: FC<SecondPageProps> = ({ response }) => {
  return (
    <>
      <Grid container sx={{ padding: '24px' }}>
        <Stack gap={2}>
          <Typography variant="h6" gutterBottom>
            Student benefit from training:
          </Typography>
          {response[0]?.Answered_Questions?.slice(0, length - 2).map(
            (item, index) => (
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
                            <Stack gap={1.5} direction="row">
                              <Typography sx={{ fontWeight: '600' }}>
                                Note :
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
            )
          )}
          {/* <Card
            sx={{
              minWidth: 275,
              borderLeft: 6,
              borderColor: 'black',
            }}
          >
            <CardContent>
            <Stack gap={1.5} direction="row">
                              <Typography sx={{ fontWeight: '600' }}>
                                {response[0]?.Answered_Questions[8]?.Question.question}
                                <Typography
                                  sx={{
                                    display: 'inline-block',
                                    fontWeight: '400',
                                  }}
                                >
                                {response[0]?.Answered_Questions[8]?.Note?.note}
                                </Typography>
                              </Typography>
                            </Stack>
            </CardContent>
          </Card> */}
        </Stack>
      </Grid>
    </>
  );
};
export default SecondPage;
