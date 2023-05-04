import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAddCompanyFormController from './hooks/useAddCompanyFormController';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, FormikProvider } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { addCompany } from './api';
import { useFormik } from 'formik';
import { validationSchema } from './schema';
import { INITIAL_FORM_STATE } from './constants';
import { AxiosBaseError } from 'src/types';
import MuiPagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import Stack from '@mui/material/Stack';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import { getBranch } from 'src/api/getBranch';
import theme from 'src/styling/customTheme';
import { addBranch } from '../AddBranchForm/api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TablePaginationProps,
  TextField,
} from '@mui/material';
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  GridPagination,
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import { getCompany } from 'src/api/getCompany';
import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import useSnackbar from 'src/hooks/useSnackbar';
import extractErrorMessage from 'src/utils/extractErrorMessage';

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
  map(arg0: (company: any) => { id: any; name: any }): unknown;
  id: string;
  name: string;
  phoneNumber: string;
  managerName: string;
  userId: string;
  User: {
    email: string;
  };
}
interface Branch {
  map(arg0: (company: any) => { id: any; location: any; }): unknown;
  id: string;
  location: string;
}

const AddCompanyForm: React.FC = () => {
  const { formikProps, isLoading,updatedata} = useAddCompanyFormController();
  const [data, setData] = useState<Row[]>([]);
  const [availableBranches, setAvailableBranches] = useState<Branch[]>([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [location, setLocation] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const { showSnackbar } = useSnackbar();
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);


  const { isValid } = formikProps;

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    getCompany()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, [updatedata]);

  
  const handleJoinDialogOpen =  () => {
    getBranch({ companyId:companyId }).then(
      (res) => {
        if (res.success === true) {
          setAvailableBranches(res.data);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          
        }
      }
    );
      
  };
  const handleJoinClick = (id: string) => {
    setCompanyId(id);
    setJoinDialogOpen(true);
    handleJoinDialogOpen();
  };
  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };
  const BranchColumns = [
    { field: 'id', headerName: 'Branch Id', width: 400, flex: 0.3 },
    { field: 'location', headerName: 'Location', width: 400, flex: 0.3 },
  ];
  
 

  const handleAddBranchDialogClose = () => {
    setOpenDialog(false);
    setJoinDialogOpen(false);
    setCompanyId('');
  };

  const handleAddBranchDialogOpen = () => {
    setOpenDialog(true);
  };


  const handleAddBranch = () => {
    addBranch({ id: companyId, location: location }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setLocation('');
          handleAddBranchDialogClose()
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setLocation('');
          handleAddBranchDialogClose()
        }
      }
    );
  };
 

  const columns = [
    { field: 'id', headerName: 'Company Id', width: 400, flex: 0.3 },
    { field: 'companyName', headerName: 'Company Name', width: 400, flex: 0.3 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 400, flex: 0.3 },
    { field: 'email', headerName: 'Email', width: 400, flex: 0.3 },
    { field: 'managerName', headerName: 'Manager', width: 400, flex: 0.3 },

    {
      field: 'addBranch',
      headerName: 'Branches',
      width: 400,
      flex: 0.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any,}) => (
        <IconButton sx={{ ml: 1.5 }} aria-label="progress form"
        onClick={() => handleJoinClick(params.id)}

        >
          <AddBusinessIcon
            sx={{ color: '#820000' }}
          />
        </IconButton>
      ),
    },
  ];
 

  
  const rows = data.map((row) => ({
    id: row.id,
    companyName: row.name,
    managerName: row.managerName,
    phoneNumber: row.phoneNumber,
    email: row.User.email,
    User: row.User,
  }));
  

  return (
    <><>
      <>
        <Grid
          container
          sx={{
            p: 3,
            justifyContent: 'center',
            alignItems: 'center',
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
          }}
        >
          <Stack
            gap={1.5}
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Stack sx={{ px: 2 }} direction="row" justifyContent="space-between">
              <Typography component="h1" variant="h5" fontWeight={500}>
                Companies
              </Typography>
              <Button
                variant="contained"
                sx={{ width: 'auto' }}
                color={open ? 'error' : 'success'}
                onClick={handleChange}
                startIcon={open ? <RemoveIcon /> : <AddIcon />}
              >
                {open ? 'Close' : 'Add Company'}
              </Button>
            </Stack>

            <Grid
              container
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack
                gap={0.5}
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Collapse in={open}>
                  <Paper
                    elevation={3}
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3.5,
                      minWidth: { xs: '90%', sm: '60%', md: '30%' },
                    }}
                  >
                    <FormikProvider value={formikProps}>
                      <Form>
                        <Stack gap={1} spacing={1} alignItems="center">
                          <Typography component="h1" variant="h5">
                            Add Company
                          </Typography>
                          <Stack gap={1} direction="row">
                            <TextFieldWrapper
                              label="Company Id"
                              name="id"
                              autoFocus />
                            <TextFieldWrapper label="Company Name" name="name" />
                            <TextFieldWrapper
                              label="Phone Number"
                              name="phoneNumber" />
                            <TextFieldWrapper
                              label="E-mail"
                              type="email"
                              name="email" />
                            <TextFieldWrapper label="Location" name="location" />
                            <TextFieldWrapper
                              label="Manager Name"
                              name="managerName" />
                          </Stack>
                          <LoadingButton
                            type="submit"
                            // fullWidth
                            variant="contained"
                            disabled={!isValid}
                            loading={isLoading}
                          >
                            Generate Account
                          </LoadingButton>
                        </Stack>
                      </Form>
                    </FormikProvider>
                  </Paper>
                </Collapse>
              </Stack>
            </Grid>

            <DataGrid
              className="dataGrid"
              sx={{
                boxShadow: 5,
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
              }} />
          </Stack>
        </Grid>
      </>
      <Dialog
        open={openDialog}
        onClose={handleAddBranchDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog">Add Branch</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            autoFocus
            label="Location"
            fullWidth
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBranchDialogClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddBranch}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
    <Stack spacing={2} >
    <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
        <DialogContent>
          <div style={{ height: 400, width: '100%' }}>
            <Typography>
              Branches
            </Typography>
            <DataGrid
              sx={{
                width: '500px', // set the width to 800px
              }}
              columns={BranchColumns}
              rows={availableBranches}
              getRowId={(row) => row['id']}
              initialState={{
                pagination: { paginationModel: { pageSize: 30 } },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
              slots={{
                toolbar: GridToolbar,
                pagination: CustomPagination,
              }} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleJoinDialogClose}
          >
            Cancel
          </Button>
          <Button  variant='contained' onClick={handleAddBranchDialogOpen}>
       Add Branch
      </Button>
        </DialogActions>
      </Dialog>
    
      </Stack>
      </>

  );
};
export default AddCompanyForm;
