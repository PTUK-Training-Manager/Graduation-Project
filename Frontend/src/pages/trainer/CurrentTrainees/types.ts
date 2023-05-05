export interface Row {
    id: string;
    studentId: string;
    Student: {
        name: string;
    };
}

export interface Progress {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
}

export interface Response {
  achievedHours: string;
  totalHours: string;
  progressForm: Progress[]
  
}