export interface SubmitEvaluationBody {
    trainingId: string;
    startTime: string;
    startTimeType: string;
    endTime: string;
    endTimeType: string;
    skills:string;
    date: Date;
}