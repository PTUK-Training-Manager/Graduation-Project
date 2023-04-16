import React, { FC } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = (props) => {

    return (
        <Grid container sx={{justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Grid item>
                <Typography variant="h1" color="error">404</Typography>
            </Grid>
        </Grid>
    );
};

export default NotFound;
