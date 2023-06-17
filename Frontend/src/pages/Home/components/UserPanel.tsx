import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import useAccountContext from "src/hooks/useAccountContext";
import {usePanelStyles} from "../styles";
import {useTranslation} from "react-i18next";
import {panelButtons} from "../constants";

import PanelButton from "./PanelButton";

const UserPanel: FC = () => {

    const classes = usePanelStyles();
    const {getUser} = useAccountContext();
    const user = getUser();
    // @ts-ignore
    const {t} = useTranslation();

    return (
        <Stack gap={1} className={classes.container}>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    sx={{fontWeight: 500, fontSize: "1rem", color: theme => theme.palette.text.secondary}}
                >
                    {t("Welcome")}
                </Typography>
                <Typography variant="h2" sx={{fontWeight: 500, fontSize: "2.5rem"}}>
                    {user?.name}
                </Typography>
            </Grid>
            <Paper sx={{p: 3, borderRadius: (theme) => theme.shape.borderRadius}}>
                <Grid item container>
                    <Grid container gap={3} sx={{pt: 2, justifyContent: "space-around"}}>
                        {panelButtons.map((button) => (
                            <PanelButton
                                link={button.link}
                                label={t(button.label)}
                                Icon={button.Icon}
                                bgcolor={button.bgcolor}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </Stack>
    );
};

export default UserPanel;
