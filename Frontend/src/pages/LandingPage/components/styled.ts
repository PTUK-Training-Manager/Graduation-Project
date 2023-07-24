import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ButtonProps } from "@mui/material";

export const StyledButton = styled(Button, {
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})<ButtonProps>(({ theme }) => ({
  border: "2px solid transparent",
  bgcolor: theme.palette.landingPage.indigo,
  "&:hover": {
    border: `2px solid ${theme.palette.landingPage.indigo}`,
    color: theme.palette.landingPage.indigo,
    bgcolor: "white",
  },
  variant: "contained",
}));
