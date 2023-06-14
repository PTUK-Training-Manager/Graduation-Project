import { useState } from 'react';
import './Charts.css';
import PieChart from './components/PieChart';
import { UserData } from './data';
import { Grid } from '@mui/material';
import BarChart from './components/BarChart';

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

  return (
    <Grid container sx={{ p: 3,justifyContent:"space-between"}} >
    <><div style={{ width: 700 }}>
      <BarChart chartData={userData} />
    </div><div style={{ width: 400 }}>
        <PieChart chartData={userData} />
      </div>
      </>
      </Grid>
  );
}

export default Charts;