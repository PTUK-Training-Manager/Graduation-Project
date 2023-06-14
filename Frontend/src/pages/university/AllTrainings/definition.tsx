import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { AllTrainingsData } from './api/response.dto';
import { Chip, TableCell } from '@mui/material';
import { FC } from 'react';

// interface ProgressFormCellProps extends CellContext<AllTrainingsData, any> {}

// //@ts-ignore
// const AllTrainingss: FC<ProgressFormCellProps> = (props) => {
//   const {
//     row: { original },
//   } = props;

  const mapStatusToColor: Record<string, string> = {
    completed: 'success',
    rejected: 'error',
    accepted: 'primary',
    running: 'warning',
    canceled: 'error',
    submitted: 'info',
    pending: 'action',
  };

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
    },
    // {
    //   accessorKey: 'status',
    //   header: 'Status',
    //   filterFn: 'arrIncludesSome',
    //   //@ts-ignore
    //   cell: () => {
    //     return (
    //       <Chip
    //         label={props.row.original.status}
    //         color={mapStatusToColor[props.row.original.status] as any}
    //         size="medium"
    //         variant="filled"
    //         sx={{ fontSize: '1rem', width: '8rem' }}
    //       />
    //     );
    //   },
    // },

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
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });
//   return {
//     AllTrainingsDataGrid,
//   };
// };

export default AllTrainingsDataGrid;
