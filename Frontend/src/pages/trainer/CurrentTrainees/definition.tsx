import { IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { RunningTraineesData } from './api/types';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import useCurrentTrainees from './hooks/useCurrentTraineesController';
import React from 'react';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  
  const { rows } = useCurrentTrainees();
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
      cell: (props) => {
        const {
          row: { original },
        } = props;
                const rowData = rows;
        console.log(rowData);
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            //@ts-ignore
            onClick={() => handleOpenDialog(original.id)}
          >
            <Feed
              sx={{
                color: '#820000',
                borderRadius: '5px',
                className: 'manage-icon',
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  const CurrentTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'CurrentTraineesDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

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
