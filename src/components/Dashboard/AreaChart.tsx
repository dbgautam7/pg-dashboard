import { Chart as ChartJS, Title, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(Filler, Title);

const options = {
  responsive: true,
  interaction: { intersect: false },
  layout: { padding: 20 },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      fill: true,
      data: [0, 10, 5, 2, 20, 30, 45],
      borderColor: "#9333ea",
      backgroundColor: "#d8b4fe",
    },
  ],
};

export default function AreaChart() {
  return <Line options={options} data={data} />;
}
