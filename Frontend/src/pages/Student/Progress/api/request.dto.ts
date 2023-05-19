export interface SubmitEvaluationBody {
    startTime: string,
    startTimeType: string,
    endTime: string,
    endTimeType: string
    skills: string,
    trainingId: number,
    date?:Date
}