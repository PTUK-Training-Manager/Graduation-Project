/* eslint-disable @typescript-eslint/no-empty-interface */
import {DataGridCellProps} from "src/components/DataGridTanstack/types";
import {RunningTraineesData} from "src/pages/university/CurrentTraineesV2/API/types";

export interface ProgressFormCellProps extends DataGridCellProps<RunningTraineesData, any> {}

export interface CurrentTraineesProps {}