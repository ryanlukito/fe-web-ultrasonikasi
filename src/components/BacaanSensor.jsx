import React from 'react'

const BacaanSensor = ({NTU1, NTU2}) => {
  return (
    <div className='flex items-center justify-center gap-x-4'>
        <div className='flex flex-col items-center justify-center font-bold'>
            <p>NTU 1</p>
            <div className='rounded-full py-6 px-7 bg-red-400 border border-black'>{NTU1}</div>
        </div>
        <div className='flex flex-col items-center justify-center font-bold'>
            <p>NTU 2</p>
            <div className='rounded-full py-6 px-7 bg-red-400 border border-black'>{NTU2}</div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default BacaanSensor