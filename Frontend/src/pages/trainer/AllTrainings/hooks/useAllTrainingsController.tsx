import React, {SyntheticEvent, useEffect, useState} from "react";
import {getCompletedTrainees} from "src/pages/university/CompletedTrainees/api";
import {Row} from "../types";
import {IconButton, TableCell, Tooltip} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { evaluation } from "src/api/getEvaluation";
import { getAllTrainings } from "../api";


const useAllTrainingsController = () => {

    const [data, setData] = useState<Row[]>([]);

    const columns = [
        { field: 'studentId', headerName: 'Student Number', width: 220, flex: 0.5 },
        { field: 'studentName', headerName: 'Student Name', width: 220, flex: 0.5 },
        {
          field: 'companyBranch',
          headerName: 'Company Branch',
          width: 220,
          flex: 0.5,
        },
        { field: 'type', headerName: 'Type', width: 220, flex: 0.5 },
        {
          field: 'status',
          headerName: 'Status',
          width: 220,
          flex: 0.5,
          renderCell: (params: { row: Row }) => {
            const status = params.row.status;
            let color = 'white';
            if (status === 'running') {
              color = 'orange';
            } else if (status === 'accepted') {
              color = 'blue';
            } else if (status === 'completed') {
              color = 'green';
            } else if (status === 'pending') {
              color = 'gray';
            } else if (status === 'rejected') {
              color = 'red';
            } else if (status === 'submitted') {
              color = '#82CD47';
            } else if (status === 'canceled') {
              color = 'red';
            }
    
            return <TableCell sx={{ color: color }}>{params.row.status}</TableCell>;
          },
        },
        { field: 'startDate', headerName: 'Start Date', width: 220, flex: 0.5 },
        { field: 'endDate', headerName: 'End Date', width: 220, flex: 0.5 },
      ];
    
      const rows = data.map((row) => ({
        id: row.id,
        studentId: row.studentId,
        studentName: row.Student.name,
        companyBranch: row.CompanyBranch.location,
        type: row.type,
        status: row.status,
        startDate: row.startDate,
        endDate: row.endDate,
        Student: row.Student,
        CompanyBranch: row.CompanyBranch,
        companyBranchId: row.companyBranchId,
      }));

    useEffect(() => {
      getAllTrainings()
        .then((result) => {
          setData(result.data);
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return {
      columns,rows,data
    }
};

export default useAllTrainingsController;
