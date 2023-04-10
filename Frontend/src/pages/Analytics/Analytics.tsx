import React, { FC } from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface LandingProps {}

const Analytics: FC<LandingProps> = (props) => {

  return (
      <Stack gap={2} sx={{alignItems: "center"}}>
          <Typography variant="h1">
              Analytics
          </Typography>
          <Typography variant="h3">
              Protected Route🔐
          </Typography>
          <Typography variant="h6">
              authenticated user with permission 'analyze' required
          </Typography>
      </Stack>
  );
};

export default Analytics;
