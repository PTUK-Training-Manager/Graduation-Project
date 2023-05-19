import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import theme from 'src/styling/customTheme';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useSnackbar from 'src/hooks/useSnackbar';
import Divider from '@mui/material/Divider';
import Edit from '@mui/icons-material/Edit';
import { submitEvaluation } from './api';
import dayjs, { Dayjs } from 'dayjs';
import TimePicker from '@mui/lab/TimePicker';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Progress: React.FC = () => {
  const { showSnackbar } = useSnackbar();

  const [openAccordion, setOpenAccordion] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(''));
  const [endTime, setEndTime] = useState<string>('');
  const [skills, setSkills] = useState('');
  const [endTimeType, setEndTimeType] = useState<string>('');
  const [startTimeType, setStartTimeType] = useState<string>('');

  const handleSubmit = (event: any) => {
    submitEvaluation({
      startTime: startTime,
      endTime: endTime,
      startTimeType: startTimeType,
      endTimeType: endTimeType,
      skills: skills,
      trainingId: 3,
      date: date,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  };

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
          p: 3,
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Fill Progress
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3.5rem',

              alignItems: 'center',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                p: 3.5,
                minWidth: { xs: '90%', sm: '60%', md: '30%' },
              }}
            >
              <Stack spacing={2} gap={2}>
                <Stack
                  spacing={2}
                  gap={2}
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        'MobileTimePicker',
                        'MobileTimePicker',
                        'MobileTimePicker',
                      ]}
                      sx={{ minWidth: 210 }}
                    >
                      <MobileTimePicker
                        value={startTime}
                        label={'Start Time'}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={handleStartTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        'MobileTimePicker',
                        'MobileTimePicker',
                        'MobileTimePicker',
                      ]}
                      sx={{ minWidth: 210 }}
                    >
                      <MobileTimePicker
                        value={endTime}
                        label={'End Time'}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={handleEndChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
                <Stack
                  spacing={2}
                  gap={2}
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>

                  <TextField
                    required
                    id="outlined-required"
                    label="Skills"
                    value={skills}
                    onChange={(event) => setSkills(event.target.value)}
                  />

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
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>
                  <Typography sx={{ color: 'white' }}> </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Grid>
    </>
  );
};
export default Progress;
