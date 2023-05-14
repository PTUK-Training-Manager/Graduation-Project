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
import { SubmitEvaluationBody } from './api/request.dto';
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [date, setDate] = useState(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [skills, setSkills] = useState('');
  const [endTimeType, setEndTimeType] = useState<string | null>(null);
  const [startTimeType, setStartTimeType] = useState<string | null>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setOpenAccordion(false);
  };
  const [data, setData] = useState<SubmitEvaluationBody>();

  const handleStartTimeChange = (newValue: Date | null) => {
    setStartTime(newValue);
  
    if (newValue) {
      // Extract hours and minutes from the selected time
      const hours = newValue.getHours();
      const minutes = newValue.getMinutes();
  
      // Determine the time type (AM or PM)
      const timeType = hours >= 12 ? 'PM' : 'AM';
  
      // Remove the time type from the selected time
      const timeWithoutType = new Date();
      timeWithoutType.setHours(hours % 12, minutes, 0);
  
      setStartTimeType(timeType);
      setStartTime(timeWithoutType);
    }
  };
  const handleEndTimeChange = (newValue: Date | null) => {
    setEndTime(newValue);
  
    if (newValue) {
      // Extract hours and minutes from the selected time
      const hours = newValue.getHours();
      const minutes = newValue.getMinutes();
  
      // Determine the time type (AM or PM)
      const timeType = hours >= 12 ? 'PM' : 'AM';
  
      // Remove the time type from the selected time
      const timeWithoutType = new Date();
      timeWithoutType.setHours(hours % 12, minutes, 0);
  
      setEndTimeType(timeType);
      setEndTime(timeWithoutType);
    }
  };
  useEffect(() => {
    console.log(startTime);
    console.log(endTime);
    console.log(startTimeType);
    console.log(endTimeType);
    console.log(skills);
    console.log(date)
  }, [startTime,endTime,startTimeType,endTimeType,skills,date]);  

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
                        onChange={handleStartTimeChange}
                        label={'Start Time'}
                        views={['hours', 'minutes', 'seconds']}
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
                        onChange={handleEndTimeChange}
                        label={'End Time'}
                        views={['hours', 'minutes', 'seconds']}
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

            <Root>
              <Divider>
                <Chip
                  label="Rejected Progress"
                  sx={{
                    color: 'white',
                    background:
                      // '#004e64'
                      'linear-gradient(45deg, #850000 30%, #DC0000 90%)',
                  }}
                />
              </Divider>
            </Root>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 2,
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Card
                  sx={{
                    borderLeft: '5px solid',
                    borderColor: '#004e64',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          disabled
                          sx={{ width: '40%', height: '60%' }}
                          label="Start Date"
                          value={data}
                          // onChange={(newValue) => setDate(newValue)}
                        />
                        <DatePicker
                          disabled
                          sx={{ width: '40%', height: '60%' }}
                          label="End Date"
                          value={date}
                          onChange={(newValue) => setDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>

                    <IconButton sx={{ alignSelf: 'flex-end' }}>
                      <Edit sx={{ color: '#004e64' }} />
                    </IconButton>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Grid>
    </>
  );
};
export default Progress;
