import React, { useEffect, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Feed } from '@mui/icons-material';
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
import { Accordion, Dialog, IconButton, Slide, Tab, Tabs } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
        <IconButton sx={{ ml: 3.5 }} aria-label="progress form" onClick={() => handleClickOpen()}>
          {/* <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" /> */}
          <Feed
                  sx={{
                    backgroundColor: '#255983',
                    borderRadius: '5px',
                    color: '#ecf1f1',
                    className:"manage-icon"
                  }}
                />
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

<Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>WEEK 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Tabs
  value={value}
  onChange={handleChange}
  textColor="secondary"
  indicatorColor="secondary"
  aria-label="secondary tabs example"
>
  <Tab value="one" label="Item One" 
  
  
  
  />
  <Tab value="two" label="Note" />
  
</Tabs>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
      </Dialog>

    </>
  );
};

export default CurrentTrainees;
