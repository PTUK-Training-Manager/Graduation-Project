import React, {useEffect, useState, SyntheticEvent} from "react";
import {Row} from "../types";
import {getCurrentTrainees} from "../api";
import {IconButton} from "@mui/material";
import {Feed} from "@mui/icons-material";

const useCurrentTraineesController = () => {
    const [data, setData] = useState<Row[]>([]);
    const [response, setReponse] = useState<Response>();
    const [trainingId, setTrainingId] = React.useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('one');

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleOpenDialog = () => {
        console.log(isOpen);
        setIsOpen((prev) => !prev);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
    };

    const columns = [
        {field: 'studentId', headerName: 'Student Number', width: 300, flex: 0.3},
        {field: 'studentName', headerName: 'Student Name', width: 300, flex: 0.3},
        {field: 'companyName', headerName: 'Company Name', width: 300, flex: 0.3},
        {
            field: 'progForm',
            headerName: 'Progress Form',
            width: 300,
            flex: .3,
            headerClassName: 'ctrainees',
            filterable: false,
            sortable: false,
            renderCell: (params: { id: any }) => (
                <IconButton sx={{ml: 3.5}} aria-label="progress form" onClick={handleOpenDialog}>
                    {/* <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" /> */}
                    <Feed
                        sx={{
                            backgroundColor: '#255983',
                            borderRadius: '5px',
                            color: '#ecf1f1',
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
            CompanyBranch: {Company: {name: companyName}}
        } = row;

        return {
            id,
            studentId,
            studentName,
            companyName,
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
    }
};

export default useCurrentTraineesController;