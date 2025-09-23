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
  const [sensorData1, setSensorData1] = useState([]);
  const [sensorData2, setSensorData2] = useState([]);
  const [{ date, time }, setDateTime] = useState(getCurrentDateTimeID());
  const [timeLabels, setTimeLabels] = useState([time]);

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
        const { temperature, humidity } = parsed;
        const { time: newTime, date: newDate } = getCurrentDateTimeID();

        setTimeLabels((prev) => [...prev, newTime].slice(-10));
        setSensorData1((prev) => [...prev, temperature].slice(-10));
        setSensorData2((prev) => [...prev, humidity].slice(-10));
        setDateTime({ time: newTime, date: newDate });
      } catch (e) {
        console.error("❌ Invalid MQTT message", e);
      }
    });

    return () => {
      client.end();
    };
  }, [topic]);

  return { sensorData1, sensorData2, timeLabels, date };
}