import axiosInstance from 'src/api';
import {RunningTraineesData, GetRunningTrainingsParams, CurrentTraineesResponse} from './types';

export const getCurrentTrainees = async (params: GetRunningTrainingsParams) => {
    return axiosInstance.get<CurrentTraineesResponse>(
        `/training/runningTrainings/`, {
            // params: {
            //
            // }
        }
    ).then((response) => response.data.data);
};