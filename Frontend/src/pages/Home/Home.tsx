import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import theme from "src/styling/customTheme";
import useAccountContext from 'src/hooks/useAccountContext';

interface HomeProps {
}

const Home: FC<HomeProps> = (props) => {
    const { isSidebarOpen, user } = useAccountContext();

    return (
   
        <Stack gap={2} sx={{
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h1">
                Home
            </Typography>
            <Typography variant="h5">
                Not implemented yet...
            </Typography>
        </Stack>
    );
};

export default Home;
