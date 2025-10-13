import { Outlet} from "react-router-dom"
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
