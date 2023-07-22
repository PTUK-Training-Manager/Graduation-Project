import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale,Chart as ChartJS,LinearScale,BarElement,Tooltip, Legend} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend);

//@ts-ignore
// eslint-disable-next-line react/prop-types
function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}

export default BarChart;

