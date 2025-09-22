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
import { getCurrentDateTimeID } from '../utils/functions';
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
  const [sensorData1, setSensorData1] = useState([3,2,2,1,5]);
  const [sensorData2, setSensorData2] = useState([5,4,6,2,3]);
  const [{date, time}, setDateTime] = useState(getCurrentDateTimeID());
  const [timeLabels, setTimeLabels] = useState([time]);

  const getRandomData = () => Array.from({length: 5}, () => Math.floor(Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      const {time: newTime, date: newDate} = getCurrentDateTimeID();

      setTimeLabels(prev => [...prev, newTime].slice(-5));

      setSensorData1(prev => [...prev, getRandomData()].slice(-5));
      
      setSensorData2(prev => [...prev, getRandomData()].slice(-5));

      setDateTime({time: newTime, date: newDate});
    }, 1000);

    return () => clearInterval(interval);
  }, [])

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