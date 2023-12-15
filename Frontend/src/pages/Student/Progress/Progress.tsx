/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichTextEditor from "src/containers/RichTextEditor/RichTextEditor";
import { EditorState } from "lexical";
import { useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import theme from "src/styling/customTheme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSnackbar from "src/hooks/useSnackbar";
import Divider from "@mui/material/Divider";
import Edit from "@mui/icons-material/Edit";
import { submitEvaluation, editEvaluationForm } from "./api";
import dayjs, { Dayjs } from "dayjs";
import useProgressController from "./hooks/useProgressController";

import { useTranslation } from "react-i18next";

const Progress: React.FC = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const { showSnackbar } = useSnackbar();
  const { data, rejectedEvaluations, pendingEvaluations } = useProgressController();
  const [startTime, setStartTime] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(dayjs(""));
  const [endTime, setEndTime] = useState<string>("");
  // const [skills, setSkills] = useState('');
  const [endTimeType, setEndTimeType] = useState<string>("");
  const [startTimeType, setStartTimeType] = useState<string>("");
  const [fillEvaluation, setFillEvaluation] = useState(true);
  const [editEvaluation, setEditEvaluation] = useState(false);
  const [evaluationId, setEvaluationId] = useState<number>(-1);
  const [skills, setSkills] = React.useState<EditorState | null>(null);
  //@ts-ignore
  const { t } = useTranslation();
  const handleSubmit = () => {
    if (
      JSON.stringify(skills).length === 176 
      ) {
      showSnackbar({ severity: "warning", message: "Skills cannot be empty" });
      return;
    }

    submitEvaluation({
      startTime: startTime,
      endTime: endTime,
      startTimeType: startTimeType,
      endTimeType: endTimeType,
      //@ts-ignore
      skills: JSON.stringify(skills),
      trainingId: data?.trainingId,
      //@ts-ignore
      date: date,
    })
      .then(result => {
        if (result.success === true) {
          showSnackbar({ severity: "success", message: result.message });
          setEditEvaluation(false);
          setFillEvaluation(true);
          setDate(dayjs(""));
          setStartTime("");
          setEndTime("");
          setStartTimeType("");
          setEndTimeType("");
        } else if (result.success === false) {
          showSnackbar({ severity: "warning", message: result.message });
        }
      })
      .catch(error => console.log(error));
  };
  const handleSubmitEdit = () => {
    //@ts-ignore
    if (!JSON.stringify(skills).trim) {
      // Show a warning or handle the empty location case
      showSnackbar({ severity: "warning", message: "Skills cannot be empty, you should fill it!" });
      return;
    }
    editEvaluationForm({
      startTime: startTime,
      endTime: endTime,
      startTimeType: startTimeType,
      endTimeType: endTimeType,
      //@ts-ignore
      skills: JSON.stringify(skills),
      //@ts-ignore
      date: date,
      id: evaluationId,
    })
      .then(result => {
        if (result.success === true) {
          showSnackbar({ severity: "success", message: result.message });
          setEditEvaluation(false);
          setFillEvaluation(true);
          setDate(dayjs(""));
          setStartTime("");
          setEndTime("");
          setStartTimeType("");
          setEndTimeType("");
        } else if (result.success === false) {
          showSnackbar({ severity: "warning", message: result.message });
        }
      })
      .catch(error => console.log(error));
  };

  const handleEditEvaluation = (evaluationId: number) => {
    setEditEvaluation(true);
    setFillEvaluation(false);
    setEvaluationId(evaluationId);
    topRef.current?.scrollIntoView({ behavior: "auto" });
  };
  //@ts-ignore
  const handleStartTimeChange = (newValue: string | null) => {
    if (newValue) {
      const time = dayjs(newValue, "HH:mm:ss");
      const updatedTime = dayjs(newValue, "HH:mm:ss").format("HH:mm:ss");
      const timeType = time.format("A");
      setStartTime(updatedTime);
      setStartTimeType(timeType);
    } else {
      setStartTime("");
      setStartTimeType("");
    }
  };
  const handleEndChange = (newValue: string | null) => {
    if (newValue) {
      const time = dayjs(newValue, "HH:mm:ss");
      const updatedTime = dayjs(newValue, "HH:mm:ss").format("HH:mm:ss");
      const timeType = time.format("A");
      setEndTime(updatedTime);
      setEndTimeType(timeType);
    } else {
      setEndTime("");
      setEndTimeType("");
    }
  };

  // Add a new state to track form validity
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid: boolean =
      date !== null &&
      startTime !== "" &&
      endTime !== "" &&
      startTimeType !== "" &&
      endTimeType !== "" &&
      skills !== null;
    //@ts-ignore
    // Update the form validity state
    setIsFormValid(isValid);
  }, [date, startTime, endTime, startTimeType, endTimeType, skills]);

  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1}
          spacing={1}
          ref={topRef}
          sx={{
            width: "80%",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Evaluations
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",

              alignItems: "center",
            }}
          >
            <Stack
              gap={1}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Stack spacing={1} gap={1}>
                  <Stack
                    gap={1.5}
                    direction="row"
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue: React.SetStateAction<dayjs.Dayjs | null>) =>
                          setDate(newValue)
                        }
                      />

                      <MobileTimePicker
                        value={startTime}
                        label={"Start Time"}
                        views={["hours", "minutes", "seconds"]}
                        onChange={handleStartTimeChange}
                      />

                      <MobileTimePicker
                        value={endTime}
                        label={"End Time"}
                        views={["hours", "minutes", "seconds"]}
                        onChange={handleEndChange}
                      />
                    </LocalizationProvider>
                  </Stack>

                  <RichTextEditor 
                    onChange={skills => {
                      console.log(JSON.stringify(skills));
                      setSkills(skills);
                    }}
                  />

                  {fillEvaluation && (
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(45deg, #004e64 30%, #25a18e 90%)",
                      }}
                      onClick={handleSubmit}
                      // Disable the button if the form is not valid
                      disabled={!isFormValid}
                    >
                      Submit
                    </Button>
                  )}

                  {editEvaluation && (
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(45deg, #004e64 30%, #25a18e 90%)",
                      }}
                      onClick={handleSubmitEdit}
                    >
                      Submit Edits
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack spacing={2} gap={2} direction="row">
                    <Typography variant="body1" color="error" sx={{ fontWeight: "600" }}>
                      Rejected Evaluations
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {rejectedEvaluations?.map(evaluation => {
                    return (
                      <>
                        <Stack spacing={2}>
                          <Card
                            sx={{
                              minWidth: 275,
                              borderLeft: 6,
                              borderColor: "orange",
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Typography fontWeight="600">
                                  Submitted Date:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {evaluation.date}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  Start Time:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {evaluation.startTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  End Time:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {" "}
                                    {evaluation.endTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">Skills: </Typography>
                                <RichTextEditor editable={false} content={evaluation.skills} />
                                <Stack
                                  direction="row"
                                  sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography fontWeight="600">
                                    Trainer's Note for reject this:{" "}
                                  </Typography>
                                  <RichTextEditor
                                    editable={false}
                                    content={evaluation.Note?.note}
                                  />
                                  <IconButton onClick={() => handleEditEvaluation(evaluation.id)}>
                                    <Tooltip title="Edit This Evaluation">
                                      <Edit color="warning" />
                                    </Tooltip>
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                          <Divider />
                        </Stack>
                      </>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack spacing={2} gap={2} direction="row">
                    <Typography variant="body1" color="gray" sx={{ fontWeight: "600" }}>
                      Pending Evaluations
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {pendingEvaluations?.map(evaluation => {
                    return (
                      <>
                        <Stack spacing={2}>
                          <Card
                            sx={{
                              minWidth: 275,
                              borderLeft: 6,
                              borderColor: "orange",
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Typography fontWeight="600">
                                  Submitted Date:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {evaluation.date}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  Start Time:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {evaluation.startTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  End Time:{" "}
                                  <Typography
                                    sx={{
                                      display: "inline-block",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {" "}
                                    {evaluation.endTime}
                                  </Typography>
                                </Typography>
                                <Stack
                                  direction="row"
                                  sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography fontWeight="600">Skills: </Typography>
                                  <RichTextEditor editable={false} content={evaluation.skills} />
                                  <IconButton onClick={() => handleEditEvaluation(evaluation.id)}>
                                    <Tooltip title="Edit This Evaluation">
                                      <Edit color="warning" />
                                    </Tooltip>
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                          <Divider />
                        </Stack>
                      </>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </>
  );
};
export default Progress;
