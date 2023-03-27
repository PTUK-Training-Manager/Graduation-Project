import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = (props) => {

    return (
        <Stack gap={2}>
            <Typography variant="h1">
                Protected Route🔐
            </Typography>
            <Typography variant="h2">
                authenticated user required ✅👤
            </Typography>
        </Stack>
    );
};

export default Dashboard;
