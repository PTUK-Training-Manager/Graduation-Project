import React, {FC} from 'react';
import CurrentTraineesGrid from "./CurrentTraineesGrid";
import {TraineesProvider} from "../context/TraineesContext";
import ProgressFormDialog from "../ProgressFormDialog";

const CurrentTrainees: FC = () => {

    return (
        <TraineesProvider>
            <CurrentTraineesGrid/>
            <ProgressFormDialog  />
        </TraineesProvider>
    );
};

export default CurrentTrainees;
