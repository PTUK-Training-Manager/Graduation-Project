export interface Row {
  id: string;
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
    Company: {
      name: string;
    };
  };
}

export interface Progress {
  endTime: string;
  id: string;
  noteId: string;
  skills: string;
  startTime: string;
  status: string;
  trainingId: string;
}

export interface Response {
  achievedHours: string;
  totalHours: string;
  progressForm: Progress[];
}

// import {
//   DataGridCellProps,
// } from 'src/components/DataGridTanstack/types';
// import { RunningTraineesData } from 'src/pages/university/CurrentTraineesV2/API/types';

// export interface ProgressFormCellProps
//   extends DataGridCellProps<RunningTraineesData, any> {}

// export interface CurrentTraineesProps {}
