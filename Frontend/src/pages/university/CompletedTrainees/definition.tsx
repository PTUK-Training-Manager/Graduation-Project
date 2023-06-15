import { Chip, IconButton, Tooltip } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import ProgressFormCell from '../CurrentTraineesV2/ProgressFormCell';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';
import PrintIcon from '@mui/icons-material/Print';
import { CompletedTraineesData } from './api/response.dto';
import { useTranslation } from 'react-i18next';

interface ProgressFormCellProps
  extends CellContext<CompletedTraineesData, any> {}
const uselogic = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { rows } = useCompletedTraineesController({
    pagination,
  });
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);
  const handleOpenDialog = (index: number, id: string) => {
    setIsOpen((prev) => !prev);
    setIndex(index);
    setStudentId(id);
  };
  const { t } = useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
  const EvaluationReport=t('EvaluationReport');
  const ProgressForm=t('ProgressForm');
  const columns: ColumnDef<CompletedTraineesData, any>[] = [
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
      header: 'Evaluation Report',
      //@ts-ignore
      cell: (params: { row: CompletedTraineesData }) => {
        const count = parseInt(params.row.count);
        const index = parseInt(params.row.count) - 1;
        const studentId = params.row.studentId;
        const printIcons = [];
return(
              <Tooltip title={'Evaluation 1'}>
                <IconButton
                  sx={{ ml: 4 }}
                  aria-label={'form 1'}
                  size="small"
                  onClick={() => handleOpenDialog(index, studentId)}
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

  const CompletedTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    isOpen,
    index,
    handleCloseDialog,
    CompletedTraineesDataGrid,
    studentId,
  };
};
export default uselogic;
