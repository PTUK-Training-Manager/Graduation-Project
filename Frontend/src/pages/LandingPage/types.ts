import { ButtonProps } from "@mui/material";
import { ButtonType } from "./constants";

export interface CustomButtonProps extends Omit<ButtonProps, "color" | "type"> {
  backgroundColor?: string;
  color?: string;
  buttonText?: string;
  type?: ButtonType;
}

export type ListAnchor = "top" | "left" | "bottom" | "right";

export interface StyledButtonProps extends ButtonProps {
  text?: string;
}
