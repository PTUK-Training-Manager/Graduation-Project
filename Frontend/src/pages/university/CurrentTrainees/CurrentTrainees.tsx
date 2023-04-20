import React, { useMemo, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';

import useAccountContext from 'src/hooks/useAccountContext';
import Box from '@mui/material/Box';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './CurrentTrainees.css';


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

const CurrentTrainees: React.FC = () => {
  const {isSidebarOpen} = useAccountContext();
const [pageSize,setPageSize] = useState(10);
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
    getRowId={row=>row['SNumber']}
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
const columns=[
  { field: 'SNumber', headerName: 'Student Number', width: 220,headerclassName: 'ctrainees '},
  { field: 'SName', headerName: 'Student Name', width: 220,flex:.5,headerclassName: 'ctrainees' },
  { field: 'progForm', headerName: 'Progress Form', 
  minwidth: 150,
  flex:.3,
  headerClassName:'ctrainees',
    filterable:false,
    sortable:false,
  },

]
const rows = [
  { SNumber: 201910213, 
    SName: 'Sara Zebdeh'
  },

  {
    SNumber: '201910213',
    SName: 'Sara Zebdeh',
  },
  {
    SNumber : 201910135,
    SName: 'Hannen Thiab',
  },
  {
    SNumber: 201910790,
    SName: 'Hla Madi',
  },
  {
    SNumber: 201910124,
    SName: 'Shahd Amer',
  },
  {
    SNumber: 202010310,
    SName: 'Shahd Amer',
  },
  {
    SNumber: 201810652,
    SName: 'Mohammad Hajar',
  },
  {
    SNumber: 202111322,
    SName: 'Ali Jaber',
  },
  {
    SNumber: 201810194,
    SName: 'Sondos Asad',
  },
  {
    SNumber: 201911150,
    SName: 'Roua Qashoo',
  },
  {
    SNumber: 201810216,
    SName: 'Shimaa Khadir',
  },
];
export default CurrentTrainees;