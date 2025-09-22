import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import Monitoring from './pages/Monitoring.jsx'
import Edukasi from './pages/Edukasi.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected app routes */}
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="edukasi" element={<Edukasi />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
