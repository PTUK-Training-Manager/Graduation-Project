import React, {useEffect, useState, SyntheticEvent} from "react";

import { IconButton, Tooltip} from "@mui/material";
import {DisabledByDefault, Feed, LibraryAddCheck} from "@mui/icons-material";
import { getPendingEvaluations } from "../api"; 
import { PendingProgressRequests } from "../types";
import { Row } from "../../CompletedTrainees/types";

const useEvaluationRequestController = () => {
    const [data, setData] = useState<Row[]>([]);
    const [response, setReponse] = useState<PendingProgressRequests[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [trainingId, setTrainingId] =useState(''); 
    
    const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleOpenAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


    const handleOpenDialog = () => {
        console.log(isOpen);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setTrainingId('')
    };

    
   
    const columns = [
        {field: 'studentId', headerName: 'Student Number', width: 300, flex: 0.3},
        {field: 'studentName', headerName: 'Student Name', width: 300, flex: 0.3},
        {
            field: 'Question Form',
            headerName: 'Question Form',
            width: 300,
            flex: .3,
            filterable: false,
            sortable: false,
            renderCell: (params: { id: any }) => (
                <>
               <Tooltip title={"Accept"}>
                                <IconButton sx={{ml: 2.5}} aria-label={"form 1"} size="small"       
>
                                   
                                    <LibraryAddCheck sx={{color: "#367E18"}} color="info" className='print-icon'/>
                                </IconButton>
                            </Tooltip>
                                <Tooltip title={"Reject"}>
                                <IconButton sx={{ml: 2.5}} aria-label={"form 1"} size="small"       
                                    onClick={() => handleOpenDialog()}
                                    >
                                   
                                    <DisabledByDefault sx={{color: "#D21312"}} color="info" className='print-icon'/>
                                </IconButton>
                            </Tooltip>
                            </>
            ),
        },
    ];

    const rows = data.map((row) => ({
        studentId: row.studentId,
        studentName: row.Student.name,
        count: row.count,
        Student: row.Student,
    }));

    useEffect(() => {
        getPendingEvaluations()
            .then((result) => {
                setReponse(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
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
    }
};

export default useEvaluationRequestController;