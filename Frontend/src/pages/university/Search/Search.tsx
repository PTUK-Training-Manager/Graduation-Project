//                       <TableCell sx={{ backgroundColor: 'white'}} 
//                       style={{ color: row.status === 'Running' 
//                               ? 'orange' : row.status === 'Rejected'
//                               ? 'red' : row.status === 'Completed' 
//                               ? 'green' : row.status === 'Accepted' 
//                               ? 'blue': row.status === 'Pending' 
//                               ? 'gray' : 'white' }}>
                                
// 

import React, { useEffect, useState } from 'react';

import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import './Search.css'
import { getAllStudents } from './api';
import useSnackbar from 'src/hooks/useSnackbar';


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
name: string;
phoneNumber: string;
userId: string;
}

const Search: React.FC = () => {

  const [data,setData] = useState<Row[]>([]);
  
  useEffect(() => {
    getAllStudents()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 220},
    { field: 'studentName', headerName: 'Student Name', width: 220,flex:.5},
    { field: 'phoneNumber', headerName: 'Phone Number', width: 220,flex:.5},
    { field: 'userId', headerName: 'User Id'},
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.id,
    studentName: row.name,
    phoneNumber: row.phoneNumber,
    userId: row.userId,
  })
  )

  return (
    <>
      <DataGrid
        className="search-dataGrid"
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
        getRowId={(row) => row['studentId']}
        initialState={{
          pagination: { paginationModel: { pageSize: 30 } },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 30]}
        slots={{
          toolbar: GridToolbar,
          pagination: CustomPagination,
        }}
      />
    </>
  );
};

export default Search;