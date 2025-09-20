import BacaanSensor from "../components/BacaanSensor"
import DataSensor from "../components/DataSensor"
import KontroldanFrekuensi from "../components/KontroldanFrekuensi"
import LineChart from "../components/LineChart"
import Navbar from "../components/navbar"

const Monitoring = () => {
  return (
    <div className="w-screen h-screen overflow-y-hidden">
        <Navbar/>
        <div className="w-full h-full px-3 py-2">
            <p className="text-3xl font-bold mb-3">Monitoring Kualitas Air</p>
            <div className="w-full h-full flex items-center justify-center gap-x-5">
                <div className="w-full h-full flex flex-col gap-y-5">
                    <div className="bg-[#FFF7F7] p-4 rounded-md border border-black flex items-center justify-center">
                        <LineChart/>
                    </div>
                    <div className="bg-[#FFF7F7] p-4 rounded-md border border-black">Data sensor dan simulasi</div>
                </div>
                <div className="w-full h-full flex flex-col gap-y-5">
                    <div className="bg-[#FFF7F7] p-4 rounded-md border border-black">
                        <BacaanSensor NTU1="50" NTU2="50"/>
                    </div>
                    <div className="bg-[#FFF7F7] p-4 rounded-md border border-black">
                        <KontroldanFrekuensi Frekuensi1="50" Frekuensi2="50"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Monitoring