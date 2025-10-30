"use client"

import React, { useEffect, useState } from 'react'
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
import { useMqttReceiveData } from '../utils/functions';
import mqtt from 'mqtt';

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
  const {sensorData1, 
         sensorData2, 
         timeLabels, 
         date} = useMqttReceiveData('/d01/receive_data')

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "Sensor NTU 1",
        data: sensorData1,
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true,
        tension: 0.4
      },
      {
        label: "Sensor NTU 2",
        data: sensorData2,
        borderColor: "red",
        backgroundColor: "pink",
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {display: true, text: `Bacaan Sensor ${date}`}
    },
  };

  return (
    <Line data={data} options={options}/>
  )
}

export default LineChart