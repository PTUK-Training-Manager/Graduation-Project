import axiosInstance from 'src/api';
import {
GetPendingRequestsParams,
GetPendingRequestsResponse,
} from './types';
import { DeleteRequestResponse } from '../types';

export const getPendingRequests = async (
  params: GetPendingRequestsParams
) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetPendingRequestsResponse>('/request/pendingRequests', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};


export const deleteRquest = (id: string) => {
  const url = `/request/request/${id}`;
  return axiosInstance.delete<DeleteRequestResponse>(url).then(res => res.data);
};