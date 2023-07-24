import { BaseResponse } from "src/types";

export interface EvaluationFormResponse extends BaseResponse {
  data: EvaluationData[];
}

export interface EvaluationData {
  companyBranchId: string;
  endDate: string;
  id: string;
  semester: string;
  startDate: string;
  status: string;
  studentId: string;
  trainerId: string;
  type: string;

  Trainer: {
    name: string;
  };

  Student: {
    id: string;
    name: string;
    phoneNumber: string;
    userId: string;
    department: string;
  };

  CompanyBranch: {
    Company: {
      User: {
        email: string;
      };
      name: string;
      phoneNumber: string;
      managerName: string;
    };
    location: string;
  };

  Evaluations: {
    endTime: string;
    id: string;
    noteId: string;
    skills: JSON;
    startTime: string;
    status: string;
    trainingId: string;
  }[];

  Answered_Questions: {
    map(
      arg0: (
        item: { startTime: string; endTime: string; skills: JSON },
        index: number
      ) => JSX.Element
    ): import("react").ReactNode;
    Answer?: {
      answer: string;
    };
    Note?: {
      note: JSON;
    };
    Question: {
      question: string;
    };
    id: string;
  }[];
}

export interface EvaluationFormRequestBody {
  index: number;
  studentId: string;
}

export interface EvaluationFormRequestTrainerBody {
  trainingId: string;
}
