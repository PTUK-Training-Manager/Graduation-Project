import { useQuery } from '@tanstack/react-query';
import { getCountStatus,getTypeStatus } from '../api';
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';


const useChartsController = () => {
                  
    const { pageSize: initialPageSize } = UsersDataGrid.configs;
    const [pagination, setPagination] = useState<DataGridFetchQuery>({
      pageIndex: 0,
      pageSize: initialPageSize,
    });
  
    const { pageIndex, pageSize } = pagination;
  
    const { data, isLoading, isFetching } = useQuery(
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









