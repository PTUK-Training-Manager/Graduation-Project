import React, {useEffect, useState} from "react";
import {getCompletedTrainees} from "src/pages/university/CompletedTrainees/api";
import {Row} from "../types";
import {IconButton, Tooltip} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";


const useCompletedTraineesController = () => {

    const [data, setData] = useState<Row[]>([]);

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
                const printIcons = [];

                for (let i = 0; i < count; i++) {
                    if (count == 1)
                        printIcons.push(
                            <Tooltip title={"Progress Form 1"}>
                                <IconButton sx={{ml: 3.5}} aria-label={"form 1"} size="small">
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
        getCompletedTrainees()
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return {
        columns,
        rows,
        data,
    }
};

export default useCompletedTraineesController;
