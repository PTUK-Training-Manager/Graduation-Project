import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import theme from "src/styling/customTheme";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = (props) => {

    return (
        <Stack gap={2} sx={{
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h1">
                Dashboard
            </Typography>
            <Typography variant="h5">
                Not implemented yet...
            </Typography>
        </Stack>
    );
};

export default Dashboard;
