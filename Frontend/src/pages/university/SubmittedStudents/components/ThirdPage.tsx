import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Button, Card, CardContent, Radio, RadioGroup } from "@mui/material";
import "./style.css";
import { FormControlLabel } from "@mui/material";
import { FC } from "react";
import { EvaluationData } from "src/api/types";
import { SubmitAnswersBody } from "src/pages/trainer/Finished200Hours/types";
import { submitAnswers } from "src/pages/trainer/Finished200Hours/api";
import useSnackbar from "src/hooks/useSnackbar";
import { QuestionsRequestData } from "src/api/getQuestions";
import RichTextEditor from "src/containers/RichTextEditor";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

interface SecondPageProps {
  response: EvaluationData[];
  trainingId: string;
  question: QuestionsRequestData[];
}

const ThirdPage: FC<SecondPageProps> = ({ response, trainingId, question }) => {
  const { showSnackbar } = useSnackbar();
  const [answers, setAnswers] = React.useState<SubmitAnswersBody>({
    trainingId: trainingId,
    arrayData: [],
  });
  //@ts-ignore
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const handleSubmitAnswers = () => {
    submitAnswers({
      trainingId: answers.trainingId,
      arrayData: answers.arrayData,
    }).then((res: { success: boolean; message: any }) => {
      if (res.success === true) {
        showSnackbar({ severity: "success", message: res.message });
        //@ts-ignore
        queryClient.invalidateQueries("SubmittedTrainees");
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
      }
    });
  };

  return (
    <>
      <Grid container sx={{ padding: "24px" }}>
        <Stack gap={2}>
          <Typography variant="h6" gutterBottom>
            {t("StudentBenefit")}
          </Typography>
          {response[0]?.Answered_Questions?.map((item, index) => (
            <>
              <Stack gap={2} spacing={2}>
                <Stack gap={5} spacing={2}>
                  <Card
                    sx={{
                      minWidth: 275,
                      borderLeft: 6,
                      borderColor: "black",
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography sx={{ fontWeight: "600" }}>Question {index + 1} :</Typography>
                        <Stack gap={1.5} direction="row">
                          <Typography sx={{ fontWeight: "600" }}>
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
                            <Typography sx={{ fontWeight: "600" }}>{t("Note")}:</Typography>
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
          ))}
          <Card
            sx={{
              minWidth: 275,
              borderLeft: 6,
              borderColor: "black",
            }}
          >
            <CardContent>
              {question[0].id == "8" && (
                <Stack gap={1.5}>
                  <Typography sx={{ fontWeight: "600" }}>{question[0]?.question}</Typography>
                  <RichTextEditor
                    onChange={notee => {
                      const updatedArrayData = [...answers.arrayData];
                      updatedArrayData[0] = {
                        ...updatedArrayData[0],
                        note: JSON.stringify(notee),
                      };
                      const answerId = null;
                      updatedArrayData[0] = {
                        ...updatedArrayData[0],
                        answerId: answerId,
                      };
                      const questionId = question[0]?.id;
                      updatedArrayData[0] = {
                        ...updatedArrayData[0],
                        questionId: questionId,
                      };
                      setAnswers(prevState => ({
                        ...prevState,
                        arrayData: updatedArrayData,
                      }));
                    }}
                  />
                </Stack>
              )}
            </CardContent>
          </Card>
          <Button size="small" variant="contained" color="primary" onClick={handleSubmitAnswers}>
            Submit
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
export default ThirdPage;
