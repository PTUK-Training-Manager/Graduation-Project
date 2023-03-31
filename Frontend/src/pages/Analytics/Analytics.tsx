import React, { FC } from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface LandingProps {}

const Analytics: FC<LandingProps> = (props) => {

  return (
      <Stack gap={2}>
          <Typography variant="h1">
              Protected Route 🔐
          </Typography>
          <Typography variant="h2">
              authenticated user with permission 'analyze' required
          </Typography>
      </Stack>
  );
};

export default Analytics;
