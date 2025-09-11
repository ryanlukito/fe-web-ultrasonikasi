import Navbar from "../components/navbar"

const Monitoring = () => {
  return (
    <div className="w-screen h-screen overflow-y-hidden">
        <Navbar/>
        <div className="w-full h-full px-3 py-2">
            <p className="text-3xl font-bold">Monitoring Kualitas Air</p>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                    <div>Linechart Sensor</div>
                    <div>Data sensor dan simulasi</div>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div>Bacaan sensor NTU</div>
                    <div>Kontrol dan frekuensi pemancar</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Monitoring