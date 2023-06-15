import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import RichTextEditor from 'src/containers/RichTextEditor/RichTextEditor';
import { EditorState } from 'lexical';
import { useRef } from 'react';
import theme from 'src/styling/customTheme';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Tooltip,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useSnackbar from 'src/hooks/useSnackbar';
import Divider from '@mui/material/Divider';
import Edit from '@mui/icons-material/Edit';
import { submitEvaluation, editEvaluationForm } from './api';
import dayjs, { Dayjs } from 'dayjs';
import useProgressController from './hooks/useProgressController';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Progress: React.FC = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const { showSnackbar } = useSnackbar();
  const { data, rejectedEvaluations, pendingEvaluations } =
    useProgressController();
  const [startTime, setStartTime] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(''));
  const [endTime, setEndTime] = useState<string>('');
  // const [skills, setSkills] = useState('');
  const [endTimeType, setEndTimeType] = useState<string>('');
  const [startTimeType, setStartTimeType] = useState<string>('');
  const [fillEvaluation, setFillEvaluation] = useState(true);
  const [editEvaluation, setEditEvaluation] = useState(false);
  const [evaluationId, setEvaluationId] = useState<number>(-1);
  const [skills, setSkills] = React.useState<EditorState | null>(null);

  const handleSubmit = () => {
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
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setEditEvaluation(false);
          setFillEvaluation(true);
          setDate(dayjs(''));
          setStartTime('');
          setEndTime('');
          setStartTimeType('');
          setEndTimeType('');
        } else if (result.success === false) {
          showSnackbar({ severity: 'warning', message: result.message });
        }
      })
      .catch((error) => console.log(error));
  };
  const handleSubmitEdit = () => {
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
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setEditEvaluation(false);
          setFillEvaluation(true);
          setDate(dayjs(''));
          setStartTime('');
          setEndTime('');
          setStartTimeType('');
          setEndTimeType('');
        } else if (result.success === false) {
          showSnackbar({ severity: 'warning', message: result.message });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEditEvaluation = (evaluationId: number) => {
    setEditEvaluation(true);
    setFillEvaluation(false);
    setEvaluationId(evaluationId);
    topRef.current?.scrollIntoView({ behavior: 'auto' });
  };
//@ts-ignore
  const handleStartTimeChange = (newValue: string | null) => {
    if (newValue) {
      const time = dayjs(newValue, 'HH:mm:ss');
      const updatedTime = dayjs(newValue, 'HH:mm:ss').format('HH:mm:ss');
      const timeType = time.format('A');
      setStartTime(updatedTime);
      setStartTimeType(timeType);
    } else {
      setStartTime('');
      setStartTimeType('');
    }
  };
  const handleEndChange = (newValue: string | null) => {
    if (newValue) {
      const time = dayjs(newValue, 'HH:mm:ss');
      const updatedTime = dayjs(newValue, 'HH:mm:ss').format('HH:mm:ss');
      const timeType = time.format('A');
      setEndTime(updatedTime);
      setEndTimeType(timeType);
    } else {
      setEndTime('');
      setEndTimeType('');
    }
  };

  useEffect(() => {
    console.log(startTime);
    console.log(startTimeType);
    console.log(endTime);
    console.log(endTimeType);
    console.log(skills);
    console.log(date);
  }, [startTime, startTimeType, endTime, endTimeType, skills]);

  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1}
          spacing={1}
          ref={topRef}
          sx={{
            width: '80%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Evaluations
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',

              alignItems: 'center',
            }}
          >
            <Stack
              gap={1}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Stack spacing={1} gap={1}>
                  <Stack
                    gap={1.5}
                    direction="row"
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                      />

                      <MobileTimePicker
                        value={startTime}
                        label={'Start Time'}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={handleStartTimeChange}
                      />

                      <MobileTimePicker
                        value={endTime}
                        label={'End Time'}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={handleEndChange}
                      />
                    </LocalizationProvider>
                  </Stack>

                  <RichTextEditor
                    onChange={(skills) => {
                      console.log(JSON.stringify(skills));
                      setSkills(skills);
                    }}
                  />

                  {fillEvaluation && (
                    <Button
                      variant="contained"
                      sx={{
                        background:
                          'linear-gradient(45deg, #004e64 30%, #25a18e 90%)',
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}

                  {editEvaluation && (
                    <Button
                      variant="contained"
                      sx={{
                        background:
                          'linear-gradient(45deg, #004e64 30%, #25a18e 90%)',
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
                width: '100%',
                height: '100%',
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack spacing={2} gap={2} direction="row">
                    <Typography
                      variant="body1"
                      color="error"
                      sx={{ fontWeight: '600' }}
                    >
                      Rejected Evaluations
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {rejectedEvaluations?.map((evaluation) => {
                    const re = JSON.stringify(evaluation.skills);
                    const result = `${re}`;
                    const reject = JSON.stringify(evaluation.Note?.note);
                    const rejectResult = `${reject}`;
                    return (
                      <>
                        <Stack spacing={2}>
                          <Card
                            sx={{
                              minWidth: 275,
                              borderLeft: 6,
                              borderColor: 'orange',
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Typography fontWeight="600">
                                  Submitted Date:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {evaluation.date}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  Start Time:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {evaluation.startTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  End Time:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {' '}
                                    {evaluation.endTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  Skills:{' '}
                                </Typography>
                                <RichTextEditor
                                  editable={false}
                                  content={JSON.stringify(evaluation.skills)}
                                />
                                <Stack
                                  direction="row"
                                  sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography fontWeight="600">
                                    Trainer's Note for reject this:{' '}
                                  </Typography>
                                  <RichTextEditor
                                    editable={false}
                                    content={JSON.stringify(evaluation.Note?.note)}
                                  />
                                  <IconButton
                                    onClick={() =>
                                      handleEditEvaluation(evaluation.id)
                                    }
                                  >
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
                width: '100%',
                height: '100%',
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack spacing={2} gap={2} direction="row">
                    <Typography
                      variant="body1"
                      color="gray"
                      sx={{ fontWeight: '600' }}
                    >
                      Pending Evaluations
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {pendingEvaluations?.map((evaluation) => {
                    const re = JSON.stringify(evaluation.skills);
                    const result = `${re}`;
                    return (
                      <>
                        <Stack spacing={2}>
                          <Card
                            sx={{
                              minWidth: 275,
                              borderLeft: 6,
                              borderColor: 'orange',
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Typography fontWeight="600">
                                  Submitted Date:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {evaluation.date}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  Start Time:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {evaluation.startTime}
                                  </Typography>
                                </Typography>
                                <Typography fontWeight="600">
                                  End Time:{' '}
                                  <Typography
                                    sx={{
                                      display: 'inline-block',
                                      fontWeight: '400',
                                    }}
                                  >
                                    {' '}
                                    {evaluation.endTime}
                                  </Typography>
                                </Typography>
                                <Stack
                                  direction="row"
                                  sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography fontWeight="600">
                                    Skills:{' '}
                                  </Typography>
                                  <RichTextEditor
                                    editable={false}
                                    // content={JSON.stringify(evaluation.skills)}
                                  />
                                  <IconButton
                                    onClick={() =>
                                      handleEditEvaluation(evaluation.id)
                                    }
                                  >
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
