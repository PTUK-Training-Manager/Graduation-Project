import React, {SyntheticEvent, useEffect, useState} from "react";
import {getCompletedTrainees} from "src/pages/university/CompletedTrainees/api";
import {Row,Evaluation} from "../types";
import {Button, IconButton, Tooltip} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { getEvaluations } from "src/api/getEvaluation";
import {EvaluationData, EvaluationFormResponse} from "src/api/types";
import { Feed, InsertDriveFile } from "@mui/icons-material";


const useCompletedTrainingController = () => {

    const [data, setData] = useState<Row[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('one');
    const [response, setReponse] = useState<EvaluationData[]>([]);
    const [index, setIndex] = useState('');
    const [studentId, setStudentId] = useState('');

    
    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
      };

      const handleOpenDialog = (id: string) => {
        setIndex('0')
        setStudentId('8');
        console.log(isOpen);
        setIsOpen((prev) => !prev);
      };

    const columns = [
        {
            field: 'studentId',
            headerName: 'Student Number',
            width: 400,
            flex: .3,
        },
        {
            field: 'studentName',
            headerName: 'Student Name',
            width: 400,
            flex: .3,
        },
        {
            field: 'Question Form',
            headerName: 'Question Form',
            width: 250,
            flex: .3,
            filterable: false,
            sortable: false,
            renderCell: (params: { id: any }) => (
                <>
                <IconButton sx={{mr: '3.5px',p:'33px'}} aria-label="Evaluation " onClick={() => handleOpenDialog(params.id)}
                >
                    <InsertDriveFile
                    color="warning"
                        sx={{
                            borderRadius: '5px',
                            className: "manage-icon"
                        }}
                    />
                </IconButton>
                <Button size="small" variant="contained" href="#contained-buttons" color="success">
  Submit
</Button>
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
        getEvaluations({index:0,studentId: '8'})
            .then((result) => {
                setReponse(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

      const handleCloseDialog = () => {
        setIsOpen(false);
      };

    useEffect(() => {
        getCompletedTrainees()
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return {
        currentTab,
        handleChangeTab,
        handleOpenDialog,
        handleCloseDialog,
        columns,
        rows,
        data,
        isOpen,
        response,
        open: !!isOpen,
        index,
        studentId,
    }
};

export default useCompletedTrainingController;