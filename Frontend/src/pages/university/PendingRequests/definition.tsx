import {ColumnDef} from '@tanstack/react-table';
import {createDataGrid} from 'src/components/DataGridTanstack';
import { PendingRequestsData } from './api/response.dto';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';
import { deleteRquest } from './api';
import { useTranslation } from 'react-i18next';

const uselogic = () => {
    const [deleteId, setDeleteId] = useState<string>('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const { showSnackbar } = useSnackbar();
    const [data, setData] = useState<PendingRequestsData[]>([]);

const handleDeleteRequest = () => {
    deleteRquest(deleteId)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== deleteId));
          setDeleteId('');
          setConfirmDialogOpen(false);
        } else if (result.success === false) {
          showSnackbar({ severity: 'warning', message: result.message });
          setDeleteId('');
          setConfirmDialogOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };
  const {t}=useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
const CompanyName=t('CompanyName');
const CompanyBranch=t('CompanyBranch');
const DeleteRequest=t('DeleteRequest');
const columns: ColumnDef<PendingRequestsData, any>[] = [
    {
        accessorKey: 'studentId',
        header: StudentNumber,
    },
    {
        accessorKey: 'Student.name',
        header:StudentName,
        filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'CompanyBranch.Company.name',
        header: CompanyName,
        filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'CompanyBranch.location',
        header:CompanyBranch ,
        filterFn: 'arrIncludesSome',
    },
    {
        header: DeleteRequest,
        //@ts-ignore
        cell: (params: { row: PendingRequestsData }) => {
          return (
            <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete request"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <ClearIcon />
          </IconButton>
          );
        },
      },
    
];

const PendingRequestsDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
});

return {
   handleDeleteCancel,
   handleDeleteClick,
   handleDeleteRequest,
    PendingRequestsDataGrid,
    confirmDialogOpen,
  };
};
export default uselogic;
