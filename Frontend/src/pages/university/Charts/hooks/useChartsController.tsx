import { useQuery } from '@tanstack/react-query';
import { getCountStatus } from '../api';
//@ts-ignore
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
//@ts-ignore
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';


const useChartsController = () => {
                  
    const { pageSize: initialPageSize } = UsersDataGrid.configs;
    const [pagination] = useState<DataGridFetchQuery>({
      pageIndex: 0,
      pageSize: initialPageSize,
    });
  
    const { pageIndex, pageSize } = pagination;
  
    const { data } = useQuery(
      ['CountStatus', pageIndex, pageSize],
      () => getCountStatus(),
      {}
    );
  
  
  
  
  
    return {
      rows: data?.data,
      // rowsForType: type?.data
    };
  };
export default useChartsController;









