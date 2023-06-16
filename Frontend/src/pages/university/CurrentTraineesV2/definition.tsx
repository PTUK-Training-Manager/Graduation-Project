import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import {ColumnDef} from '@tanstack/react-table';
import {RunningTraineesData} from "./API/types";
import {createDataGrid} from 'src/components/DataGridTanstack';
import {Feed} from '@mui/icons-material';
import ProgressFormCell from "./ProgressFormCell";
import { useTranslation } from 'react-i18next';
const {t}=useTranslation();
const StudentNumber = t('StudentNumber');
const StudentName = t('StudentName');
const CompanyName=t('CompanyName');
const ProgressForm=t('ProgressForm');
const columns: ColumnDef<RunningTraineesData, any>[] = [
    {
        accessorKey: 'studentId',
        header: StudentNumber,
        // size: 50,
        // filterFn: 'includesString',
        // size: 372,
    },
    {
        accessorKey: 'Student.name',
        header: StudentName,
        // size: 372,
        filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'CompanyBranch.Company.name',
        header: CompanyName,
        // size: 372,
    },
    {
        header: ProgressForm,
        // size: 372,
        cell: ProgressFormCell,
        // cell: (row) => (
        //     <IconButton sx={{ml: 3.5}} aria-label="progress form">
        //         <Feed
        //             color="warning"
        //             sx={{
        //                 borderRadius: '5px',
        //                 className: 'manage-icon',
        //             }}
        //         />
        //     </IconButton>
        // )
    },
];

const CurrentTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
});

export default CurrentTraineesDataGrid;