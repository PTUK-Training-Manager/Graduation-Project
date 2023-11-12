import React, { FC } from "react";
import List from "@mui/material/List";

import useStyles from "./styles";
import useAppMenuNavigation from "src/routes/hooks/useAppMenuNavigation";

import AppMenuItem from "../AppMenuItem";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppMenuProps {}

const AppMenu: FC<AppMenuProps> = () => {
  const classes = useStyles();

  const { appMenuItems, doesHaveSelectedChild } = useAppMenuNavigation();

  return (
    <List
      classes={{
        root: classes.appMenu,
      }}
      component="nav"
    >
      {appMenuItems.map((item, index) => {
        const hasSelectedChild = doesHaveSelectedChild(item);
        return <AppMenuItem {...item} key={index} hasSelectedChild={hasSelectedChild} />;
      })}
    </List>
  );
};

export default AppMenu;
