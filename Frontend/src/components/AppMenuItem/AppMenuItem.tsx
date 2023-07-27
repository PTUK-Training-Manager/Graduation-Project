import React, { FC } from "react";
import useStyles from "./styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import classnames from "classnames";
import AppMenuItemComponent from "./AppMenuItemComponent";
import doesUrlMatchMenuItem from "src/utils/doesUrlMatchMenuItem";
import { IAppMenuItem } from "src/routes/types";

export interface AppMenuItemProps extends IAppMenuItem {
  isChild?: boolean;
  hasSelectedChild?: boolean;
}

const AppMenuItem: FC<AppMenuItemProps> = ({
  label,
  Icon,
  items,
  link,
  isChild = false,
  hasSelectedChild = false,
}) => {
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const toggleList = () => setOpen(!open);

  const isActive = link ? doesUrlMatchMenuItem(link) : false;

  const classes = useStyles();

  const MenuItemRoot = (
    <AppMenuItemComponent
      toggleList={toggleList}
      link={link}
      className={classnames({
        [classes.listItemChild]: isChild,
      })}
    >
      <ListItemButton
        className={classnames(classes.listItemButton, {
          [classes.hasSelectedChild]: hasSelectedChild,
          [classes.customInset]: isChild && Icon,
          [classes.childSelected]: isChild && isActive,
        })}
        selected={isActive}
        classes={{
          selected: classes.selected,
        }}
      >
        {Icon && (
          <ListItemIcon
            classes={{
              root: classes.listItemIcon,
            }}
          >
            {Icon()}
          </ListItemIcon>
        )}
        <ListItemText
          primary={label}
          className={classes.listItemText}
          inset={!Icon}
          classes={{
            inset: classes.customInset,
          }}
        />
        {isExpandable && open && <ExpandLess className={classes.listItemIcon} />}
        {isExpandable && !open && <ExpandMore className={classes.listItemIcon} />}
      </ListItemButton>
    </AppMenuItemComponent>
  );

  const MenuItemChildren = isExpandable && (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List disablePadding>
        {items?.map((item, index) => <AppMenuItem {...item} key={index} isChild />)}
      </List>
    </Collapse>
  );

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

export default AppMenuItem;
