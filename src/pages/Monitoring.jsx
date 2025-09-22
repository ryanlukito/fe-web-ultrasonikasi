import BacaanSensor from "../components/BacaanSensor"
import DataSensor from "../components/DataSensor"
import KontroldanFrekuensi from "../components/KontroldanFrekuensi"
import LineChart from "../components/LineChart"
import Navbar from "../components/navbar"

const Monitoring = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 px-10 py-6 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Monitoring Kualitas Air
        </h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Line Chart */}
            <div className="bg-white shadow-md rounded-xl p-4">
              <LineChart />
            </div>

            {/* Data Sensor */}
            <div className="bg-white shadow-md rounded-xl p-5">
              <DataSensor lokasiSensor="UGM" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Bacaan Sensor */}
            <div className="bg-white shadow-md rounded-xl p-5">
              <BacaanSensor NTU1="50" NTU2="50" />
            </div>

            {/* Kontrol & Frekuensi */}
            <div className="bg-white shadow-md rounded-xl p-5">
              <KontroldanFrekuensi Frekuensi1="50" Frekuensi2="50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Monitoring
