import {ReactElement} from "react";
import {SvgIconProps} from "@mui/material/SvgIcon";

export interface PanelButtonProps {
    Icon: ReactElement<SvgIconProps>;
    label: string;
    link?: string;
    bgcolor?: string;
    id?: string;
}