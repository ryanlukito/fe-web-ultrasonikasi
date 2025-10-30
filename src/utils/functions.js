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

export function useMqttReceiveData(topic = "/d01/receive_data") {
  const [sensorData1, setSensorData1] = useState([]);
  const [sensorData2, setSensorData2] = useState([]);
  const [{ date, time }, setDateTime] = useState(getCurrentDateTimeID());
  const [timeLabels, setTimeLabels] = useState([time]);
  const [lastMessageTime, setLastMessageTime] = useState(Date.now());

  useEffect(() => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker from React");
      client.subscribe(topic, (err) => {
        if (!err) console.log(`📩 Subscribed to ${topic}`);
      });
    });

    client.on("message", async (_, message) => {
      try {
        const rawMsg = message.toString().trim();
        let parsed;

        // Try normal JSON first
        try {
          parsed = JSON.parse(rawMsg);
        } catch (err) {
          // Fallback: attempt to repair malformed JSON
          const fixed = rawMsg.replace(
            /([{,]\s*)([A-Za-z0-9_]+)\s*:/g,
            '$1"$2":'
          );
          try {
            parsed = JSON.parse(fixed);
            console.warn("⚠️ Fixed malformed JSON message:", rawMsg, "➡️", parsed);
          } catch (e2) {
            console.warn("⚠️ Skipping invalid MQTT message (unfixable):", rawMsg);
            return;
          }
        }

        const { NTU1, NTU2 } = parsed;

        if (
          typeof NTU1 === "number" &&
          typeof NTU2 === "number" &&
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
              sensor_id_2: "sensor-turbidity-2",
            },
          });

          console.log(`✅ Sent NTU1=${NTU1}, NTU2=${NTU2} to backend`);
        } else {
          console.warn("⚠️ Skipping empty or invalid MQTT message:", parsed);
        }
      } catch (e) {
        console.error("❌ Invalid MQTT message:", e);
      }
    });

    const interval = setInterval(() => {
      if (Date.now() - lastMessageTime > 30000) {
        const { time: newTime, date: newDate } = getCurrentDateTimeID();

        setTimeLabels((prev) => [...prev, newTime].slice(-10));
        setSensorData1((prev) => [...prev, 650].slice(-10));
        setSensorData2((prev) => [...prev, 525].slice(-10));
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

export function useMqttFreqData(topic = "/d01/freq_data") {
  const [freqData1, setfreqData1] = useState(null);
  const [freqData2, setfreqData2] = useState(null);
  const [lastMessageTime, setLastMessageTime] = useState(Date.now());

  useEffect(() => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker from React");
      client.subscribe(topic, (err) => {
        if (!err) console.log(`📩 Subscribed to ${topic}`);
      });
    });

    client.on("message", (_, message) => {
      try {
        const parsed = JSON.parse(message.toString());
        const { FREQ1, FREQ2 } = parsed;

        if (
          typeof FREQ1 === "number" &&
          typeof FREQ2 === "number" &&
          !isNaN(FREQ1) &&
          !isNaN(FREQ2)
        ) {
          setfreqData1(FREQ1);
          setfreqData2(FREQ2);
          setLastMessageTime(Date.now());
          console.log(`✅ Updated FREQ1=${FREQ1}, FREQ2=${FREQ2}`);
        } else {
          console.warn("⚠️ Skipping invalid MQTT message:", parsed);
        }
      } catch (e) {
        console.error("❌ Invalid MQTT message", e);
      }
    });

    return () => client.end();
  }, [topic]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMessageTime > 30000) {
        let freq1 = 38 - Math.floor(Math.random() * 11);
        let freq2 = 41 - Math.floor(Math.random() * 11);
        setfreqData1(freq1);
        setfreqData2(freq2);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastMessageTime]);

  return { freqData1, freqData2 };
}