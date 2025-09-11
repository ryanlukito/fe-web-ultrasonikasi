import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='w-full py-5 px-4 flex items-center justify-end gap-x-4 bg-green-600 text-white font-bold text-lg'>
        <Link to="/">Home</Link>
        <Link to="/monitoring">Monitoring</Link>
        <Link to="/edukasi">Edukasi</Link>
    </div>
  )
}

export default Navbar