export interface PendingProgressRequests {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
    Training: {
        Student: {
            name: string;
            StudentId: string;
        };
    };
}