import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { AllTrainingsData } from './api/types';
import StatusCell from './StatusCell';


const columns: ColumnDef<AllTrainingsData, any>[] = [
  {
    accessorKey: 'studentId',
    header: 'Student Number',
  },
  {
    accessorKey: 'Student.name',
    header: 'Student Name',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'CompanyBranch.Company.name',
    header: 'Company Name',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'CompanyBranch.location',
    header: 'Company Branch',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'arrIncludesSome',
    cell: StatusCell,
  },

  {
    accessorKey: 'startDate',
    header: 'Start Date',
    filterFn: 'dateBetween',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    filterFn: 'dateBetween',
  },
];
const AllTrainingsDataGrid = createDataGrid({
  name: 'AllTrainingsDataGrid',
  columns,
  shouldFlexGrowCells: true,
});

export default AllTrainingsDataGrid;
