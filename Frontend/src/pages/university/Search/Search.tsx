//                       <TableCell sx={{ backgroundColor: 'white'}} 
//                      
                                
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
import './search.css'
import { getAllTrainings } from './api';
import { TableCell } from '@mui/material';



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
  startDate: string;
  endDate: string;
  semester: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
    Company: {
      name: string;
    };
  };
}

const Search: React.FC = () => {

  const [data,setData] = useState<Row[]>([]);


  useEffect(() => {
    getAllTrainings()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 220},
    { field: 'studentName', headerName: 'Student Name', width: 220,flex:.5},
    { field: 'companyName', headerName: 'Company Name', width: 220,flex:.5},
    { field: 'companyBranch', headerName: 'Company Branch', width: 220,flex:.5},
    { field: 'type', headerName: 'Type', width: 220,flex:.5},
    { field: 'semester', headerName: 'Semester', width: 220,flex:.5},
    { field: 'status', headerName: 'Status', width: 220,flex:.5,
    renderCell: (params: { row: Row }) => {
      const status = params.row.status;
      let color = 'white';
      if (status === 'running') {
        color = 'orange';
      } else if (status === "accepted") {
        color = 'blue';
      } else if (status === "completed") {
        color = 'green';
      }else if (status === "pending") {
        color = 'gray';
      }
      else if (status === "rejected") {
        color = 'red';
      }
      return (
        <TableCell sx={{ color: color }}>
          {params.row.status}
        </TableCell>
                                   
      )
    },
  },
    { field: 'startDate', headerName: 'Start Date', width: 220,flex:.5},
    { field: 'endDate', headerName: 'End Date', width: 220,flex:.5},
  ];

 const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyName: row.CompanyBranch.Company.name,
    companyBranch: row.CompanyBranch.location,
    type: row.type,
    semester: row.semester,
    status: row.status,
    startDate: row.startDate,
    endDate: row.endDate,
    Student: row.Student,    
    CompanyBranch: row.CompanyBranch,
    Company: row.CompanyBranch.Company,
    companyBranchId: row.companyBranchId
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
        getRowId={(row) => row['id']}
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
};

 
export default Search;