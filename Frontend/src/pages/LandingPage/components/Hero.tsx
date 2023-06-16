import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {styled} from "@mui/material/styles";
import Navbar from "./Nabvbar";
import StyledButton from "./StyledButton";
import heroImg from "src/images/landing/documents.png";
import theme from "src/styling/customTheme";
import {useNavigate} from "react-router-dom";

const Hero: FC = () => {

    const CustomBox = styled(Box)(({theme}) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({theme}) => ({
        fontSize: "64px",
        color: theme.palette.landingPage.indigo,
        fontWeight: "bold",
        m: theme.spacing(4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        }
    }));

    const navigate = useNavigate();

    const goToMoreAboutUs = () => window.open("https://github.com/PTUK-Training-Manager/Graduation-Project");

    return (
        <Box sx={{bgcolor: theme.palette.landingPage.whiteIndigo, minHeight: "80vh",}}>
            <Container sx={{pb: 3}}>
                <Navbar/>
                <CustomBox>
                    <Box sx={{flex: 1}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                color: theme.palette.landingPage.greyText,
                                fontWeight: "400",
                                mt: 10,
                                mb: 4
                            }}
                        >
                            Welcome to Trainerize Management Information System
                        </Typography>
                        <Title variant="h1">
                            Manage your interns with ease.
                        </Title>
                        <Typography
                            variant="body2"
                            sx={{fontSize: "18px", color: theme.palette.landingPage.greyText, my: 4}}
                        >
                            Help university automate and facilitate the manual process of managing students' training
                            and keep track of students' electronic records.
                        </Typography>
                        <StyledButton
                            text="More About Us"
                            onClick={goToMoreAboutUs}
                        />
                    </Box>

                    <Box sx={{flex: 1.25}}>
                        <Box
                            component="img"
                            src={heroImg}
                            alt="hero"
                            width="100%"
                            sx={{
                                maxWidth: "100%", mb: "2rem", bgcolor: "transparent",
                            }}
                        />
                    </Box>
                </CustomBox>
            </Container>
        </Box>
    );
};

export default Hero;
