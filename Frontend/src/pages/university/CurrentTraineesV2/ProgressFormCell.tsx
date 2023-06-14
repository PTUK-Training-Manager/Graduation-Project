import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import {Feed} from "@mui/icons-material";
import {CellContext} from "@tanstack/react-table";
import {RunningTraineesData} from "./API/types";
import {useTraineesContext} from "../context/TraineesContext";
import {TrainingDialog} from "src/pages/university/constants";

interface ProgressFormCellProps extends CellContext<RunningTraineesData, any> {
}

const ProgressFormCell: FC<ProgressFormCellProps> = (props) => {

    const {
        row: {original},
    } = props;
    
    const {onOpenDialog, openDialog, onSetSelectedTrainingId, selectedTrainingId} = useTraineesContext();
    
    console.log(useTraineesContext());

    const handleRowClick = () => {
        console.log(openDialog);
        onOpenDialog(TrainingDialog.Progress);
        
        //@ts-ignore
        onSetSelectedTrainingId(original.id);
        console.log(selectedTrainingId)
    }

    return (
        <IconButton
            sx={{ml: 3.5}}
            aria-label="progress form"
            onClick={handleRowClick}
        >
            <Feed
                color="warning"
                sx={{
                    borderRadius: '5px',
                    className: 'manage-icon',
                }}
            />
        </IconButton>
    );
};

export default ProgressFormCell;
