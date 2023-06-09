import {
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SyntheticEvent,
} from 'react';

// Radial separators
// import CircularProgress from '@mui/joy/CircularProgress';
import Accordion from '@mui/material/Accordion';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { Response, Row } from '../types';
import Transition from 'src/components/Transition';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../CurrentTrainees.css';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
  Card,
  CardContent,
  LinearProgress,
  LinearProgressProps,
  CircularProgressProps,
  Tooltip,
} from '@mui/material';
import RichTextEditor from 'src/containers/RichTextEditor';

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
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress color="warning" variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface ProgressFormDialogProps {
  isOpen: boolean;
  currentTab: string;
  trainingId: string;
  handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
  handleCloseDialog: () => void;
  response?: Response; // add ? to allow for undefined values
  data?: Row[];
}

const ProgressFormDialog: FC<ProgressFormDialogProps> = ({
  isOpen,
  currentTab,
  handleChangeTab,
  handleCloseDialog,
  trainingId,
  response,
  data,
}) => {
  const remainingHours = response
    ? parseFloat(response.totalHours) - parseFloat(response.achievedHours)
    : 0;
  const percentage = response
    ? (parseFloat(response.achievedHours) / parseFloat(response.totalHours)) *
      100.0
    : 0;
  console.log(percentage);
  const student = data?.find((trainee) => trainee.id === trainingId)?.Student;
  const studentId = data?.find(
    (trainee) => trainee.id === trainingId
  )?.studentId;

  return (
    <Grid sx={{ padding: '2' }}>
      <Dialog
        sx={{ left: '50%' }}
        fullScreen
        open={isOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
        >
          <CloseIcon color="action" />
        </IconButton>
        <>
          <LinearProgressWithLabel value={percentage} />
          <Grid sx={{ p: 2, height: '100vh' }}>
            <Stack spacing={2}>
              {student && (
                <>
                  <Stack gap={2}>
                    <Stack gap={1.5} direction="row">
                      <Tooltip title={'Student Name'}>
                        <PersonIcon color="action" />
                      </Tooltip>
                      <Typography variant="h6">{student.name}</Typography>
                    </Stack>
                  </Stack>
                </>
              )}

              <Stack gap={1.5} direction="row">
                <HourglassTopIcon color="action" />
                <Typography>
                  Achieved Hours: {response?.achievedHours}
                </Typography>
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
                  item,
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
                        <Box
                          sx={{ borderBottom: 1, borderColor: 'divider' }}
                        ></Box>
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
                                <Typography>
                                  End Time:{item.endTime}{' '}
                                </Typography>
                              </Stack>
                              <Stack gap={1.5} direction="row">
                                <FormatListNumberedIcon color="action" />
                                <RichTextEditor
                            editable={false}
                            //@ts-ignore
                            content={item.skills}
                          />
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
        </>
      </Dialog>
    </Grid>
  );
};

export default ProgressFormDialog;
