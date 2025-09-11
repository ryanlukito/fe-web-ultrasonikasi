import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Monitoring from './pages/Monitoring.jsx'
import Edukasi from './pages/Edukasi.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="monitoring" element={<Monitoring/>}/>
      <Route path='edukasi' element={<Edukasi/>}/>
    </Routes>
  </BrowserRouter>,
)
