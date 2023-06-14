import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { RunningTraineesData } from './api/response.dto';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import ProgressFormCell from '../CurrentTraineesV2/ProgressFormCell';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';

interface ProgressFormCellProps extends CellContext<RunningTraineesData, any> {}
const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { rows } = useCurrentTraineesController({
    pagination,
  });
  console.log(rows);
  useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
      //@ts-ignore
      setReponse(res.data);
    });
  }, [trainingId]);

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(trainingId);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId('');
  };

  const columns: ColumnDef<RunningTraineesData, any>[] = [
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
      header: 'Progress Form',
      //@ts-ignore
      cell: (params: { row: RunningTraineesData }) => {
        const rowData = rows;
        console.log(rowData);
        const ids=rowData.map((data) => data.id);
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            //@ts-ignore
            onClick={() => handleOpenDialog(24)}
          >
            <Feed
              color="warning"
              sx={{
                borderRadius: '5px',
                className: 'manage-icon',
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  const CurrentTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    response,
    trainingId,
    CurrentTraineesDataGrid,
  };
};
export default uselogic;
