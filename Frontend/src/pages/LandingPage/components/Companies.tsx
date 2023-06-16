import {Box, Container, styled, Typography, Grid, Tooltip} from "@mui/material";
import React from "react";
// import logoImg from "src/images/landing/logo.png";
import logoImg from "src/images/landing/logo-white.jpg";
import starsImg from "src/images/landing/Star.png";
import logosImg from "src/images/landing/logos.png";
import logoFoothill from "src/images/landing/Foothill.png";
import logoExalt from "src/images/landing/Exalt.png";
import logoHarri from "src/images/landing/harri.png";
import logoRay from "src/images/landing/ray.jpg";
import logoAsal from "src/images/landing/asal.png";
import logoFounder from "src/images/landing/FounderTherapy.png";
import theme from "src/styling/customTheme";

const Companies = () => {
    const CustomContainer = styled(Container)(({theme}) => ({
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: theme.spacing(4),
        },
    }));

    const CustomBox = styled(Box)(({theme}) => ({
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(4),
        },
    }));

    return (
        <Box sx={{mt: 5}}>
            <CustomContainer>
                <CustomBox>
                    <img src={logoImg} alt="logo" style={{maxWidth: "100%", width: "150px", height: "30px"}}/>
                    {/*<Typography*/}
                    {/*    variant="h6"*/}
                    {/*    sx={{*/}
                    {/*        color: theme.palette.landingPage.indigo,*/}
                    {/*        fontWeight: "600"*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Trainerize*/}
                    {/*</Typography>*/}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#7D8589",
                            fontSize: "16px",
                            fontWeight: "bold",
                            mt: 2,
                        }}
                    >
                        Trusted by IT companies
                    </Typography>
                </CustomBox>

                <Box sx={{alignSelf: "flex-end"}}>
                    <img src={starsImg} alt="stars" style={{maxWidth: "100%"}}/>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#7D8589",
                            fontSize: "16px",
                            fontWeight: "bold",
                            mt: 2,
                        }}
                    >
                        More popular than ever
                    </Typography>
                </Box>
            </CustomContainer>

            <Container sx={{display: "flex", flexDirection: "column", mb: 3}}>
                <Grid
                    container
                    sx={{
                        flexDirection: {xs: "column", md: "row"},
                    }}
                    gap={4}
                >
                    <Grid item xs={12} md={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title="Foothill Solutions" arrow>
                            <Box
                                component="img"
                                src={logoFoothill}
                                alt="Foothill"
                                // width="100%"
                                sx={{maxWidth: "100%", maxHeight: "130px"}}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title="Exalt" arrow>
                            <Box
                                component="img"
                                src={logoExalt}
                                alt="Exalt"
                                // width="100%"
                                sx={{maxWidth: "100%", maxHeight: "130px"}}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title="ASAL Technologies" arrow>
                            <Box
                                component="img"
                                src={logoAsal}
                                alt="ASAL"
                                // width="100%"
                                sx={{maxWidth: "100%", maxHeight: "130px"}}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title="FounderTherapy" arrow>
                            <Box
                                component="img"
                                src={logoFounder}
                                alt="FounderTherapy"
                                // width="100%"
                                sx={{maxWidth: "100%", maxHeight: "130px"}}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tooltip title="Harri" arrow>
                            <Box
                                component="img"
                                src={logoHarri}
                                alt="Harri"
                                // width="100%"
                                sx={{maxWidth: "100%", maxHeight: "130px"}}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Companies;
