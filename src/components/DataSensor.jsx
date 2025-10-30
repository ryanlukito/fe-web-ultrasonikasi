"use client"

import React, {useState, useEffect} from 'react'
import { getCurrentDateTimeID } from '../utils/functions'

const DataSensor = ({lokasiSensor}) => {
  const [{date, time}, setDateTime] = useState(getCurrentDateTimeID());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getCurrentDateTimeID());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-xl font-bold mb-3'>Data Sensor</p>
        <p>Lokasi: <span>{lokasiSensor}</span></p>
        <p>Tanggal: <span>{date}</span></p>
        <p>Waktu: <span>{time}</span> WIB</p>
      </div>
      <div>
        <p className='text-xl font-bold mb-3'>Status Koneksi</p>
      </div>
    </div>
  )
}

export default DataSensor