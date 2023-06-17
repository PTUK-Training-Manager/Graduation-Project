import React, {FC} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {gridOffset} from "./constants";
import CurrentTraineesDataGrid from "./definition";
import useCurrentTrainees from "./hooks/useCurrentTrainees";
import {useTranslation} from 'react-i18next';

const CurrentTraineesGrid: FC = () => {

    const {rows, totalRows, isFetching, onGetDataGrid} = useCurrentTrainees();

    // @ts-ignore
    const {t} = useTranslation();

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
                    {t("Current Trainees")}
                </Typography>
                <CurrentTraineesDataGrid
                    data={rows}
                    totalRows={totalRows}
                    isFetching={isFetching}
                    onFetch={onGetDataGrid}
                />
            </Stack>
        </Grid>
    );
};

export default CurrentTraineesGrid;
