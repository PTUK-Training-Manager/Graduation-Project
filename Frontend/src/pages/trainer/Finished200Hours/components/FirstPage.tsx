import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import useSnackbar from 'src/hooks/useSnackbar';
import {
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import './style.css';
import { FormControlLabel } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { submitAnswers } from '../api';
import { SubmitAnswersBody } from '../types';
import { QuestionsRequestData } from 'src/api/getQuestions';
import RichTextEditor from 'src/containers/RichTextEditor';
import { EditorState } from 'lexical';

interface FirstPageProps {
  response: QuestionsRequestData[];
  trainingID: string;
}

const FirstPage: FC<FirstPageProps> = ({ response, trainingID }) => {
  const { showSnackbar } = useSnackbar();
  const [count, setCount] = useState<number>(0);
  const [answers, setAnswers] = useState<SubmitAnswersBody>({
    trainingId: trainingID,
    arrayData: [],
  });

  const handleSubmitAnswers = () => {
    submitAnswers({
      trainingId: answers.trainingId,
      arrayData: answers.arrayData,
    }).then((res: { success: boolean; message: any }) => {
      if (res.success === true) {
        showSnackbar({ severity: 'success', message: res.message });
        setAnswers({ trainingId: trainingID,
          arrayData: [],})
      } else if (res.success === false) {
        showSnackbar({ severity: 'warning', message: res.message });
      }
    });
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const isFormComplete = (count != 6)
  ;
  useEffect(() => {
    console.log(isFormComplete)
    console.log(count)
  }, [isFormComplete]);
  return (
    <>
      <Grid container sx={{ padding: '24px' }}>
        <Stack gap={2}>
          <Typography variant="h6" gutterBottom>
            Student benefit from training:
          </Typography>
          {response.map((question, index) => (
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
                            {question.question}
                          </Typography>
                        </Stack>
                        <>
                          <Stack>
                            {question.isMultipleChoice == true && (
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={answers.arrayData[index]?.answerId}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  let answerID = '';
                                  switch (e.target.value) {
                                    case 'excellent':
                                      answerID = '1';
                                      break;
                                    case 'good':
                                      answerID = '2';
                                      break;
                                    case 'acceptable':
                                      answerID = '3';
                                      break;
                                    case 'weak':
                                      answerID = '4';
                                      break;
                                    default:
                                      break;
                                  }

                                  const updatedArrayData = [
                                    ...answers.arrayData,
                                  ];
                                  updatedArrayData[index] = {
                                    ...updatedArrayData[index],
                                    answerId: answerID,
                                  };
                                  const note = null;
                                  updatedArrayData[index] = {
                                    ...updatedArrayData[index],
                                    note: note,
                                  };
                                  const questionId = question.id;
                                  updatedArrayData[index] = {
                                    ...updatedArrayData[index],
                                    questionId: questionId,
                                  };
                                  setAnswers((prevState) => ({
                                    ...prevState,
                                    arrayData: updatedArrayData,
                                  }));
                                  setCount(count+1);
                                }}
                              >
                                <FormControlLabel
                                  value="excellent"
                                  control={<Radio />}
                                  label="Excellent"
                                />
                                <FormControlLabel
                                  value="good"
                                  control={<Radio />}
                                  label="Good"
                                />
                                <FormControlLabel
                                  value="acceptable"
                                  control={<Radio />}
                                  label="Acceptable"
                                />
                                <FormControlLabel
                                  value="weak"
                                  control={<Radio />}
                                  label="Weak"
                                />
                              </RadioGroup>
                            )}
                          </Stack>
                        </>
                        {question.isMultipleChoice == false && (
                          <Stack direction="row">
                            <RichTextEditor
                              onChange={(
                               notee
                              ) => {
                                const updatedArrayData = [...answers.arrayData];
                                updatedArrayData[index] = {
                                  ...updatedArrayData[index],
                                  note: JSON.stringify(notee),
                                };
                                const answerId = null;
                                updatedArrayData[index] = {
                                  ...updatedArrayData[index],
                                  answerId: answerId,
                                };
                                const questionId = question.id;
                                updatedArrayData[index] = {
                                  ...updatedArrayData[index],
                                  questionId: questionId,
                                };
                                setAnswers((prevState) => ({
                                  ...prevState,
                                  arrayData: updatedArrayData,
                                }));
                                if(index==7)
                                setCount(count+1);
                              }}
                            />
                          </Stack>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </>
          ))}
          <Button
            // disabled={isFormComplete}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSubmitAnswers}
          >
            Submit
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
export default FirstPage;
