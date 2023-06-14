export interface SubmitEvaluationBody {
    startTime: string,
    startTimeType: string,
    endTime: string,
    endTimeType: string
    skills: string,
    trainingId: number | undefined,
    date?:Date
}

export interface RejectedEvaluationstionBody {
    trainingId: number | undefined,
}

export interface PendingEvaluationstionBody {
    trainingId: number | undefined,
}

export interface editEvaluationBody {
    startTime?: string,
    startTimeType?: string,
    endTime?: string,
    endTimeType?: string
    skills?: string,
    date?:Date
    id: number
}