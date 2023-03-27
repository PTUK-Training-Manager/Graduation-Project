import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Stack";
import useStyles from "./styles";

interface LandingProps {
}

const Admin: FC<LandingProps> = (props) => {

    const classes = useStyles();


    return (
        <Stack gap={2} className={classes.root}>
            <Typography variant="h1">
                Protected Route 🔐
            </Typography>
            <Typography variant="h2">
                authenticated user with role 'admin' required
            </Typography>
            <Box
                component="img"
                className={classes.img}
                // sx={{
                //     height: 500,
                //     width: 500,
                //     // maxHeight: { xs: 233, md: 167 },
                //     // maxWidth: { xs: 350, md: 250 },
                // }}
                alt="Admin GIF"
                src="https://media.tenor.com/bbTnU1RnQugAAAAd/mod-emre.gif"
            />
            <Box
                className={classes.container}
            >
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
                Container
            </Box>
        </Stack>
    );
};

export default Admin;
