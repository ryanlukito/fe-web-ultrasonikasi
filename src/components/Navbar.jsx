import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="w-full px-4 py-5 bg-green-600 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-x-6 text-white font-medium">
          <Link
            to="/"
            className="hover:text-green-200 hover:underline transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/monitoring"
            className="hover:text-green-200 hover:underline transition-colors duration-200"
          >
            Monitoring
          </Link>
          <Link
            to="/edukasi"
            className="hover:text-green-200 hover:underline transition-colors duration-200"
          >
            Edukasi
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
