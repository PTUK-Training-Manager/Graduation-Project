import React, { useEffect, useState } from "react";

import { IconButton, Tooltip } from "@mui/material";
import { DisabledByDefault, LibraryAddCheck } from "@mui/icons-material";
import { getPendingEvaluations } from "../api";
import { PendingProgressRequests } from "../types";
import { Row } from "../../CompletedTrainees/types";
import useSnackbar from "src/hooks/useSnackbar";
import { acceptEvaluationRequest, rejectEvaluationRequest } from "../api";
import { EditorState } from "lexical";

const useEvaluationRequestController = () => {
  const [data] = useState<Row[]>([]);
  const [response, setReponse] = useState<PendingProgressRequests[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = React.useState<EditorState | null>(null);
  // const [note, setNote] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [openAcceptRequestDialog, setOpenAcceptRequestDialog] = useState(false);
  const [openRejectRequestDialog, setOpenRejectRequestDialog] = useState(false);
  const [writeNoteOpenDialog, setWriteNoteOpenDialog] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [requestId, setRequestId] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleOpenAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
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

  const handleOpenDialog = () => {
    console.log(isOpen);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId("");
  };

  const handleWriteNoteOpen = () => {
    setWriteNoteOpenDialog(true);
    // setNote("");
  };

  const handleWriteNoteClose = () => {
    setOpenRejectRequestDialog(false);
    setWriteNoteOpenDialog(false);
  };

  const onSetNote = (note: EditorState) => setNote(note);

  const handleAcceptRequestClick = () => {
    acceptEvaluationRequest({ id: requestId }).then(
      (res: { success: boolean; message: string }) => {
        if (res.success === true) {
          showSnackbar({ severity: "success", message: res.message });
          setReponse(prevData => prevData.filter(row => row.id !== requestId));
          setRequestId("");
          setOpenAcceptRequestDialog(false);
        } else if (res.success === false) {
          showSnackbar({ severity: "warning", message: res.message });
          setRequestId("");
          setOpenAcceptRequestDialog(false);
        }
      }
    );
  };
  const handleWriteNoteSave = () => {
    rejectEvaluationRequest({ id: requestId, note: JSON.stringify(note) }).then(
      (res: { success: boolean; message: string }) => {
        if (res.success === true) {
          showSnackbar({ severity: "success", message: res.message });
          setReponse(prevData => prevData.filter(row => row.id !== requestId));
          setRequestId("");
          // setNote("");
          handleWriteNoteClose();
        } else if (res.success === false) {
          showSnackbar({ severity: "warning", message: res.message });
          setRequestId("");
          // setNote("");
          handleWriteNoteClose();
        }
      }
    );
  };

  const columns = [
    { field: "studentId", headerName: "Student Number", width: 300, flex: 0.3 },
    { field: "studentName", headerName: "Student Name", width: 300, flex: 0.3 },
    {
      field: "Question Form",
      headerName: "Question Form",
      width: 300,
      flex: 0.3,
      filterable: false,
      sortable: false,
      renderCell: () => (
        <>
          <Tooltip title={"Accept"}>
            <IconButton sx={{ ml: 2.5 }} aria-label={"form 1"} size="small">
              <LibraryAddCheck sx={{ color: "#367E18" }} color="info" className="print-icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Reject"}>
            <IconButton
              sx={{ ml: 2.5 }}
              aria-label={"form 1"}
              size="small"
              onClick={() => handleOpenDialog()}
            >
              <DisabledByDefault sx={{ color: "#D21312" }} color="info" className="print-icon" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = data.map(row => ({
    studentId: row.studentId,
    studentName: row.Student.name,
    count: row.count,
    Student: row.Student,
  }));

  useEffect(() => {
    getPendingEvaluations()
      .then(result => {
        //@ts-ignore
        setReponse(result.data);
        console.log(result.data);
      })
      .catch(error => console.log(error));
  }, []);

  return {
    handleOpenDialog,
    handleCloseDialog,
    columns,
    rows,
    isOpen,
    data,
    handleOpenAcordion,
    expanded,
    response,
    trainingId,
    openAcceptRequestDialog,
    handleAcceptRequestOpen,
    handleAcceptRequestClose,
    openRejectRequestDialog,
    handleRejectRequestOpen,
    handleRejectRequestClose,
    requestId,
    handleAcceptRequestClick,
    handleWriteNoteSave,
    writeNoteOpenDialog,
    handleWriteNoteOpen,
    handleWriteNoteClose,
    onSetNote,
    note,
  };
};

export default useEvaluationRequestController;
