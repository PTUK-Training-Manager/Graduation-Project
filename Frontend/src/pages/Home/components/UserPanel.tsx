import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import useAccountContext from "src/hooks/useAccountContext";
import {usePanelStyles} from "../styles";
import {useTranslation} from "react-i18next";
import {panelButtonsForUniversity, panelButtonsForCompany, panelButtonsForTrainer, panelButtonsForStudent, panelButtonsForAdmin} from "../constants";

import PanelButton from "./PanelButton";
import { UserRole } from 'src/constants/auth';

const UserPanel: FC = () => {

    const classes = usePanelStyles();
    const {getUser} = useAccountContext();
    const user = getUser();
    // @ts-ignore
    const {t} = useTranslation();
    const { SuperAdmin, UniTrainingOfficer, Company, Trainer, Student } =
    UserRole;

    return (
        <Stack gap={1} className={classes.container}>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    sx={{fontWeight: 500, fontSize: "1rem", color: theme => theme.palette.text.secondary}}
                >
                    {t("Welcome")}
                </Typography>
                <Typography variant="h2" sx={{fontWeight: 500, fontSize: "2.5rem"}}>
                    {user?.name}
                </Typography>
            </Grid>
            {user?.roleId === UniTrainingOfficer && ( // Check if userRole is UniTrainingOfficer
        <Paper sx={{ p: 3, borderRadius: (theme) => theme.shape.borderRadius }}>
          <Grid item container>
            <Grid container gap={3} sx={{ pt: 2, justifyContent: "space-around" }}>
              {panelButtonsForUniversity.map((button) => (
                <PanelButton
                  key={button.label} // Make sure to provide a unique key for each element in the map
                  link={button.link}
                  label={t(button.label)}
                  Icon={button.Icon}
                  bgcolor={button.bgcolor}
                  id={button.id}
                />
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
         {user?.roleId === Company  && ( 
        <Paper sx={{ p: 3, borderRadius: (theme) => theme.shape.borderRadius }}>
          <Grid item container>
            <Grid container gap={3} sx={{ pt: 2, justifyContent: "space-around" }}>
              {panelButtonsForCompany.map((button) => (
                <PanelButton
                  key={button.label} // Make sure to provide a unique key for each element in the map
                  link={button.link}
                  label={t(button.label)}
                  Icon={button.Icon}
                  bgcolor={button.bgcolor}
                  id={button.id}
                />
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
      {user?.roleId === Trainer  && ( 
        <Paper sx={{ p: 3, borderRadius: (theme) => theme.shape.borderRadius }}>
          <Grid item container>
            <Grid container gap={3} sx={{ pt: 2, justifyContent: "space-around" }}>
              {panelButtonsForTrainer.map((button) => (
                <PanelButton
                  key={button.label} // Make sure to provide a unique key for each element in the map
                  link={button.link}
                  label={t(button.label)}
                  Icon={button.Icon}
                  bgcolor={button.bgcolor}
                  id={button.id}
                />
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
       {user?.roleId === Student  && ( 
        <Paper sx={{ p: 3, borderRadius: (theme) => theme.shape.borderRadius }}>
          <Grid item container>
            <Grid container gap={3} sx={{ pt: 2, justifyContent: "space-around" }}>
              {panelButtonsForStudent.map((button) => (
                <PanelButton
                  key={button.label} // Make sure to provide a unique key for each element in the map
                  link={button.link}
                  label={t(button.label)}
                  Icon={button.Icon}
                  bgcolor={button.bgcolor}
                  id={button.id}
                />
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
      {user?.roleId === SuperAdmin  && ( 
        <Paper sx={{ p: 3, borderRadius: (theme) => theme.shape.borderRadius }}>
          <Grid item container>
            <Grid container gap={3} sx={{ pt: 2, justifyContent: "space-around" }}>
              {panelButtonsForAdmin.map((button) => (
                <PanelButton
                  key={button.label} // Make sure to provide a unique key for each element in the map
                  link={button.link}
                  label={t(button.label)}
                  Icon={button.Icon}
                  bgcolor={button.bgcolor}
                  id={button.id}
                />
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
        </Stack>
    );
};

export default UserPanel;
