import Navbar from "../components/navbar"

const MainPage = () => {
  return (
    <div className="w-screen h-screen overflow-y-hidden">
        <Navbar/>
        <div className="w-full h-full">
          <div className="relative w-full h-1/3">
            <img src="./background.png" alt="background" className="absolute inset-0 object-cover w-full h-full z-0"/>
            <div className="relative z-10 flex flex-col font-bold text-white px-6 md:text-5xl text-4xl gap-y-3 py-5 h-full justify-center">
              <p>Solusi Cerdas untuk</p>
              <p>Ekosistem Perairan Sehat</p>
            </div>
          </div>
          <p className="w-full text-center mt-2 text-2xl font-bold">Fitur</p>
          <div className="w-full flex items-center justify-center gap-x-4 mt-3">
            <p>Pemantauan Realtime</p>
            <p>Kontrol On/Off Jarak Jauh</p>
            <p>Solusi Ramah Lingkungan</p>
          </div>
        </div>
    </div>
  )
}

export default MainPage