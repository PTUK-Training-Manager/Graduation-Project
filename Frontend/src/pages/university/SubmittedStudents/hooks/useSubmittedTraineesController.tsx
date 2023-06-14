import { SyntheticEvent, useEffect, useState } from 'react';
import { Row } from '../types';
import { IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { getSubmittedStudents } from '../api';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useQuery } from '@tanstack/react-query';

export interface UseDataGridPlaygroundAPIProps {
  pagination?: PageChangeParams;
}

const useSubmittedTraineesController = ({pagination}: UseDataGridPlaygroundAPIProps) => {

  const [totalRows, setTotalRows] = useState<number>(0);

  const {data}
      = useQuery(
      ["users", pagination],
      () => getSubmittedStudents({page: pagination?.pageIndex, size: pagination?.pageSize}).then(res => {
          setTotalRows(res?.headers["x-total-count"] ?? 0);
          return res?.data.items ?? [];
      })
      , {
          keepPreviousData: true, //for a smooth transition between the pages in the table.
      }
  );
   return {
    
          rows: data ?? [],
  };
};
  

export default useSubmittedTraineesController;
