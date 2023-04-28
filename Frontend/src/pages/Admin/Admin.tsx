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
            <Typography variant="h5">
                Not implemented yet...
            </Typography>
        </Stack>
    );
};

export default Admin;
