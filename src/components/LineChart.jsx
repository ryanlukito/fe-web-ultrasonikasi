import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Bacaan Sensor NTU",
        data: [3,2,2,1,5],
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {display: true, text: "Bacaan Sensor"}
    },
  };

  return (
    <Line data={data} options={options}/>
  )
}

export default LineChart