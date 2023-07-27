import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";

export interface AppMenuItemComponentProps {
  className?: string;
  link?: string;
  toggleList?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const AppMenuItemComponent: FC<AppMenuItemComponentProps> = props => {
  const { className, toggleList, link, children } = props;

  const navigate = useNavigate();

  const handleNavigate = () => navigate(link!);

  // If link is not set, return the ordinary ListItem
  if (!link) {
    return (
      <ListItem disablePadding className={className} onClick={toggleList}>
        {children}
      </ListItem>
    );
  }

  // Return a ListItem with a hyperlink component
  return (
    <ListItem disablePadding className={className} component="a" onClick={handleNavigate}>
      {children}
    </ListItem>
  );
};

export default AppMenuItemComponent;
