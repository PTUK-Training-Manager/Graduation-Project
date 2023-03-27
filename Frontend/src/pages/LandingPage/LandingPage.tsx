import React, { FC } from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface LandingProps {}

const LandingPage: FC<LandingProps> = (props) => {

  return (
      <Stack gap={2}>
          <Typography variant="h1">
              Public Route 📢
          </Typography>
          <Typography variant="h2">
              anyone can access this page 🙂
          </Typography>
      </Stack>
  );
};

export default LandingPage;
