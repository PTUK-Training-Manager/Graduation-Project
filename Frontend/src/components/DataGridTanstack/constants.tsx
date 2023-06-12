import React, {ReactNode} from "react";
import {SortDirection} from "@tanstack/react-table";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {SxProps} from "@mui/material"

const sortIconStyle: SxProps = {
    fontSize: 18,
    color: "rgba(0,0,0,0.6)",
};

export const mapSortDirToIcon: Record<SortDirection, ReactNode> = {
    asc: <ArrowUpwardIcon sx={sortIconStyle}/>,
    desc: <ArrowDownwardIcon sx={sortIconStyle}/>,
};