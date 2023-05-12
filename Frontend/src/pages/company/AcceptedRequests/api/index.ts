import axiosInstance from 'src/api';
import { GetAcceptedTrainingsResponse } from './response.dto';


export const getAcceptedTrainings =
  async (): Promise<GetAcceptedTrainingsResponse> => {
    const url = '/training/acceptedTrainings';
    const response = await axiosInstance.get<GetAcceptedTrainingsResponse>(url);
    return response.data;
  };

  