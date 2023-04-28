import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import theme from "src/styling/customTheme";

interface HomeProps {
}

const Home: FC<HomeProps> = (props) => {

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
