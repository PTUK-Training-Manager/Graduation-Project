import { useState } from 'react';
import './Charts.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import { UserData } from './data';
import { Grid, Button } from '@mui/material';

function Charts() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.Status),
    datasets: [
      {
        label: 'Number of Trainees on each status',
        data: UserData.map((data) => data.NumberOfTraining),
        backgroundColor: [
          '#fb4f14',
          '#ecf0f1',
          '#32cd32',
          '#ff0000',
          '#ff2800',
          '#008000',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  const [showPieChart, setShowPieChart] = useState(false);

  const handleButtonClick1 = () => {
    const updatedData = {
      labels: UserData.map((data) => data.Status),
      datasets: [
        {
          label: 'Users Gained',
          data: UserData.map((data) => data.NumberOfTraining),
          backgroundColor: [
            '#fb4f14',
            '#ecf0f1',
            '#32cd32',
            '#ff0000',
            '#ff2800',
            '#008000',
          ],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    setUserData(updatedData);
    setShowPieChart(false);
  };

  const handleButtonClick4 = () => {
    setShowPieChart(true);
  };

  return (
    <>
      <div style={{ margin: '50px' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {!showPieChart && (
            <Grid item>
              <div style={{ width: 700 }}>
                <BarChart chartData={userData} />
              </div>
            </Grid>
          )}
          <Grid item>
            <div style={{ width: 400, textAlign: 'center' ,marginRight:'200px' }}>
              {showPieChart && <PieChart chartData={userData} />}
            </div>
          </Grid>
        </Grid>
      </div>
      <Grid container justifyContent="center" alignItems="center" spacing={3} style={{ marginTop: '20px'}}>
        <Grid item>
          <Button variant="contained" onClick={handleButtonClick1}>
            Number of Trainees
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#8b0000' }}
            onClick={handleButtonClick4}
          >
            Show Pie Chart
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Charts;
