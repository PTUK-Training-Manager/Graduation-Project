import React, {useEffect, useState, SyntheticEvent} from "react";
import {Row,Response} from "../types";
import {getCurrentTrainees} from "../api";
import {IconButton} from "@mui/material";
import {Feed} from "@mui/icons-material";
import { progressForm } from "src/api/progress";

const useCurrentTraineesController = () => {
    const [data, setData] = useState<Row[]>([]);
    const [response, setReponse] = useState<Response>();
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('one');
    const [trainingId, setTrainingId] =useState(''); 
                  

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleOpenDialog = (id: string) => {
        setTrainingId(id)
        console.log(isOpen);
        setIsOpen((prev) => !prev);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setTrainingId('')
    };
    

    const columns = [
        {field: 'studentId', headerName: 'Student Number', width: 300, flex: 0.3},
        {field: 'studentName', headerName: 'Student Name', width: 300, flex: 0.3},
        {
            field: 'progForm',
            headerName: 'Progress Form',
            width: 300,
            flex: .3,
            filterable: false,
            sortable: false,
            renderCell: (params: { id: any }) => (
                <IconButton sx={{ml: 3.5}} aria-label="progress form" onClick={() => handleOpenDialog(params.id)}
                >
                    <Feed
                    color="warning"
                        sx={{
                            borderRadius: '5px',
                            className: "manage-icon"
                        }}
                    />
                </IconButton>
            ),
        },
    ];

    const rows = data.map((row) => {
        const {
            id,
            studentId,
            Student: {name: studentName},
        } = row;

        return {
            id,
            studentId,
            studentName,
        }
    });

    useEffect(() => {
        getCurrentTrainees()
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
        setReponse(res.data);
      });
    }, [trainingId]);

    return {
        currentTab,
        handleChangeTab,
        handleOpenDialog,
        handleCloseDialog,
        columns,
        rows,
        isOpen,
        data,
        open: !!isOpen,
        response,
        trainingId,
    }
};

export default useCurrentTraineesController;

