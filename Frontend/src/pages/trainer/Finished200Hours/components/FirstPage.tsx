import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useSnackbar from "src/hooks/useSnackbar";
import { Button, Card, CardContent, Dialog, DialogContent, Radio, RadioGroup } from "@mui/material";
import "./style.css";
import { FormControlLabel } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { submitAnswers } from "../api";
import { SubmitAnswersBody } from "../types";
import { QuestionsRequestData } from "src/api/getQuestions";
import RichTextEditor from "src/containers/RichTextEditor";
import Transition from "src/components/Transition";
import { EditorState } from "lexical";
import { useQueryClient } from "@tanstack/react-query";

interface FirstPageProps {
  response: QuestionsRequestData[];
  trainingID: string;
  handleCloseDialog: () => void;
  isOpen: boolean;
}

const FirstPage: FC<FirstPageProps> = ({ response, trainingID, handleCloseDialog, isOpen }) => {
  const { showSnackbar } = useSnackbar();
  console.log(trainingID);
  const [answers, setAnswers] = useState<SubmitAnswersBody>({
    trainingId: trainingID,
    arrayData: [],
  });
  console.log(answers.trainingId);
  const queryClient = useQueryClient();

  const handleSubmitAnswers = () => {
    console.log(answers.trainingId);

    submitAnswers({
      trainingId: trainingID,
      arrayData: answers.arrayData,
    }).then((res: { success: boolean; message: any }) => {
      if (res.success === true) {
        showSnackbar({ severity: "success", message: res.message });
        setAnswers({ trainingId: trainingID, arrayData: [] });
        //@ts-ignore
        queryClient.invalidateQueries("FinidhedRequiredHours");
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
      }
    });
    handleCloseDialog();
  };
  useEffect(() => {
    console.log("trainingID:", trainingID);
    console.log("answers:", answers);
  }, [trainingID, answers]);
  useEffect(() => {
    console.log(answers);
  }, [answers]);

  return (
    <>
      <Grid container sx={{ padding: "2" }}>
        <Dialog
          open={isOpen}
          onClose={handleCloseDialog}
          fullScreen
          TransitionComponent={Transition}
          sx={{ left: "25%" }}
        >
          <DialogContent>
            <Stack gap={2} sx={{ padding: "2" }}>
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
                          borderColor: "black",
                        }}
                      >
                        <CardContent>
                          <Stack spacing={2}>
                            <Typography sx={{ fontWeight: "600" }}>
                              Question {index + 1} :
                            </Typography>
                            <Stack gap={1.5} direction="row">
                              <Typography sx={{ fontWeight: "600" }}>
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
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      let answerID = "";
                                      switch (e.target.value) {
                                        case "excellent":
                                          answerID = "1";
                                          break;
                                        case "good":
                                          answerID = "2";
                                          break;
                                        case "acceptable":
                                          answerID = "3";
                                          break;
                                        case "weak":
                                          answerID = "4";
                                          break;
                                        default:
                                          break;
                                      }

                                      const updatedArrayData = [...answers.arrayData];
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
                                      setAnswers(prevState => ({
                                        ...prevState,
                                        arrayData: updatedArrayData,
                                      }));
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
                                  onChange={(notee: EditorState) => {
                                    const updatedArrayData = [...answers.arrayData];
                                    updatedArrayData[index] = {
                                      ...updatedArrayData[index],
                                      //@ts-ignore
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
                                    setAnswers(prevState => ({
                                      ...prevState,
                                      arrayData: updatedArrayData,
                                    }));
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
                size="small"
                variant="contained"
                color="primary"
                onClick={handleSubmitAnswers}
              >
                Submit
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};
export default FirstPage;
