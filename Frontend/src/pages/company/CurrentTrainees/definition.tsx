import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { RunningTraineesData } from './api/response.dto';
import { useTranslation } from 'react-i18next';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
 
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
  const { t } = useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
  const ProgressForm=t('ProgressForm');
  const CompanyBranch=t('CompanyBranch');
  const columns: ColumnDef<RunningTraineesData, any>[] = [
    {
      accessorKey: 'studentId',
      header: StudentNumber,
    },
    {
      accessorKey: 'Student.name',
      header: StudentName,
      filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'CompanyBranch.location',
        header: CompanyBranch,
        filterFn: 'arrIncludesSome',
      },
  
    {
      header:ProgressForm  ,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            //@ts-ignore
            onClick={() => handleOpenDialog(original.id)}
          >
            <Feed
              color="warning"
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
