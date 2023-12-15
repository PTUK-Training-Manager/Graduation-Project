/* eslint-disable react/jsx-key */
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "./EvaluRequest.css";
import RichTextEditor from "src/containers/RichTextEditor/RichTextEditor";
import theme from "src/styling/customTheme";
import useEvaluationRequestController from "./hooks/useEvaluationRequestController";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Accordion from "@mui/material/Accordion";
import PersonIcon from "@mui/icons-material/Person";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AcceptRequestDialog from "./components/AcceptRequestDialog";
import RejectRequestDialog from "./components/RejectRequestDialog";
import WriteNoteForRejectionDialog from "./components/WriteNoteForRejectionDialog";
import { LibraryAddCheck, DisabledByDefault } from "@mui/icons-material";
import { Tooltip, IconButton, Box, Card, CardContent } from "@mui/material";
import NumbersIcon from '@mui/icons-material/Numbers';

const EvaluationRequests: React.FC = () => {
  const {
    openAcceptRequestDialog,
    handleAcceptRequestOpen,
    handleAcceptRequestClose,
    openRejectRequestDialog,
    handleRejectRequestClose,
    handleRejectRequestOpen,
    handleAcceptRequestClick,
    writeNoteOpenDialog,
    handleWriteNoteSave,
    handleWriteNoteClose,
    handleWriteNoteOpen,
    onSetNote,
    response,
    note,
  } = useEvaluationRequestController();

  return (
    <>
      <Grid
        container
        sx={{
          p: 3,
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Evaluation Request
          </Typography>
          {response?.map(item => {
            const re = JSON.stringify(item.skills);
            const result = `${re}`;
            console.log(item.skills);
            console.log(result);
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="action" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack spacing={2} gap={2} direction="row" alignItems="center">
                    <Stack spacing={2} gap={2} direction="row">

                    <Stack direction="row">
                        <Tooltip title={"Student Number"}>
                          <NumbersIcon />
                        </Tooltip>
                        <Typography variant="body1" sx={{ fontWeight: "600" }}>
                          {item.Training.StudentId}
                        </Typography>
                      </Stack>

                      <Stack direction="row">
                        <Tooltip title={"Student Name"}>
                          <PersonIcon />
                        </Tooltip>
                        <Typography variant="body1" sx={{ fontWeight: "600" }}>
                          {item.Training.Student.name}
                        </Typography>
                      </Stack>

                      <Stack direction="row">
                        <Tooltip title={"Date"}>
                          <CalendarMonthIcon />
                        </Tooltip>
                        <Typography variant="body1" sx={{ fontWeight: "600" }}>
                          {item.date}
                        </Typography>
                      </Stack>
                    </Stack>
                    <>
                      <Box className="buttons">
                        <Tooltip title={"Accept"}>
                          <IconButton
                            sx={{ ml: 2.5 }}
                            aria-label={"form 1"}
                            size="small"
                            onClick={() => handleAcceptRequestOpen(item.id)}
                          >
                            <LibraryAddCheck
                              sx={{ color: "#367E18" }}
                              color="info"
                              className="print-icon"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Reject"}>
                          <IconButton
                            sx={{ ml: 2.5 }}
                            aria-label={"form 1"}
                            size="small"
                            onClick={() => handleRejectRequestOpen(item.id)}
                          >
                            <DisabledByDefault
                              sx={{ color: "#D21312" }}
                              color="info"
                              className="print-icon"
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </>
                  </Stack>{" "}
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
                    <Card
                      sx={{
                        minWidth: 275,
                        borderLeft: 6,
                        borderColor: "orange",
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
                            <RichTextEditor editable={false} content={item.skills} />
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      </Grid>

      <AcceptRequestDialog
        openAcceptRequestDialog={openAcceptRequestDialog}
        handleAcceptRequestClick={handleAcceptRequestClick}
        handleAcceptRequestClose={handleAcceptRequestClose}
      />
      <RejectRequestDialog
        openRejectRequestDialog={openRejectRequestDialog}
        handleRejectRequestClose={handleRejectRequestClose}
        handleWriteNoteOpen={handleWriteNoteOpen}
      />
      <WriteNoteForRejectionDialog
        writeNoteOpenDialog={writeNoteOpenDialog}
        handleWriteNoteClose={handleWriteNoteClose}
        handleWriteNoteSave={handleWriteNoteSave}
        onSetNote={onSetNote}
        //@ts-ignore
        note={note}
      />
    </>
  );
};

export default EvaluationRequests;
