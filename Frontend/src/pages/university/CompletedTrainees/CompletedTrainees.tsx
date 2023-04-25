import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './CompletedTrainees.css';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Tooltip } from '@mui/material';
import { getCompletedTrainees } from './api';

interface Row {
  studentId: string;
  Student: {
    name: string;
  };
  count: string;
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
    {
      field: 'evalForm',
      headerName: 'Evaluation Form',
      width: 400,
      flex:.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { row: Row }) => {
        const count = parseInt(params.row.count);
        const printIcons = [];

        for (let i = 0; i < count; i++) {
          if(count==1)
          printIcons.push(
            <Tooltip title={"Progress Form 1"}>
              <IconButton sx={{ml:3.5}} aria-label={"form 1"}>
                <PrintIcon sx={{color:"#820000"}} className='print-icon' />
              </IconButton>
            </Tooltip>
          );
          else
          printIcons.push(
            <Tooltip key={i} title={`Progress Form ${i + 1}`}>
              <IconButton aria-label={`form ${i + 1}`}>
                <PrintIcon sx={{color:"#820000"}} className='print-icon' />
              </IconButton>
            </Tooltip>
          );
        }

        return (
          <>
            {printIcons}
          </>
        );
      }
    }
  ];

  const rows = data.map((row) => ({
      studentId: row.studentId,
      studentName: row.Student.name,
      count: row.count,
      Student: row.Student,    
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
            color: 'primary.main'
          }
        }}
        columns={columns}
        rows={rows}
        getRowId={(row) => row['studentId']}
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

export default CompletedTrainees;
