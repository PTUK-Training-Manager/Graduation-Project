import {createContext, useContext, PropsWithChildren, FC, ReactNode, useState} from "react";
import {noop} from "src/utils/functionsUtils";
import {TrainingDialog} from "../constants";

export interface TraineesContextValues {
    selectedTrainingId: number | null;
    onSetSelectedTrainingId: (trainingId: number) => void;
    openDialog: TrainingDialog | null;
    onOpenDialog: (dialog: TrainingDialog) => void;
    onCloseDialog: () => void;
    // onOpenEvaluationDialog: (trainingId: number) => void;
    // onCloseEvaluationDialog: () => void;
}

// const TraineesContext = createContext<TraineesContextValues>({
//     selectedTrainingId: null,
//     onSetSelectedTrainingId: noop,
//     openDialog: null,
//     onOpenDialog: noop,
// });

const TraineesContext = createContext<TraineesContextValues | null>(null);

export interface TraineesProviderProps {
    children: ReactNode;
}

export const useTraineesContext = () => {
    const context = useContext(TraineesContext);

    if (!context) {
        throw new Error("TraineesContext must be used within a TraineesProvider");
    }

    return context;
}

export const TraineesProvider: PropsWithChildren<FC<TraineesProviderProps>> = ({children}) => {

    const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState<TrainingDialog | null>(null);

    const onSetSelectedTrainingId = (trainingId: number) => setSelectedTrainingId(trainingId);
    const onOpenDialog = (dialog: TrainingDialog) => {
        console.log(dialog);
        setOpenDialog(dialog);
    };
    const onCloseDialog = () => setOpenDialog(null);

    const handleOpenProgressDialog = (trainingId: number) => {
        setSelectedTrainingId(trainingId);
        onOpenDialog(TrainingDialog.Progress);
    }

    const contextValues: TraineesContextValues = {
        selectedTrainingId,
        onSetSelectedTrainingId,
        openDialog,
        onOpenDialog,
        onCloseDialog,
    }

    return (
        <TraineesContext.Provider value={contextValues}>
            {children}
        </TraineesContext.Provider>

    )
}