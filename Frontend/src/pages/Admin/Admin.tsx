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
                Admin
            </Typography>
            <Typography variant="h3">
                Protected Route 🔐
            </Typography>
            <Typography variant="h4">
                authenticated user with role 'admin' required
            </Typography>
            <Box
                component="img"
                className={classes.img}
                alt="Admin GIF"
                src="https://media.tenor.com/bbTnU1RnQugAAAAd/mod-emre.gif"
            />
        </Stack>
    );
};

export default Admin;
