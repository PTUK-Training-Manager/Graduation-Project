import React, {FC} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';

interface AccessDeniedProps {
}

const AccessDenied: FC<AccessDeniedProps> = () => {

    return (
        <Grid container sx={{justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Stack sx={{alignItems: "center", gap: 1}}>
                <LockIcon color="error" sx={{fontSize: 150}}/>
                <Typography variant="h2" color="error">Access Denied</Typography>
                <Typography variant="body1" color="error">It seems you don't have the permission to access this page</Typography>
            </Stack>
        </Grid>
    );
};

export default AccessDenied;
