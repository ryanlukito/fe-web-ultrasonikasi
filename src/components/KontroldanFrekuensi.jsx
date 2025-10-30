"use client";

import { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";
import toast from "react-hot-toast";
import { useMqttFreqData } from "../utils/functions";

const KontroldanFrekuensi = ({Frekuensi1, Frekuensi2}) => {
  const clientRef = useRef(null);
  const {freqData1, freqData2} = useMqttFreqData('/d01/receive_data')
  
  useEffect(() => {
    // Connect once when component mounts
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    clientRef.current = client;

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker (KontroldanFrekuensi)");
    });

    client.on("error", (err) => {
      toast.error("❌ MQTT Connection error");
      console.error(err);
    })

    // const interval = setInterval(() => {
    //     setDateTime(getCurrentDateTimeID());
    //   }, 1000);

    return () => {
      client.end();
      // clearInterval(interval);
    };
  }, []);

  const sendCommand = (value) => {
    if (clientRef.current) {
      clientRef.current.publish("/control", JSON.stringify({ state: value }));
      
      const msg =
        value === 1 ? (
          <span>
            Ultrasonic transmitter turned{" "}
            <span className="font-bold text-green-500">ON</span>
          </span>
        ) : (
          <span>
            Ultrasonic transmitter turned{" "}
            <span className="font-bold text-red-500">OFF</span>
          </span>
        );
      
      toast.success(msg);
    } else {
      toast.error("MQTT client not connected")
    }
  };

  return (
    <div className="flex flex-row items-start justify-evenly text-black gap-x-4">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <p className="text-lg font-bold">Pemancar Ultrasonik</p>
        <button
          onClick={() => sendCommand(1)}
          className="text-white py-3 px-8 rounded-md font-bold bg-green-500 hover:bg-green-700"
        >
          ON
        </button>
        <button
          onClick={() => sendCommand(0)}
          className="text-white py-3 px-8 rounded-md font-bold bg-red-500 hover:bg-red-700"
        >
          OFF
        </button>
      </div>
      {/* <div>
        <p className='text-xl font-bold mb-3'>Data Sensor</p>
        <p>Lokasi: <span>{lokasiSensor}</span></p>
        <p>Tanggal: <span>{date}</span></p>
        <p>Waktu: <span>{time}</span> WIB</p>
      </div> */}
      <div className="flex flex-col items-start justify-start font-bold gap-y-3">
        <div className="flex flex-col items-center justify-start">
          <p className="text-lg">Frekuensi Alat 1</p>
          <p className="text-3xl">{freqData1} kHz</p>
        </div>
        <div className="flex flex-col items-center justify-start">
          <p className="text-lg">Frekuensi Alat 2</p>
          <p className="text-3xl">{freqData2} kHz</p>
        </div>
      </div>
    </div>
  );
};

export default KontroldanFrekuensi;
