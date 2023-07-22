import React from "react";
import { Pie } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

//@ts-ignore
// eslint-disable-next-line react/prop-types
function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;
