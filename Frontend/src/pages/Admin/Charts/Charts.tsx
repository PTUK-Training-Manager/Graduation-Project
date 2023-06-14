import { useState } from 'react';
import './Charts.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import { UserData } from './data';
import { Grid, Button } from '@mui/material';

function Charts() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  const handleButtonClick1 = () => {
    // Update the chart data to display "Users Gained" dataset
    const updatedData = {
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: 'Users Gained',
          data: UserData.map((data) => data.userGain),
          backgroundColor: [
            'rgba(75,192,192,1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    setUserData(updatedData);
  };

  const handleButtonClick2 = () => {
    // Update the chart data to display "Users Lost" dataset
    const updatedData = {
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: 'Users Lost',
          data: UserData.map((data) => data.userLost),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    setUserData(updatedData);
  };

  const handleButtonClick3 = () => {
    // Update the chart data to display a custom dataset
    const updatedData = {
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: 'Custom Dataset',
          data: UserData.map((data) => data.userGain + data.userLost),
          backgroundColor: [
            'rgba(255, 205, 86, 1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    setUserData(updatedData);
  };

  return (
    <>
    <Grid container sx={{ p: 3, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 400 }}>
        <PieChart chartData={userData} />
      </div>
    </Grid>
    <Grid  gap={5} container sx={{ p: 3, justifyContent: 'center', alignItems: 'center' }}>

      <Button variant="contained" onClick={handleButtonClick1}>
        Number of Trainees
      </Button>
      <Button variant="contained" onClick={handleButtonClick2}>
        Users Lost
      </Button>
      <Button variant="contained" onClick={handleButtonClick3}>
        Custom Dataset
      </Button>
      </Grid>
      </>
  );
}

export default Charts;
