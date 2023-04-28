import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './CurrentTrainees.css';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { getCurrentTrainees } from './api';
import { IconButton } from '@mui/material';

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
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
  Trainer: {
    name: string;
  };
  trainerId: string
}

const CurrentTrainees: React.FC = () => {
  const [data,setData] = useState<Row[]>([]);
  
  useEffect(() => {
    getCurrentTrainees()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 220},
    { field: 'studentName', headerName: 'Student Name', width: 220,flex:.5},
    { field: 'companyBranch', headerName: 'Company Branch', width: 220,flex:.5},
    { field: 'trainerName', headerName: 'Trainer', width: 220,flex:.5},

    {
      field: 'progForm',
      headerName: 'Progress Form',
      minwidth: 150,
      flex: 0.3,
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
  
  ]
  
  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyBranch: row.CompanyBranch.location,
    trainerName: row.Trainer.name,
    Trainer: row.Trainer,
    Student: row.Student,
    trainerId: row.trainerId,
    companyBranchId: row.companyBranchId,
  })
  )

  return (
    <>
 
  <DataGrid className='dataGrid' 
  sx={{
    boxShadow: 10,
    border: 1,
    borderColor: '#cacaca',
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main',
      
    },
  }}
  
   columns={columns} 
   rows={rows}
    getRowId={row=>row['id']}
    initialState={{
      pagination: { paginationModel: { pageSize: 30 } },
    }}
    pageSizeOptions={[10, 20, 30]}
    slots={{
      toolbar: GridToolbar,
      pagination: CustomPagination,

    }}
   />

    </>
  );
}

export default CurrentTrainees;