import React, { useEffect, useMemo, useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './PendingRequests.css';
import { getPendingRequests } from './api';
import { deleteRquest } from 'src/DeleteRequest';
import useSnackbar from "src/hooks/useSnackbar";


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

const PendingRequest: React.FC = () => {
    
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
  
  const [data,setData] = useState<Row[]>([]);
  const {showSnackbar} = useSnackbar();
  const [deleteId, setDeleteId] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    getPendingRequests()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  

  const handleDeleteRequest = () => {
    deleteRquest(deleteId)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: "success", message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== deleteId));
          setDeleteId("");
          setConfirmDialogOpen(false);
        } else if (result.success === false) {
          showSnackbar({ severity: "warning", message: result.message });
          setDeleteId("");
          setConfirmDialogOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };

  const columns=[
    { field: 'studentId', headerName: 'Student Number', width: 220},
    { field: 'studentName', headerName: 'Student Name', width: 220,flex:.5},
    { field: 'companyName', headerName: 'Company Name', width: 220,flex:.5},
    { field: 'location', headerName: 'Location'},
    {  field: 'delete',
    headerName: 'Delete Request',
    sortable: false,
    filterable: false,
    alignContent: 'centre',
    renderCell: (params: {
      [x: string]: any; id: any; 
}) => (
  <>
  <IconButton sx={{ml:3.5}} color="error" aria-label="delete request"   onClick={() => handleDeleteClick(params.row.id)}
>
    <ClearIcon />
  </IconButton>
  <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
    <DialogTitle>Delete Request</DialogTitle>
    <DialogContent>Are you sure you want to delete this request?</DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDeleteRequest} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
</>
    ),  
    minwidth: 150,
    flex:.3,    
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyName: row.CompanyBranch.Company.name,
    location: row.CompanyBranch.location,
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
    pageSizeOptions={[5, 10,15, 20, 25 ,30]}
    slots={{
      toolbar: GridToolbar,
      pagination: CustomPagination,

    }}
   />

    </>
  );
}

export default PendingRequest;

