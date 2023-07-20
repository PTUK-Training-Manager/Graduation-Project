import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { TrainingRequestsData } from './api/types';
import { Button, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { HandleTrainingRequestBody } from './types';
import { handleTrainingRequest } from './api/index';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';
import useTrainingRequestsController from './hooks/useTrainingRequestsController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import React from 'react';

const uselogic = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const [acceptRequestDialogOpen, setAcceptRequestDialogOpen] = useState(false);
  const [rejectRequestDialogOpen, setRejectRequestDialogOpen] = useState(false);

  const [trainingId, setTrainingId] = useState('');
  //   setData(rows);
  //@ts-ignore
  const handleAccept = (id: string) => {
    console.log(id);
    const body: HandleTrainingRequestBody = {
      trainingId: id,
      status: 'accepted',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          setAcceptRequestDialogOpen(false);
          showSnackbar({ severity: 'success', message: result.message });
          const res = queryClient.getQueryData([
            'trainingRequests',
          ]) as TrainingRequestsData[];
          queryClient.setQueryData(
            ['trainingRequests'],
            res.filter((row) => row.id !== id)
          );
          console.log(res);
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };
  const handleClickAcceptButton = (id: string) => {
    setTrainingId(id);
    setAcceptRequestDialogOpen(true);
  };
  const handleAcceptOptionClick = () => {
    handleAccept(trainingId);
  };
  const handleCancelAcceptRequest = () => {
    setAcceptRequestDialogOpen(false);
  };
  const handleClickRejectButton = (id: string) => {
    setTrainingId(id);
    setRejectRequestDialogOpen(true);
  };
  const handleRejectOptionClick = () => {
    handleReject(trainingId);
  };
  const handleCancelRejectRequest = () => {
    setRejectRequestDialogOpen(false);
  };
  const handleReject = (id: string) => {
    console.log(id);
    const body: HandleTrainingRequestBody = {
      trainingId: id,
      status: 'rejected',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          setRejectRequestDialogOpen(false);
          showSnackbar({ severity: 'success', message: result.message });
          const res = queryClient.getQueryData([
            'trainingRequests',
          ]) as TrainingRequestsData[];
          queryClient.setQueryData(
            ['trainingRequests'],
            res.filter((row) => row.id !== id)
          );
          console.log('correct');
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
  const CompanyBranch = t('CompanyBranch');
  const Accept = t('Accept');

  const Reject = t('Reject');

  const columns: ColumnDef<TrainingRequestsData, any>[] = [
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
      header: Accept,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <Button
            size="small"
            sx={{ color: 'white', backgroundColor: 'green' }}
            aria-label="progress form"
            onClick={() => handleClickAcceptButton(original.id)}
          >
            <CheckCircleOutlineIcon
              sx={{ color: 'white', mr: 1 }}
              className="manage-icon"
            />
            {t('Accept')}
          </Button>
        );
      },
    },
    {
      header: Reject,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <Button
            size="small"
            sx={{ color: 'white', backgroundColor: 'red' }}
            aria-label="progress form"
            onClick={() => handleClickRejectButton(original.id)}
          >
            <CancelIcon
              sx={{ color: 'white', mr: 1 }}
              className="manage-icon"
            />
            {t('Reject')}
          </Button>
        );
      },
    },
  ];
  const TrainingRequestsDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'TrainingRequestsDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    acceptRequestDialogOpen,
    handleCancelAcceptRequest,
    TrainingRequestsDataGrid,
    handleAcceptOptionClick,
    rejectRequestDialogOpen,
    handleRejectOptionClick,
    handleCancelRejectRequest,
  };
};

export default uselogic;
