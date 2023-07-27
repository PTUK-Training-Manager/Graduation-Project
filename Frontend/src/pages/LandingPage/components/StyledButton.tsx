import React, { FC } from "react";
import { StyledButtonProps } from "../types";
import Button from "@mui/material/Button";
import theme from "src/styling/customTheme";

const StyledButton: FC<StyledButtonProps> = props => {
  const { text } = props;

  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        border: "2px solid transparent",
        bgcolor: theme.palette.landingPage.indigo,
        textTransform: "capitalize",
        "&:hover": {
          border: `2px solid ${theme.palette.landingPage.indigo}`,
          bgcolor: "white",
          color: theme.palette.landingPage.indigo,
        },
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
