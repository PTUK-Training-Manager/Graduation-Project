import {
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import { Response } from '../types';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
  Card,
  CardContent,
  LinearProgress,
  LinearProgressProps,
  CircularProgressProps,
  Tooltip,
} from '@mui/material';
import { progressForm } from 'src/progressForm';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Stack
      direction="row"
      sx={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}
    >
      <Box sx={{ width: '100%', paddingLeft: '16px', paddingRight: '8px' }}>
        <LinearProgress color="warning" variant="determinate" {...props} />
      </Box>
      <Typography
        sx={{ color: 'black' }}
        color="text.secondary"
      >{`${props.value}%`}</Typography>
    </Stack>
  );
}

interface ProgressFormDialogProps {
  trainingId: string;
}

const ProgressFormDialog: FC<ProgressFormDialogProps> = ({ trainingId }) => {
  const [response, setReponse] = useState<Response>();
  const remainingHours = response
    ? parseFloat(response.totalHours) - parseFloat(response.achievedHours)
    : 0;
  const percentage = response
    ? (parseFloat(response.achievedHours) / parseFloat(response.totalHours)) *
      100.0
    : 0;
  console.log(percentage);

  useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
      setReponse(res.data);
    });
  }, [trainingId]);

  return (
    <Grid sx={{ padding: '2' }}>
      <LinearProgressWithLabel value={percentage} />

      <Grid sx={{ p: 2, height: '100vh' }}>
        <Stack spacing={2}>
          <Stack gap={1.5} direction="row">
            <HourglassTopIcon color="action" />
            <Typography>Achieved Hours: {response?.achievedHours}</Typography>
          </Stack>
          <Stack gap={1.5} direction="row">
            <HourglassTopIcon color="action" />
            <Typography> Remaining Hours: {remainingHours} </Typography>
          </Stack>
          <Stack gap={1.5} direction="row">
            <HourglassFullIcon color="action" />
            <Typography>Total Hours: {response?.totalHours}</Typography>
          </Stack>

          {response?.progressForm.map(
            (
              item: {
                startTime:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                endTime:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                skills:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
              },
              index: number
            ) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Day {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
                    <Card
                      sx={{
                        minWidth: 275,
                        borderLeft: 6,
                        borderColor: 'orange',
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack gap={1.5} direction="row">
                            <WatchLaterIcon color="action" />
                            <Typography>
                              Start Time: {item.startTime}{' '}
                            </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                            <WatchLaterIcon color="action" />
                            <Typography>End Time:{item.endTime} </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                            <FormatListNumberedIcon color="action" />
                            <Typography>Skills:{item.skills} </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProgressFormDialog;
