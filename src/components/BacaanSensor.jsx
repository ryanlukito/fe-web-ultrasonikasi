import React from 'react'
import { useMqtt } from '../utils/functions'

const BacaanSensor = () => {
  const {sensorData1, sensorData2, timeLabels, date} = useMqtt('/d01/receive_data')
  
  return (
    <div className='flex items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center font-bold'>
          <p>NTU 1</p>
          <div className={`rounded-full py-6 px-7 ${sensorData1.slice(-1)[0] < 30 ? "bg-green-500" : sensorData1.slice(-1)[0] < 50 ? "bg-yellow-500" : "bg-red-500"} border border-black text-xl text-white`}>{sensorData1.slice(-1)[0]}</div>
        </div>
        <div className='flex flex-col items-center justify-center font-bold'>
          <p>NTU 2</p>
          <div className={`rounded-full py-6 px-7 ${sensorData2.slice(-1)[0] < 30 ? "bg-green-500" : sensorData2.slice(-1)[0] < 50 ? "bg-yellow-500" : "bg-red-500"} border border-black text-xl text-white`}>{sensorData2.slice(-1)}</div>
        </div>
        <div>
          <div className='flex items-center gap-x-3'>
            <div className='w-3 h-3 rounded-full bg-green-500 border border-black'></div>
            <p className='text-md'>Aman</p>
          </div>
          <div className='flex items-center gap-x-3'>
            <div className='w-3 h-3 rounded-full bg-yellow-500 border border-black'></div>
            <p className='text-md'>Waspada</p>
          </div>
          <div className='flex items-center gap-x-3'>
            <div className='w-3 h-3 rounded-full bg-red-500 border border-black'></div>
            <p className='text-md'>Bahaya</p>
          </div>

        </div>
    </div>
  )
}

export default BacaanSensor