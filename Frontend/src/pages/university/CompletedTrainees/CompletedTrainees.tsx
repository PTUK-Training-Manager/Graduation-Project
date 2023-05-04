import React, {SyntheticEvent, useEffect, useMemo, useState} from 'react';
import MuiPagination from '@mui/material/Pagination';
import {TablePaginationProps} from '@mui/material/TablePagination';
import {
    DataGrid,
    GridPagination,
    GridToolbar,
    gridClasses,
    gridPageCountSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import EvaluStepper from './components/EvaluStepper';
import './CompletedTrainees.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';
import {Dialog, DialogContent, DialogTitle, IconButton, Tooltip} from '@mui/material';
import {getCompletedTrainees} from './api';
import theme from "src/styling/customTheme";
import { evaluation } from 'src/api/getEvaluation';
import Typography from "@mui/material/Typography";
import Transition from 'src/components/Transition';

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
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('one');
    const [response, setReponse] = useState<Response>();
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };
    
      const [index, setIndex] = useState('');
      const [studentId, setStudentId] = useState('');

      const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
      };

      const handleOpenDialog = (id: string, count: string) => {
        setIndex('0')
        setStudentId('8');
        console.log(isOpen);
        setIsOpen((prev) => !prev);
      };
    
      useEffect(() => {
        evaluation({index:'0',studentId: '8'})
            .then((result) => {
                // setData(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

      const handleCloseDialog = () => {
        setIsOpen(false);
      };

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
            flex: .3,
        },
        {
            field: 'studentName',
            headerName: 'Student Name',
            width: 400,
            flex: .3,
        },
        {
            field: 'evalForm',
            headerName: 'Evaluation Form',
            width: 400,
            flex: .3,
            headerClassName: 'ctrainees',
            filterable: false,
            sortable: false,
            renderCell: (params: { row: Row }) => {
                const count = parseInt(params.row.count);
                const Evnum=params.row.count;
                const id = params.row.studentId;
                const printIcons = [];

                for (let i = 0; i < count; i++) {
                    if (count == 1)
                        printIcons.push(
                            <Tooltip title={"Progress Form 1"}>
                                <IconButton sx={{ml: 3.5}} aria-label={"form 1"} size="small"       
                                    onClick={() => handleOpenDialog(id,Evnum)}
>
                                   
                                    <PrintIcon sx={{color: "#820000"}} color="info" className='print-icon'/>
                                </IconButton>
                            </Tooltip>
                        );
                    else
                        printIcons.push(
                            <Tooltip key={i} title={`Progress Form ${i + 1}`}>
                                <IconButton aria-label={`form ${i + 1}`} size="small">
                                    <PrintIcon sx={{color: "#820000"}} className='print-icon'/>
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
        <><Grid container sx={{
            p: 3,
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}>
            <Stack gap={1.5} sx={{
                width: '100%',
                height: '100%',
            }}>
                <Typography component="h1" variant="h5" fontWeight={500}>
                    Completed Trainees
                </Typography>
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
                    }} />
            </Stack>
        </Grid><Dialog
            open={isOpen}
            onClose={handleCloseDialog}
            fullScreen
            TransitionComponent={Transition}
            sx={{ left: '30%' }}
        >
                <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
                <DialogContent>
                    <EvaluStepper />


                </DialogContent>
            </Dialog></>
    );
};

export default CompletedTrainees;