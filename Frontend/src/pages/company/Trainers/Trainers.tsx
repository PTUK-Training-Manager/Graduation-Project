import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './Trainers.css';
import ClearIcon from '@mui/icons-material/Clear';
import { getTrainers } from './api';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTrianer } from 'src/DeleteTrainer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TableCell, TextField } from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import { updateTrianer } from 'src/EditTrainer';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarDensitySelector />
      <IconButton >
        <PersonAddIcon />
      </IconButton>
    </GridToolbarContainer>
  );
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
interface Row {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

const Trainers: React.FC = () => {
  const [data,setData] = useState<Row[]>([]);
  const {showSnackbar} = useSnackbar();
  const [deleteId, setDeleteId] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const [updateField, setUpdateField] = useState<string>("");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    getTrainers()
    .then((result) => {
      setData(result.data);
      console.log(result.data)
    })
    .catch((error) => console.log(error));
  }, []);  
  

  const handleDeleteRequest = () => {
      deleteTrianer({ id: deleteId }).then((res : { success: boolean; message: any; }) => {
        if (res.success === true) {
          showSnackbar({ severity: "success", message: res.message });
          setData((prevData) => prevData.filter((row) => row.id !== deleteId));
          setDeleteId("");
          setConfirmDialogOpen(false);
        } else if (res.success === false) {
          showSnackbar({ severity: "warning", message: res.message });
          setDeleteId("");
          setConfirmDialogOpen(false);
        }
      })
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (id: string) => {
    setUpdateId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateTrianer({ id: updateId , field:updateField }).then((res : { success: boolean; message: any; }) => {
      if (res.success === true) {
        showSnackbar({ severity: "success", message: res.message });
        setData(prevData => prevData.map(row => {
          if (row.id === updateId) {
            return { ...row, field: updateField };
          }
          return row;
        }));
        setUpdateId("");
        setUpdateField("");
        setOpen(false);
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
        setUpdateId("");
        setUpdateField("");
        setOpen(false);
      }
    })
        console.log(`New value: ${updateField}`);
    handleClose();
  };

  const handleValueChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUpdateField(event.target.value);
  };

  const columns=[
    { field: 'id', headerName: 'Trainer Id', width: 220},
    { field: 'name', headerName: 'Trianer Name', width: 220},
    { field: 'field', headerName: 'field', width: 220},
    {
    field: 'editField',
      headerName: 'Edit Field',
      minwidth: 150,
      flex: 0.3,
      width :220,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
       <>
       <IconButton
          onClick={() => handleOpen(params.id)}
          aria-label='edit field'
        >
          <EditIcon sx={{ color: "#820000" }} className='edit-icon' />
        </IconButton><Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Field</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="New Value"
                type="text"
                fullWidth
                value={updateField}
                onChange={handleValueChange} 
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog></>
      ),
  },

    {  field: 'delete',
    headerName: 'Delete Trainer',
    sortable: false,
    width:220,
    filterable: false,
    alignContent: 'centre',
    renderCell: (params: {
      [x: string]: any; id: any; 
}) => (
  <>
  <IconButton sx={{ml:3.5}} color="error" aria-label="delete trianer"  onClick={() => handleDeleteClick(params.row.id)}
>
    <ClearIcon className='clear'/>
  </IconButton>
  <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
    <DialogTitle>Delete Trainer</DialogTitle>
    <DialogContent>Are you sure you want to delete this trainer?</DialogContent>
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
    },
  
  ]
  
  const rows = data.map((row) => ({
    id: row.id,
    name: row.name,
    field: row.field,
    status: row.status,
    companyId: row.companyId,
    userId: row.userId
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
          getRowId={row => row['id']}
          initialState={{
            pagination: { paginationModel: { pageSize: 30 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          slots={{
            toolbar: GridToolbar,
            pagination: CustomPagination,
          }} />

      </>
  );
}

export default Trainers;