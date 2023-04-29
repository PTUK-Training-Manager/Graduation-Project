import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './SubmittedStudents.css';
import { getSubmittedStudents } from './api';
import { Grid, IconButton, Stack, Typography, } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import theme from "src/styling/customTheme";


function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
interface Row {
  id: string;
  trainerId: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  endDate: string;
  semester: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
}

const SubmittedStudents: React.FC = () => {
  const [data,setData] = useState<Row[]>([]);
  
  useEffect(() => {
    getSubmittedStudents()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 400,flex:.3},
    { field: 'studentName', headerName: 'Student Name', width: 400,flex:.3},
    {
      field: 'evaluationForm',
      headerName: 'Evaluation Form',
      width: 400,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any; }) => (
       <IconButton
       sx={{ml:3.5}}
       aria-label='progress form'
       >
        <NoteAltIcon sx={{color:"#820000"}} className='edit-icon'/>
       </IconButton>
      ),
    },
  ];

 const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    type: row.type,
    semester: row.semester,
    status: row.status,
    startDate: row.startDate,
    endDate: row.endDate,
    Student: row.Student,    
    companyBranchId: row.companyBranchId,
    trainerId: row.trainerId
  })
  )
  return (
    <>
 
 <Grid container sx={{
            p: 3,
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}>
            <Stack gap={1.5} sx={{
                width: '100%',
                height: '100%',
            }}>
                <Typography component="h1" variant="h5" fontWeight={500}>
                    Submitted Trainees
                </Typography>
                <DataGrid
                    className="dataGrid"
                    sx={{
                        boxShadow: 10,
                        border: 1,
                        borderColor: '#cacaca',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main'
                        }
                    }}
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row['id']}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 30}},
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    slots={{
                        toolbar: GridToolbar,
                        pagination: CustomPagination,
                    }}
                />
            </Stack>
        </Grid>

    </>
  );
}

export default SubmittedStudents;