import React, {FC} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import trainingImg from 'src/images/assets/training.png';
import Wave from 'react-wavify';
import {useMediaQuery} from "@mui/material";
import {grey} from "@mui/material/colors";

const WavyBackground: FC = () => {
    const shouldShowWave = useMediaQuery("(min-width:1200px)");

    return (
        <Grid
            sx={{
                height: "100vh",
                display: 'flex',
                justifyContent: 'flex-start',
                position: "relative"
            }}
        >
            <Box
                component="img"
                src={trainingImg}
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            />
            {shouldShowWave && (
                <Wave
                    style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%) translateX(calc(50% - 30px)) rotate(-90deg)"
                    }}
                    // fill='#f5f5f5'
                    fill={grey[100]}
                    paused={false}
                    options={{
                        height: 60,
                        amplitude: 30,
                        speed: 0.25,
                        points: 6,
                    }}
                />
            )}
        </Grid>
    );
};

export default WavyBackground;
