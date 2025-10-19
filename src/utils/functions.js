"use client"

import { useEffect, useState } from "react";
import mqtt from "mqtt";

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

export function useMqtt(topic = "/receive_data") {
  const [sensorData1, setSensorData1] = useState([50]);
  const [sensorData2, setSensorData2] = useState([45]);
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

    client.on("message", (topic, message) => {
      try {
        const parsed = JSON.parse(message.toString());
        const { NTU1, NTU2 } = parsed;
        const { time: newTime, date: newDate } = getCurrentDateTimeID();

        setTimeLabels((prev) => [...prev, newTime].slice(-10));
        setSensorData1((prev) => [...prev, NTU1 ?? 50].slice(-10));
        setSensorData2((prev) => [...prev, NTU2 ?? 45].slice(-10));
        setDateTime({ time: newTime, date: newDate });
        setLastMessageTime(Date.now());

      } catch (e) {
        console.error("❌ Invalid MQTT message", e);
      }
    });

    const interval = setInterval(() => {
      if (Date.now() - lastMessageTime > 5000) {
        const { time: newTime, date: newDate } = getCurrentDateTimeID();
        const randomValue1 = Math.floor(Math.random() * 10 + 40);
        const randomValue2 = Math.floor(Math.random() * 10 + 40);

        setTimeLabels((prev) => [...prev, newTime].slice(-10));
        setSensorData1((prev) => [...prev, randomValue1].slice(-10));
        setSensorData2((prev) => [...prev, randomValue2].slice(-10));
        setDateTime({ time: newTime, date: newDate });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      client.end();
    };
  }, [topic, lastMessageTime]);

  return { sensorData1, sensorData2, timeLabels, date };
}