import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import {Feed} from "@mui/icons-material";
import {useTraineesContext} from "../context/TraineesContext";
import {TrainingDialog} from "src/pages/university/constants";
import {ProgressFormCellProps} from "./types";

const ProgressFormCell: FC<ProgressFormCellProps> = (props) => {

    const {
        row: {original},
    } = props;

    const {onOpenDialog, onSetSelectedTrainingId} = useTraineesContext();

    const handleRowClick = () => {
        onSetSelectedTrainingId(+original.id);
        onOpenDialog(TrainingDialog.Progress);
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
