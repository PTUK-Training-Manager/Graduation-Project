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
    Company: {
      name: string;
    };
  };
}

const CurrentTrainees: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    getCurrentTrainees()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 300, flex: 0.3 },
    { field: 'studentName', headerName: 'Student Name', width: 300, flex: 0.3 },
    { field: 'companyName', headerName: 'Company Name', width: 300, flex: 0.3 },
    {
      field: 'progForm',
      headerName: 'Progress Form',
      width: 300,
      flex:.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton sx={{ ml: 3.5 }} aria-label="progress form">
          <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyName: row.CompanyBranch.Company.name,
  }));

  return (
    <>
      <DataGrid
        className="dataGrid"
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

export default CurrentTrainees;
