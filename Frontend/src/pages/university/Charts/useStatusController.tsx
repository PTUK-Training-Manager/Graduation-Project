
import { useEffect, useState } from 'react';
import { GetStatusData, getCountStatus,GetTypeData,getTypeStatus } from './api';

const SubmitRequestQueryKey = ['submitRequest'];

const useStatusController = () => {
    const [response, setResponse] = useState<GetStatusData[]>([]);
    const [typeData,setTypeData] = useState<GetTypeData[]>([]);
    useEffect(() => {
      getCountStatus().then((res) => {
        setResponse(res.data);
      });
    }, []);
    useEffect(() => {
      getTypeStatus().then((res) => {
        setTypeData(res.data);
      });
    }, []);

  return {response , typeData };
};

export default useStatusController;
