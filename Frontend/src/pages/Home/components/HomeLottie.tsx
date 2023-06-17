import React, { FC } from "react";
import Lottie from "lottie-react";
import animationData from "src/lotties/stars.json";
import Box from "@mui/material/Box";

const HomeLottie: FC = () => {

  return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "90%"}}>
        <Lottie animationData={animationData} />
      </Box>
  );
};

export default HomeLottie;
