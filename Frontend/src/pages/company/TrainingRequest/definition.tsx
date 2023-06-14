import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { TrainingRequestsData } from './api/response.dto';
import { Button, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { HandleTrainingRequestBody } from './types';
import { handleTrainingRequest } from './api';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';
import useTrainingRequestsController from './hooks/useTrainingRequestsController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import {useQuery, useQueryClient} from "@tanstack/react-query";


const uselogic = () => {
    const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useTrainingRequestsController({
    pagination,
  });
  const [data, setData] = useState<TrainingRequestsData[]>([]);
//   setData(rows);
  //@ts-ignore
  const handleAccept = (id: string) => {
    setData(rows);
    console.log(id);
    const body: HandleTrainingRequestBody = {
      trainingId: id,
      status: 'accepted',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== id));
         const res= queryClient.getQueryData( ["trainingRequests"]) as TrainingRequestsData[] ;
          queryClient.setQueryData(["trainingRequests"],res.filter((row) => row.id !== id));
          console.log(res);
        } else if (result.success === false) {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleReject = (id: string) => {
    setData(rows);
    console.log(id);
    const body: HandleTrainingRequestBody = {
      trainingId: id,
      status: 'rejected',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== id));
          console.log("correct");
        } else if (result.success === false) {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  };

  const columns: ColumnDef<TrainingRequestsData, any>[] = [
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
      accessorKey: 'CompanyBranch.location',
      header: 'Company Branch',
      filterFn: 'arrIncludesSome',
    },
    {
      header: 'Accept',
      //@ts-ignore
      cell: (props) => {
        const {
            row: { original },
          } = props;
        return (
          <Button
            size="small"
            sx={{ color: "white", backgroundColor: "green" }}
            aria-label='progress form'
            onClick={() => handleAccept(original.id)}
          >
            <CheckCircleOutlineIcon sx={{ color: "white", mr: 1 }} className='manage-icon' />
            Accept
          </Button>
        );
      },
    },
    {
      header: 'Reject',
      //@ts-ignore
      cell: (params: { row: TrainingRequestsData }) => {
        return (
          <Button
            size="small"
            sx={{ color: "white", backgroundColor: "red" }}
            aria-label='progress form'
            onClick={() => handleReject(params.row.id)}
          >
            <CancelIcon sx={{ color: "white", mr: 1 }} className='manage-icon' />
            Reject
          </Button>
        );
      },
    },
  ];

  const TrainingRequestsDataGrid = createDataGrid({
    name: 'TrainingRequestsDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    TrainingRequestsDataGrid,
  };
};

export default uselogic;
