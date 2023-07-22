import {createContext, useContext, FC, ReactNode, useState} from "react";
import {noop} from "src/utils/functionsUtils";
import {TrainingDialog} from "../constants";

export interface TraineesContextValues {
    selectedTrainingId: number | null;
    onSetSelectedTrainingId: (trainingId: number) => void;
    openDialog: TrainingDialog | null;
    onOpenDialog: (dialog: TrainingDialog) => void;
    onCloseDialog: () => void;
}

const TraineesContext = createContext<TraineesContextValues>({
    selectedTrainingId: null,
    onSetSelectedTrainingId: noop,
    openDialog: null,
    onOpenDialog: noop,
    onCloseDialog: noop,
});

export const useTraineesContext = () => {
    const context = useContext(TraineesContext);

    if (!context) {
        throw new Error("TraineesContext must be used within a TraineesProvider");
    }

    return context;
}

export interface TraineesProviderProps {
    children: ReactNode;
}

export const TraineesProvider: FC<TraineesProviderProps> = ({children}) => {
    const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);

    const [openDialog, setOpenDialog] = useState<TrainingDialog | null>(null);

    const onSetSelectedTrainingId = (trainingId: number) => setSelectedTrainingId(trainingId);

    const onOpenDialog = (dialog: TrainingDialog) => setOpenDialog(dialog);

    const onCloseDialog = () => setOpenDialog(null);

    // const onOpenProgressDialog = (trainingId: number) => {
    //     onSetSelectedTrainingId(trainingId);
    //     onOpenDialog(TrainingDialog.Progress);
    // }

    const contextValues: TraineesContextValues = {
        selectedTrainingId,
        onSetSelectedTrainingId,
        openDialog,
        onOpenDialog,
        onCloseDialog,
    }

    console.log(contextValues);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TraineesContext.Provider value={contextValues}>
            {children}
        </TraineesContext.Provider>
    )
}