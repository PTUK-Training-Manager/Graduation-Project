import { Chip, IconButton, Tooltip } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';
import PrintIcon from '@mui/icons-material/Print';
import { CompletedTraineesData } from './api/response.dto';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface ProgressFormCellProps
  extends CellContext<CompletedTraineesData, any> {}
const uselogic = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
 

  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const columns: ColumnDef<CompletedTraineesData, any>[] = [
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
        accessorKey: 'Trainer.name',
        header: 'Trainer Name',
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'CompanyBranch.location',
        header: 'Company Branch',
        filterFn: 'arrIncludesSome',
      },

    {
      header: 'Evaluation Report',
      //@ts-ignore
        cell: (props) => {
          const {
            row: { original },
          } = props;
return(
  <IconButton
  sx={{ ml: 3.5 }}
  aria-label="progress form"
  onClick={() => handleOpenDialog(original.id)}
>
  <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" />
</IconButton>
);
      },
    },
  ];
  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    setIsOpen((prev) => !prev);
  };
  const CompletedTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    trainingId,
    CompletedTraineesDataGrid,
  };
};
export default uselogic;
