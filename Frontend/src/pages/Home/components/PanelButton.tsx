import React, { FC } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { PanelButtonProps } from "../types";
import { useNavigate } from "react-router-dom";

const PanelButton: FC<PanelButtonProps> = ({ Icon, label, link, bgcolor,id }) => {
  const navigate = useNavigate();

  const goToLink = () => link && navigate(link);

  return (
    <Grid item>
      <Stack gap={1} sx={{ alignItems: "center" }}>
        <Avatar sx={{ bgcolor, width: 80, height: 80 }}>
          <IconButton id={id} color="inherit" size="large" onClick={goToLink}>
            {Icon}
          </IconButton>
        </Avatar>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: theme => theme.palette.text.secondary }}
        >
          {label}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default PanelButton;
