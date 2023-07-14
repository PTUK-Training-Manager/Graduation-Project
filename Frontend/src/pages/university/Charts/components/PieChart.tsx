import { Pie } from "react-chartjs-2";
import { CategoryScale,Chart as ChartJS,LinearScale,BarElement,Tooltip, Legend,ArcElement} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend,ArcElement);

//@ts-ignore
function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;