import React, {FC, useContext} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {gridOffset} from "./constants";
import CurrentTraineesDataGrid from "./definition";
import useCurrentTrainees from "./hooks/useCurrentTrainees";

const CurrentTraineesGrid: FC = (props) => {

    const {rows} = useCurrentTrainees();

    return (
        <Grid container gap={1} sx={{p: 3, height: `calc(100vh - ${gridOffset}px)`}}>
            <Stack
                gap={1.5}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Typography component="h1" variant="h5" fontWeight={500}>
                    Current Trainees
                </Typography>
                <CurrentTraineesDataGrid data={rows}/>
            </Stack>
        </Grid>
    );
};

export default CurrentTraineesGrid;
