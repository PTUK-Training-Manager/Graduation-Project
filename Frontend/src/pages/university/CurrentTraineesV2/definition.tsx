import {ColumnDef} from '@tanstack/react-table';
import {RunningTraineesData} from "./API/types";
import {createDataGrid} from 'src/components/DataGridTanstack';
import ProgressFormCell from "./ProgressFormCell";

const columns: ColumnDef<RunningTraineesData, any>[] = [
    {
        accessorKey: 'studentId',
        header: "StudentNumber",
        // size: 50,
        // filterFn: 'includesString',
        // size: 372,
    },
    {
        accessorKey: 'Student.name',
        header: "StudentName",
        // size: 372,
        filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'CompanyBranch.Company.name',
        header: "CompanyName",
        // size: 372,
    },
    {
        header: "ProgressForm",
        // size: 372,
        cell: ProgressFormCell,
    },
];

const CurrentTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
});

export default CurrentTraineesDataGrid;