import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { EmptyBodyProps } from "./types";
import TableBody from "@mui/material/TableBody";
import Grid from "@mui/material/Grid";

const EmptyBody: FC<EmptyBodyProps> = ({ message = "No records to display" }) => {
  return (
    <TableBody>
      <Grid sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography>{message}</Typography>
      </Grid>
    </TableBody>
  );
};

export default EmptyBody;
