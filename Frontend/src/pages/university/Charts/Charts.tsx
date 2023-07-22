import { Button, Divider, Grid, List, ListItemButton, Stack, Typography } from "@mui/material";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import theme from "src/styling/customTheme";
import React, { useEffect, useState } from "react";
import { getCountStatus, getTypeStatus, getCompanyStatus } from "./api";
interface UserData {
  labels: string[];
  datasets: object[];
}
const Charts: React.FC = () => {
  const handleButtonClick4 = () => {
    setShowPieChart(true);
  };
  const handleButtonClick5 = () => {
    setShowBarChart(true);
    setShowPieChart(false);
  };
  const handleButtonClick1 = () => {
    setStatus(true);
    setIsType(false);
    setIsCompany(false);
  };
  const handleButtonClick2 = () => {
    setStatus(false);
    setIsType(true);
    setIsCompany(false);
  };
  const handleButtonClick3 = () => {
    setStatus(false);
    setIsType(false);
    setIsCompany(true);
  };
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(true);
  const [status, setStatus] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const [dataForStatus, setDataForStatus] = useState<UserData | null>(null);
  const [dataFortype, setDataFortype] = useState<UserData | null>(null);
  const [dataForCompany, setDataForCompany] = useState<UserData | null>(null);

  useEffect(() => {
    getCountStatus().then(res => {
      setDataForStatus({
        //@ts-ignore
        labels: res.data.map(data => data.status),
        datasets: [
          {
            label: "Number Of Trainings For Each Status",
            //@ts-ignore
            data: res.data.map(data => data.count),
            backgroundColor: ["orange", "gray", "#5D9C59", "green", "red", "#DF2E38", "blue"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);
  useEffect(() => {
    getTypeStatus().then(res => {
      setDataFortype({
        //@ts-ignore
        labels: res.data.map(data => data.type),
        datasets: [
          {
            label: "Number Of Trainings For Each Type",
            //@ts-ignore
            data: res.data.map(data => data.count),
            backgroundColor: ["orange", "gray", "green"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);
  useEffect(() => {
    getCompanyStatus().then(res => {
      setDataForCompany({
        //@ts-ignore
        labels: res.data.map(data => data.companyName),
        datasets: [
          {
            label: "Number Of Trainings For Each Company",
            //@ts-ignore
            data: res.data.map(data => data.studentCount),
            backgroundColor: ["orange", "gray", "green"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);
  return (
    <Grid
      container
      sx={{
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography component="h1" variant="h5" fontWeight={500}>
          Charts
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "gray[50]",
            borderBlockColor: "black",
          }}
        >
          <ListItemButton
            onClick={handleButtonClick1}
            sx={{
              border: "1px solid black",

              ":hover": {
                backgroundColor: "gray[40]",
                borderColor: "black",
              },
            }}
          >
            1) The Number Of Trainings For Each Status
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={handleButtonClick2}
            sx={{
              border: "1px solid black",
              ":hover": {
                backgroundColor: "gray[40]",
                borderColor: "black",
              },
            }}
          >
            2) The Number Of Trainings For Each Type
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={handleButtonClick3}
            sx={{
              border: "1px solid black",
              ":hover": {
                backgroundColor: "gray[40]",
                borderColor: "black",
              },
            }}
          >
            3) The Number Of Trainings For Each Company
          </ListItemButton>
        </List>
        {status && dataForStatus && (
          <Grid container sx={{ justifyContent: "center" }}>
            <div style={{ margin: "30px" }}>
              <Grid container justifyContent="center" alignItems="center">
                {!showPieChart && showBarChart && (
                  <Grid item>
                    <div style={{ width: 700 }}>
                      <BarChart chartData={dataForStatus} />
                    </div>
                  </Grid>
                )}
                <Grid container justifyContent="center" alignItems="center">
                  <div style={{ width: 350 }}>
                    {showPieChart && <PieChart chartData={dataForStatus} />}
                  </div>
                </Grid>
              </Grid>
            </div>
            {!showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick4}>
                    Show Pie Chart
                  </Button>
                </Grid>
              </Grid>
            )}
            {showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick5}>
                    Show Bar Chart
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {isCompany && dataForCompany && (
          <Grid container sx={{ justifyContent: "center" }}>
            <div style={{ margin: "30px" }}>
              <Grid container justifyContent="center" alignItems="center">
                {!showPieChart && showBarChart && (
                  <Grid item>
                    <div style={{ width: 700 }}>
                      <BarChart chartData={dataForCompany} />
                    </div>
                  </Grid>
                )}
                <Grid container justifyContent="center" alignItems="center">
                  <div style={{ width: 350 }}>
                    {showPieChart && <PieChart chartData={dataForCompany} />}
                  </div>
                </Grid>
              </Grid>
            </div>
            {!showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick4}>
                    Show Pie Chart
                  </Button>
                </Grid>
              </Grid>
            )}
            {showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick5}>
                    Show Bar Chart
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {isType && dataFortype && (
          <Grid container sx={{ justifyContent: "center" }}>
            <div style={{ margin: "30px" }}>
              <Grid container justifyContent="center" alignItems="center">
                {!showPieChart && showBarChart && (
                  <Grid item>
                    <div style={{ width: 700 }}>
                      <BarChart chartData={dataFortype} />
                    </div>
                  </Grid>
                )}
                <Grid container justifyContent="center" alignItems="center">
                  <div style={{ width: 350 }}>
                    {showPieChart && <PieChart chartData={dataFortype} />}
                  </div>
                </Grid>
              </Grid>
            </div>
            {!showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick4}>
                    Show Pie Chart
                  </Button>
                </Grid>
              </Grid>
            )}
            {showPieChart && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" onClick={handleButtonClick5}>
                    Show Bar Chart
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Stack>
    </Grid>
  );
};
export default Charts;
