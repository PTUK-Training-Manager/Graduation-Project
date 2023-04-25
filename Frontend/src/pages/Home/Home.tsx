import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useNavigate}  from 'react-router-dom';
import AppNavbar from "src/components/AppNavbar";
import AppSideDrawer from "src/components/AppSideDrawer";
import Grid from '@mui/material/Grid';
import { getContentPaddingLeft } from 'src/constants';
import useAccountContext from 'src/hooks/useAccountContext';
import { Button } from '@mui/material';

interface HomeProps {
}

const Home: FC<HomeProps> = (props) => {
    const navigate = useNavigate();
    const {isSidebarOpen} = useAccountContext();



    return (
        <>
        {/* <AppNavbar />
        <AppSideDrawer roleId={null} /> */}
        <Grid container
                  sx={{
                      transition: ".25s",
                      pt: 17,
                    //   pb: 4,
                      paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "8px",
                    //   bgcolor: theme.palette.grey[200],
                    //   height: "100vh",
                    //   width: "100%",
                      display: 'flex',
                      justifyContent: "center",
                      alignItems: "center"
                  }}
            >
        <Stack gap={2} sx={{ alignItems: "center" }}>
            <Typography variant="h1">
                Home
            </Typography>
            <Typography variant="h2">
                Protected Route🔐
            </Typography>
            <Typography variant="h4">
                authenticated user required ✅👤
            </Typography>
        </Stack>
        </Grid>
        </>
    );
};

export default Home;
