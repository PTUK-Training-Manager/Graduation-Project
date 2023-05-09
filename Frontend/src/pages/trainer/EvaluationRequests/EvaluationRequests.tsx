import React, {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './EvaluRequest.css';
import theme from 'src/styling/customTheme';
import useEvaluationRequestController from './hooks/useEvaluationRequestController';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { LibraryAddCheck, DisabledByDefault } from '@mui/icons-material';
import { Tooltip, IconButton, Box, Card, CardContent } from '@mui/material';
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
  const {
    response,
    isOpen,
    expanded,
    handleOpenDialog,

    handleCloseDialog,
    handleOpenAcordion,
  } = useEvaluationRequestController();

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
          {response?.map(
            (
              item,
              index: number
            ) => (
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleOpenAcordion('panel1')}
              >

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Stack direction="row" alignItems="center">
    <Typography variant="body1" sx={{ flexGrow: 1 }}>
      {item.Training.Student.name}
    </Typography>
    <>
                  <Box className="buttons">
                    <Tooltip title={'Accept'}>
                      <IconButton
                        sx={{ ml: 2.5 }}
                        aria-label={'form 1'}
                        size="small"
                      >
                        <LibraryAddCheck
                          sx={{ color: '#367E18'}}
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
                        onClick={() => handleOpenDialog()}
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
                  </Stack>
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
                            <Typography>
                              Start Time: {item.startTime}
                            </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                            <Typography>End Time: {item.endTime} </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                            <Typography>Skills: {item.skills} </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          )}
          {/* <Accordion expanded={expanded === 'panel1'} onChange={handleOpenAcordion('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Student Name 
                    </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Date</Typography>
        </AccordionSummary>
  <Typography>
    Information from student 
  </Typography>
        <AccordionDetails sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <>
    <Tooltip title={"Accept"}>
      <IconButton sx={{ ml: 2.5 }} aria-label={"form 1"} size="small">
        <LibraryAddCheck sx={{ color: "#367E18" }} color="info" className='print-icon' />
      </IconButton>
    </Tooltip>
    <Tooltip title={"Reject"}>
      <IconButton sx={{ ml: 2.5 }} aria-label={"form 1"} size="small" onClick={() => handleOpenDialog()}>
        <DisabledByDefault sx={{ color: "#D21312" }} color="info" className='print-icon' />
      </IconButton>
    </Tooltip>
  </>
</AccordionDetails>

      </Accordion> */}
        </Stack>
      </Grid>
      <Dialog open={isOpen} onClose={handleCloseDialog}></Dialog>
    </>
  );
};

export default EvaluationRequests;
