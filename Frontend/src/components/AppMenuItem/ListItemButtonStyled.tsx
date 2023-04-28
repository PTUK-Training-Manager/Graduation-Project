import React from "react";
import {styled} from "@mui/material/styles";
import ListItemButton, {ListItemButtonProps} from "@mui/material/ListItemButton";

interface ListItemButtonStyledProps extends ListItemButtonProps {
    isChild: boolean;
    hasActiveChild: boolean;
    Icon?: () => React.ReactNode;
}

/**
 * @Sara
 * This is an example of how to use the `styled()` utility to create a component.
 * I made this component but then decided to stick to makeStyles() for consistency.
 */
const ListItemButtonStyled = styled(ListItemButton, {
    shouldForwardProp: prop =>
        prop !== "isChild" && prop !== "hasActiveChild" && prop !== "Icon",
})<ListItemButtonStyledProps>(({theme, isChild, hasActiveChild, Icon}) => ({
    borderRadius: theme.shape.borderRadius,
    ...(hasActiveChild && {
        color: theme.palette.appMenu.menuItemSelectedColor,
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
            color: theme.palette.appMenu.menuItemSelectedColor,
        },
        "& span": {
            fontWeight: 500,
        }
    }),
    ...(isChild && Icon && {
        marginLeft: "25px",
    })
}));

export default ListItemButtonStyled;