import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './CompletedTrainees.css';
import ClearIcon from '@mui/icons-material/Clear';
import { getCompletedTrainees } from './api';
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
  studentId: string;
  Student: {
    name: string;
  };
  count: string;
}

const CompletedTrainees: React.FC = () => {
  const [data,setData] = useState<Row[]>([]);
  
  useEffect(() => {
    getCompletedTrainees()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 220},
    { field: 'studentName', headerName: 'Student Name', width: 220,flex:.5},
    { field: 'count', headerName: 'Number Of Finished Trainings', width: 220,flex:.5},
    { field: 'progForm', headerName: 'Progress Form', 
    minwidth: 150,
    flex:.3,
    headerClassName:'ctrainees',
      filterable:false,
      sortable:false,
      renderCell: (params: { id: any; }) => (
        <IconButton
        aria-label='progress form'
        >
         <ClearIcon />
        </IconButton>
       ),
     },
  
  ]
  
  const rows = data.map((row) => ({
    studentId: row.studentId,
    studentName: row.Student.name,
    count: row.count,
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
    getRowId={row=>row['count']}
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

export default CompletedTrainees;