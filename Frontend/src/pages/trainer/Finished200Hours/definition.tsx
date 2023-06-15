import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { IconButton, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useState } from 'react';
import { FinishedRequiredHoursData } from './api/response.dto';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const handleOpenDialog = (trainingId: string) => {
    setTrainingId(trainingId);
    console.log(trainingId);
    setIsOpen((prev) => !prev);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const columns: ColumnDef<FinishedRequiredHoursData, any>[] = [
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
        } = props;
                return (
          <Tooltip title={'Evaluation Form'}>
            <IconButton
              sx={{ ml: 2.5 }}
              aria-label={'form 1'}
              size="small"
              onClick={() => handleOpenDialog(original.id)}
            >
              <PrintIcon
                sx={{ color: '#820000' }}
                color="info"
                className="print-icon"
              />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const TraineesFinishedRequierHoursDataGrid = createDataGrid({
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
    TraineesFinishedRequierHoursDataGrid,
  };
};

export default uselogic;
