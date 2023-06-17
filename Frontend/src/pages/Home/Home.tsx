import React, {FC} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useStyles} from "./styles";
import UserPanel from "./components/UserPanel";
import HomeLottie from "./components/HomeLottie";
import {useTranslation} from "react-i18next";

const Home: FC = () => {
    // @ts-ignore
    const {i18n} = useTranslation();
    const isLTR = i18n.dir() === "ltr";
    const classes = useStyles();

    return (
        <Grid container className={classes.root} sx={{maxHeight: "100vh - 64px"}}>
            <Grid item xs={12} md={5}>
                <HomeLottie/>
                {/*<Box*/}
                {/*    className={classes.bgImg}*/}
                {/*    sx={{borderRadius: isLTR ? "0% 0% 30% 0%" : "0% 0% 0% 30%",}}*/}
                {/*/>*/}
            </Grid>
            <Grid item xs={12} md={7}>
                <UserPanel/>
            </Grid>
        </Grid>
    );
};

export default Home;
