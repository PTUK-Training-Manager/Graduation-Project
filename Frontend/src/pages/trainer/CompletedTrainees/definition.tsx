import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { CompletedTraineesData } from './api/response.dto';
import { IconButton } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    setIsOpen((prev: any) => !prev);
  };

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
      header: 'Evaluation Report',
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;        return (
          <IconButton
          size='small'
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            onClick={() => handleOpenDialog(original.id)}
          >
            <ManageSearchIcon
            
              sx={{ color: '#820000' }}
              className="manage-icon"
              
            />
          </IconButton>
        );
      },
    },
  ];

  const AllTrainingsCompanyDataGrid = createDataGrid({
    name: 'AllTrainingsCompanyDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    trainingId,
    AllTrainingsCompanyDataGrid,
  };
};

export default uselogic;
