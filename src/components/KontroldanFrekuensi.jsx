import React, { useEffect, useRef } from "react";
import mqtt from "mqtt";

const KontroldanFrekuensi = ({ Frekuensi1, Frekuensi2 }) => {
  const clientRef = useRef(null);

  useEffect(() => {
    // Connect once when component mounts
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    clientRef.current = client;

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker (KontroldanFrekuensi)");
    });

    return () => {
      client.end();
    };
  }, []);

  const sendCommand = (value) => {
    if (clientRef.current) {
      clientRef.current.publish("/control", JSON.stringify({ state: value }));
      console.log("📤 Sent command:", value);
    }
  };

  return (
    <div className="flex flex-row items-start justify-evenly text-black gap-x-4">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <p className="text-lg font-bold">Pemancar Ultrasonik</p>
        <button
          onClick={() => sendCommand(1)}
          className="py-3 px-8 rounded-md font-bold bg-green-400 hover:bg-green-600"
        >
          ON
        </button>
        <button
          onClick={() => sendCommand(0)}
          className="py-3 px-8 rounded-md font-bold bg-red-400 hover:bg-red-600"
        >
          OFF
        </button>
      </div>
      <div className="flex flex-col items-start justify-start font-bold gap-y-3">
        <div className="flex flex-col items-center justify-start">
          <p className="text-lg">Frekuensi Alat 1</p>
          <p className="text-3xl">{Frekuensi1} Hz</p>
        </div>
        <div className="flex flex-col items-center justify-start">
          <p className="text-lg">Frekuensi Alat 2</p>
          <p className="text-3xl">{Frekuensi2} Hz</p>
        </div>
      </div>
    </div>
  );
};

export default KontroldanFrekuensi;
