import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useNavigate}  from 'react-router-dom';
import { Button } from '@mui/material';


interface HomeProps {
}

const Home: FC<HomeProps> = (props) => {
    const navigate = useNavigate();



    return (
        <Stack gap={2} sx={{alignItems: "center"}}>
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
        
    );
};

export default Home;
