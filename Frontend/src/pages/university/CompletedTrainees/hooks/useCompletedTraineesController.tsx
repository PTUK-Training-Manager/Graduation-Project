import React, {SyntheticEvent, useEffect, useState} from "react";
import {getCompletedTrainees} from "src/pages/university/CompletedTrainees/api";
import {Row} from "../types";
import {IconButton, Tooltip} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import {getEvaluations} from "src/api/getEvaluation";
import {EvaluationData, EvaluationFormResponse} from "src/api/types";
import {useMutation} from "@tanstack/react-query";

const useCompletedTraineesController = () => {

    const [data, setData] = useState<Row[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('one');
    const [response, setResponse] = useState<EvaluationData[]>([]);
    const [index, setIndex] = useState('');
    const [studentId, setStudentId] = useState('');


    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleOpenDialog = (id: string, count: string) => {
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
            field: 'evalForm',
            headerName: 'Evaluation Form',
            width: 400,
            flex: .3,
            headerClassName: 'ctrainees',
            filterable: false,
            sortable: false,
            renderCell: (params: { row: Row }) => {
                const count = parseInt(params.row.count);
                const Evnum = params.row.count;
                const id = params.row.studentId;
                const printIcons = [];

                for (let i = 0; i < count; i++) {
                    if (count == 1)
                        printIcons.push(
                            <Tooltip title={"Progress Form 1"}>
                                <IconButton sx={{ml: 2.5}} aria-label={"form 1"} size="small"
                                            onClick={() => handleOpenDialog(id, Evnum)}
                                >

                                    <PrintIcon sx={{color: "#820000"}} color="info" className='print-icon'/>
                                </IconButton>
                            </Tooltip>
                        );
                    else
                        printIcons.push(
                            <Tooltip key={i} title={`Progress Form ${i + 1}`}>
                                <IconButton aria-label={`form ${i + 1}`} size="small">
                                    <PrintIcon sx={{color: "#820000"}} className='print-icon'/>
                                </IconButton>
                            </Tooltip>
                        );
                }

                return (
                    <>
                        {printIcons}
                    </>
                );
            }
        }
    ];

    const rows = data.map((row) => ({
        studentId: row.studentId,
        studentName: row.Student.name,
        count: row.count,
        Student: row.Student,
    }));

    useEffect(() => {
        getEvaluations({index: '0', studentId: '8'})
            .then((result) => {
                setResponse(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const {data: evaluationTrainingReport, isLoading} = useMutation(
        () => getEvaluations({index: '0', studentId: '8'}) as Promise<EvaluationFormResponse>,
        {
            onSuccess: (result) => {
                // setResponse(result.data);
                console.log(result.data);
            },
            onError: () => {

            },
            onSettled: () => {

            },
        }
    );

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
        evaluationTrainingReport: evaluationTrainingReport?.data,
        open: !!isOpen,
        index,
        studentId,
    }
};

export default useCompletedTraineesController;
