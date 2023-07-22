
import { useEffect, useState } from 'react';
import { GetStatusBody, getCountStatus } from './api';

const SubmitRequestQueryKey = ['submitRequest'];

const useStatusController = () => {
    const [response, setResponse] = useState<GetStatusBody[]>([]);
    useEffect(() => {
      getCountStatus().then((res) => {
        setResponse(res.data);
      });
    }, []);

  return {response };
};

export default useStatusController;
