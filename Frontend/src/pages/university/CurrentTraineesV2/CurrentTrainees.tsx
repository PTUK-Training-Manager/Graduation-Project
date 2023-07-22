import React, {FC} from 'react';
import CurrentTraineesGrid from "./CurrentTraineesGrid";
import {TraineesProvider} from "../context/TraineesContext";
import ProgressFormDialog from "../ProgressFormDialog";
import {CurrentTraineesProps} from "./types";

const CurrentTrainees: FC<CurrentTraineesProps> = (props) => {

    return (
        <TraineesProvider>
            <CurrentTraineesGrid/>
            <ProgressFormDialog  />
        </TraineesProvider>
    );
};

export default CurrentTrainees;
