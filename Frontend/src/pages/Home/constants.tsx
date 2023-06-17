import {PanelButtonProps} from "./types";
import React from "react";
import {SxProps} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import {blue, pink, green, orange} from "@mui/material/colors";

const panelButtonIconSx: SxProps = {
    width: 48, height: 48
};

export const panelButtons: PanelButtonProps[] = [
    {
        link: "/me/training-request",
        label: "Requests",
        Icon: <PostAddIcon sx={panelButtonIconSx}/>,
        bgcolor: blue[500]
    },
    {
        link: "/me/submitted-trainees",
        label: "Applicants",
        Icon: <PeopleAltSharpIcon sx={panelButtonIconSx}/>,
        bgcolor: pink[500]
    },
    {
        link: "/me/companies",
        label: "Companies",
        Icon: <StoreSharpIcon sx={panelButtonIconSx}/>,
        bgcolor: green[500]
    },
    {
        link: "/me/current-trainees",
        label: "Trainees",
        Icon: <GroupsSharpIcon sx={panelButtonIconSx}/>,
        bgcolor: blue[900]
    },
    {
        link: "/me/all-trainings",
        label: "Archive",
        Icon: <RecentActorsSharpIcon sx={panelButtonIconSx}/>,
        bgcolor: orange[500]
    }
];