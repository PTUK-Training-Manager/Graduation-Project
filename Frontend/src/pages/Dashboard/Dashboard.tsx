import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = (props) => {

    return (
        <Stack gap={2} sx={{alignItems: "center"}}>
            <Typography variant="h1">
                Dashboard
            </Typography>
            <Typography variant="h3">
                Protected Route🔐
            </Typography>
            <Typography variant="h6">
                authenticated user required ✅👤
            </Typography>
        </Stack>
    );
};

export default Dashboard;
