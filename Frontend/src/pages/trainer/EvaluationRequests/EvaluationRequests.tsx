import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { getPendingEvaluations } from './api';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './EvaluRequest.css';
import { rejectEvaluationRequest } from './api';
import RichTextEditor from 'src/containers/RichTextEditor/RichTextEditor';
import theme from 'src/styling/customTheme';
import useEvaluationRequestController from './hooks/useEvaluationRequestController';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Accordion from '@mui/material/Accordion';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { acceptEvaluationRequest } from './api';
import { LibraryAddCheck, DisabledByDefault } from '@mui/icons-material';
import {
  Tooltip,
  IconButton,
  Box,
  Card,
  CardContent,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import { PendingProgressRequests } from './types';
interface QuestionDialogProps {
  isOpen: boolean;
  currentTab: string;
  handleChangeTab: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => void;
  handleCloseDialog: () => void;
  children?: React.ReactNode; // add children prop
}

const EvaluationRequests: React.FC = () => {
  const [openAcceptRequestDialog, setOpenAcceptRequestDialog] = useState(false);
  const [openRejectRequestDialog, setOpenRejectRequestDialog] = useState(false);
  const [writeNoteOpenDialog, setWriteNoteOpenDialog] = useState(false);
  const [note, setNote] = useState('');
  const [response, setReponse] = useState<PendingProgressRequests[]>([]);
  const [requestId, setRequestId] = useState('');
  const { showSnackbar } = useSnackbar();

  const handleAcceptRequestOpen = (id: string) => {
    setRequestId(id);
    setOpenAcceptRequestDialog(true);
  };

  const handleAcceptRequestClose = () => {
    setOpenAcceptRequestDialog(false);
  };

  const handleRejectRequestOpen = (id: string) => {
    setRequestId(id);
    setOpenRejectRequestDialog(true);
  };

  const handleRejectRequestClose = () => {
    setOpenRejectRequestDialog(false);
  };

  const handleWriteNoteOpen = () => {
    setWriteNoteOpenDialog(true);
    setNote('');
  };

  const handleWriteNoteClose = () => {
    setOpenRejectRequestDialog(false);
    setWriteNoteOpenDialog(false);
  };

  const handleWriteNoteSave = () => {
    rejectEvaluationRequest({ id: requestId, note: note }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setReponse((prevData) =>
            prevData.filter((row) => row.id !== requestId)
          );
          setRequestId('');
          setNote('');
          handleWriteNoteClose();
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setRequestId('');
          setNote('');
          handleWriteNoteClose();
        }
      }
    );
  };

  const handleAcceptRequestClick = () => {
    acceptEvaluationRequest({ id: requestId }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setReponse((prevData) =>
            prevData.filter((row) => row.id !== requestId)
          );
          setRequestId('');
          setOpenAcceptRequestDialog(false);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setRequestId('');
          setOpenAcceptRequestDialog(false);
        }
      }
    );
  };

  useEffect(() => {
    getPendingEvaluations()
      .then((result) => {
        setReponse(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
            Evaluation Request
          </Typography>
          {response?.map((item) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="action" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack spacing={2} gap={2} direction="row" alignItems="center">
                  <Stack spacing={2} gap={2} direction="row">
                    <Stack direction="row">
                      <Tooltip title={'Student Name'}>
                        <PersonIcon />
                      </Tooltip>
                      <Typography variant="body1" sx={{ fontWeight: '600' }}>
                        {item.Training.Student.name}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Tooltip title={'Date'}>
                        <CalendarMonthIcon />
                      </Tooltip>
                      <Typography variant="body1" sx={{ fontWeight: '600' }}>
                        {item.date}
                      </Typography>
                    </Stack>
                  </Stack>
                  <>
                    <Box className="buttons">
                      <Tooltip title={'Accept'}>
                        <IconButton
                          sx={{ ml: 2.5 }}
                          aria-label={'form 1'}
                          size="small"
                          onClick={() => handleAcceptRequestOpen(item.id)}
                        >
                          <LibraryAddCheck
                            sx={{ color: '#367E18' }}
                            color="info"
                            className="print-icon"
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'Reject'}>
                        <IconButton
                          sx={{ ml: 2.5 }}
                          aria-label={'form 1'}
                          size="small"
                          onClick={() => handleRejectRequestOpen(item.id)}
                        >
                          <DisabledByDefault
                            sx={{ color: '#D21312' }}
                            color="info"
                            className="print-icon"
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </>
                </Stack>{' '}
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
                          <Typography>Start Time: {item.startTime} </Typography>
                        </Stack>
                        <Stack gap={1.5} direction="row">
                          <Typography>End Time: {item.endTime} </Typography>
                        </Stack>
                        <Stack gap={1.5} direction="row">
                         
                        {/* <RichTextEditor
                            editable={false}
                            content={`'${item.skills}'`}

                          /> */}
                          <RichTextEditor
                            editable={false}
                            content={
                              '{"root":{"children":[{"children":[{"detail":0,"format":8,"mode":"normal","style":"","text":"Skills For Today:","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"color: #68bc00;","text":"1)","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #d33115;","text":"React Tables.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"color: #68bc00;","text":"2)","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
                            }
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Grid>
      <Dialog
        open={openAcceptRequestDialog}
        onClose={handleAcceptRequestClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Accept Request</DialogTitle>
        <DialogContent>
          Are you sure you want to accept this Progress Request?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAcceptRequestClick}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRejectRequestDialog}
        onClose={handleRejectRequestClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          Are you sure you want to reject this Progress Request?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleWriteNoteOpen}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={writeNoteOpenDialog}
        onClose={handleWriteNoteClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Write a Note </DialogTitle>
        <DialogContent>
          Please write notes for the student why you rejected this progress
          Request!
          <TextField
            margin="dense"
            label="Note"
            value={note}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNote(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWriteNoteClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleWriteNoteSave}
            color="error"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EvaluationRequests;
