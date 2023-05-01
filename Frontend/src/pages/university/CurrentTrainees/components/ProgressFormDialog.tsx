import {FC, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, SyntheticEvent, useState} from 'react';
import Accordion from "@mui/material/Accordion";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import {Response} from "../types";
import Transition from "src/components/Transition";
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../CurrentTrainees.css';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
  Card,
  CardContent,
} from '@mui/material';


interface ProgressFormDialogProps {
    isOpen: boolean;
    currentTab: string;
    handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
    handleCloseDialog: () => void;
    response?: Response; // add ? to allow for undefined values
}

const ProgressFormDialog: FC<ProgressFormDialogProps> = ({
                                                             isOpen,
                                                             currentTab,
                                                             handleChangeTab,
                                                             handleCloseDialog,
                                                             response,
                                                         }) => {

    

    return (
        <Dialog
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
                <CloseIcon/>
            </IconButton>
            <>
            <Grid sx={{ p: 3, height: '100vh' }}>
                      <Stack spacing={2}>
                          <Stack gap={1.5} direction="row">
                              <HourglassTopIcon />
                              <Typography>
                                  Achieved Hours: {response?.achievedHours}
                              </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                              <HourglassFullIcon />
                              <Typography>Total Hours: {response?.totalHours}</Typography>
                          </Stack>

                          {response?.progressForm.map((item: { startTime: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; endTime: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; skills: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: number) => (
                              <Accordion>
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
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
                                                          <WatchLaterIcon />
                                                          <Typography>Start Time: {item.startTime} </Typography>
                                                      </Stack>
                                                      <Stack gap={1.5} direction="row">
                                                          <WatchLaterIcon />
                                                          <Typography>End Time:{item.endTime} </Typography>
                                                      </Stack>
                                                      <Stack gap={1.5} direction="row">
                                                          <FormatListNumberedIcon />
                                                          <Typography>Skills:{item.skills} </Typography>
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
            </>
        </Dialog>
    );
};

export default ProgressFormDialog;

