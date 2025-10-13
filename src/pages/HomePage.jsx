import Navbar from "../components/navbar"
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineSettingsRemote } from "react-icons/md";
import { IoWater } from "react-icons/io5";

const MainPage = () => {
  return (
    <div className="w-screen min-h-[80vh] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background Image */}
        <img
          src="./background.png"
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 text-center text-white">
          <h1 className="font-extrabold text-4xl md:text-6xl leading-tight drop-shadow-lg">
            Solusi Cerdas untuk
            <br />
            Ekosistem Perairan Sehat
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light text-gray-200 max-w-2xl">
            Teknologi inovatif untuk menjaga kualitas air, lingkungan sehat, dan keberlanjutan ekosistem.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Fitur
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 px-6">
          {/* Feature Card */}
          <div className="bg-white shadow-md rounded-2xl px-6 py-8 w-64 text-center hover:shadow-xl transition duration-300 flex flex-col items-center justify-center">
            <FaRegClock size={40} className="mb-3"/>
            <p className="text-xl font-semibold text-green-600">
              Pemantauan Realtime
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Pantau kondisi air secara langsung dengan data akurat.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-6 py-8 w-64 text-center hover:shadow-xl transition duration-300 flex flex-col items-center justify-center">
            <MdOutlineSettingsRemote size={40} className="mb-3"/>
            <p className="text-xl font-semibold text-green-600">
              Kontrol On/Off Jarak Jauh
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Kendalikan perangkat kapan saja dan di mana saja.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-6 py-8 w-64 text-center hover:shadow-xl transition duration-300 flex flex-col items-center justify-center">
            <IoWater size={40} className="mb-3"/>
            <p className="text-xl font-semibold text-green-600">
              Solusi Ramah Lingkungan
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Teknologi hijau untuk menjaga ekosistem berkelanjutan.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainPage
