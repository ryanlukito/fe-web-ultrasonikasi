import Navbar from "../components/navbar";

const Edukasi = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="relative w-full h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Laut"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Penyebab Algal Bloom
          </h1>
          <p className="mt-4 text-lg max-w-3xl">
            Memahami fenomena Harmful Algal Blooms (HABs) dan dampaknya
            terhadap ekosistem laut.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Image */}
            <img
              src="./public/Lake-Erie-harmful-algal-blooms.jpg"
              alt="Algal Bloom"
              className="w-full h-full object-cover"
            />

            {/* Right Content */}
            <div className="p-6 md:p-10 text-gray-800">
              <h2 className="text-2xl font-bold mb-4">
                Apa itu Harmful Algal Bloom?
              </h2>
              <p className="leading-relaxed mb-4">
                Keberadaan unsur hara yang berlebihan di perairan dapat
                menyebabkan pertumbuhan fitoplankton meningkat secara
                tidak terkendali, hingga membahayakan ekosistem perairan.
                Peristiwa ini dikenal sebagai{" "}
                <span className="font-semibold">Harmful Algal Blooms (HABs)</span>.
              </p>
              <p className="leading-relaxed mb-4">
                HABs terbagi menjadi dua kategori:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <span className="font-semibold">Toxin Producer:</span> Alga
                  yang menghasilkan racun dan dapat menyebabkan{" "}
                  <em>red tide</em>.
                </li>
                <li>
                  <span className="font-semibold">Non-Toxin Producer:</span>{" "}
                  Alga yang menyebabkan perubahan warna pada perairan.
                </li>
              </ul>
              <p className="leading-relaxed">
                Salah satu fenomena blooming alga terjadi di Perairan Sumatera
                Barat, tepatnya di Pantai Bungus, Teluk Kabung, Kota Padang.
              </p>
            </div>
          </div>
        </div>

        {/* Reference Section */}
        <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">Referensi</h3>
          <p className="text-sm text-gray-700">
            R. C. C. P. K. Anggraini, Y. D. Kuntjoro, dan N. A. Sasongko,
            "Sebaran Spasial Fitoplankton Penyebab Harmful Algal Blooms (HABs)
            di Perairan Teluk Bungus, Sumatera Barat," Jurnal Biologi
            Universitas Andalas, vol. 9, no. 1, pp. 18–24, 2020. [Online].
            Tersedia:{" "}
            <a
              href="https://jbioua.fmipa.unand.ac.id/index.php/jbioua/article/view/452"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Link Jurnal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Edukasi;
