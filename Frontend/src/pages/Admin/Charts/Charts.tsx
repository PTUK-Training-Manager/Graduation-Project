import { Button, Grid, Typography } from "@mui/material";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import {data} from './data';
import { useState } from "react";
const Charts: React.FC = () => {
    const handleButtonClick4 = () => {
        setShowPieChart(true);
      };
      const handleButtonClick5 = () => {
        setShowBarChart(true);
        setShowPieChart(false);
      };
      const [showPieChart, setShowPieChart] = useState(false);
      const [showBarChart, setShowBarChart] = useState(true);

    const [userData, setUserData] = useState({
        labels: data.map((data) => data.status),
        datasets: [
          {
            label: 'Number Of Trainings For Each Status',
            data: data.map((data) => data.count),
            backgroundColor: [
              'orange',
              'gray',
              '#5D9C59',
              'green',
              'red',
              '#DF2E38',
              'blue',
            ],
            borderColor: 'black',
            borderWidth: 2,
          },
        ],
      });
    
        
          return (
            <Grid container sx={{ p: 3,justifyContent:"space-between"}} >
            <div style={{ margin: '50px' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {!showPieChart && showBarChart && (
            <Grid item>
              <div style={{ width: 700 }}>
                <BarChart chartData={userData} />
              </div>
            </Grid>
          )}
          <Grid item>
            <div style={{width: 400, textAlign: 'center' ,marginLeft:'370px' }}>
              {showPieChart && <PieChart chartData={userData} />}
              
            </div>
            
          </Grid>
          </Grid>
      </div>
      {!showPieChart && (

      <Grid container justifyContent="center" alignItems="center" spacing={3} style={{ marginTop: '20px'}}>
        <Grid item>
          <Button variant="contained" onClick={handleButtonClick4}>
            Show Pie Chart
          </Button>
        </Grid>
        </Grid>
      )}
      {showPieChart &&
       <Grid container justifyContent="center" alignItems="center" spacing={3} style={{ marginTop: '20px'}}>
       <Grid item>
         <Button variant="contained" onClick={handleButtonClick5}>
           Show Bar Chart
         </Button>
       </Grid>
       </Grid>
      }
              </Grid>
          );
    
}
export default Charts;