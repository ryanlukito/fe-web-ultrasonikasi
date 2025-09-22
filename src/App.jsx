import { Outlet, Link } from "react-router-dom"

function App() {
  return (
    <div>
      {/* Render the child route here */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
