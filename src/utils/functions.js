"use client"

import { useEffect, useState } from "react";
import mqtt from "mqtt";
import axios from "axios";

export function getCurrentDateTimeID() {
    const now = new Date();

    const date = now.toLocaleString("id-ID", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const time = now.toLocaleString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return {date, time}

}

export function useMqtt(topic = "/d01/receive_data") {
  const [sensorData1, setSensorData1] = useState([]);
  const [sensorData2, setSensorData2] = useState([]);
  const [{ date, time }, setDateTime] = useState(getCurrentDateTimeID());
  const [timeLabels, setTimeLabels] = useState([time]);
  const [lastMessageTime, setLastMessageTime] = useState(Date.now());

  useEffect(() => {
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker from React");
      client.subscribe(topic, (err) => {
        if (!err) console.log(`📩 Subscribed to ${topic}`);
      });
    });

    client.on("message", async(_, message) => {
      try {
        console.log(message);
        const parsed = JSON.parse(message.toString());
        const { NTU1, NTU2 } = parsed;

        if (
          typeof NTU1 === 'number' &&
          typeof NTU2 === 'number' &&
          !isNaN(NTU1) &&
          !isNaN(NTU2)
        ) {
          const { time: newTime, date: newDate } = getCurrentDateTimeID();
  
          setTimeLabels((prev) => [...prev, newTime].slice(-10));
          setSensorData1((prev) => [...prev, NTU1].slice(-10));
          setSensorData2((prev) => [...prev, NTU2].slice(-10));
          setDateTime({ time: newTime, date: newDate });
          setLastMessageTime(Date.now());
          
          await axios.post("http://localhost:5000/api/device/device01/data", {
            data: {
              sensor_turbidity_1: NTU1,
              sensor_turbidity_2: NTU2,
              sensor_id_1: "sensor-turbidity-1",
              sensor_id_2: "sensor-turbidity-2"
            },
          });
          console.log(`✅ Sent NTU1=${NTU1}, NTU2=${NTU2} to backend`);
        } else {
          console.warn("⚠️ Skipping empty or invalid MQTT message:", parsed);
        }
      } catch (e) {
        console.error("❌ Invalid MQTT message", e);
      }
    });

    // const interval = setInterval(() => {
    //   if (Date.now() - lastMessageTime > 5000) {
    //     const { time: newTime, date: newDate } = getCurrentDateTimeID();
    //     const randomValue1 = Math.floor(Math.random() * 10 + 40);
    //     const randomValue2 = Math.floor(Math.random() * 10 + 40);

    //     setTimeLabels((prev) => [...prev, newTime].slice(-10));
    //     setSensorData1((prev) => [...prev, randomValue1].slice(-10));
    //     setSensorData2((prev) => [...prev, randomValue2].slice(-10));
    //     setDateTime({ time: newTime, date: newDate });
    //   }
    // }, 1000);

    return () => {
      // clearInterval(interval);
      client.end();
    };
  }, [topic, lastMessageTime]);

  return { sensorData1, sensorData2, timeLabels, date };
}