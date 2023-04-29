import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './CompletedTrainees.css';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import theme from "src/styling/customTheme";
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { getCompletedTrainees } from './api';

interface Row {
  studentId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
  Trainer: {
    name: string;
  };
  count: string;
  companyBranchId: string;
  id: string;
  trainerId: string;
}

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

const CompletedTrainees: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    getCompletedTrainees()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      field: 'studentId',
      headerName: 'Student Number',
      width: 400,
      flex:.3,
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      width: 400,
      flex:.3,
    },
    { field: 'trainerName', headerName: 'Trainer', width: 400,flex:.3},

    {
      field: 'branch',
      headerName: 'Company Branch',
      width: 400,
      flex:.3,
    },
    {
      field: 'evalForm',
      headerName: 'Evaluation Form',
      width: 400,
      flex:.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any; }) => (
        <IconButton
        sx={{ml:3.5}}
        aria-label='progress form'
        >
         <ManageSearchIcon sx={{color:"#820000"}} className='manage-icon'/>
        </IconButton>
       ),
     },
  ];

  const rows = data.map((row) => ({
      id: row.id,
      studentId: row.studentId,
      studentName: row.Student.name,
      Student: row.Student,   
      trainerName: row.Trainer.name,
      Trainer: row.Trainer,
      branch: row.CompanyBranch.location,
      CompanyBranch: row.CompanyBranch,
      companyBranchId: row.companyBranchId,
      trainerId: row.trainerId,
  }));

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
                    Completed Trainees
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
};

export default CompletedTrainees;