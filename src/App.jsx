import { Routes, Route }     from 'react-router-dom'
import Home                   from './pages/Home'
import CotizarAuto            from './pages/CotizarAuto/CotizarAuto'
import CotizarMedicina        from './pages/CotizarMedicina/CotizarMedicina'
import Nosotros               from './pages/Nosotros/Nosotros'

export default function App() {
  return (
    <Routes>
      <Route path="/"                   element={<Home />} />
      <Route path="/cotizar-auto"       element={<CotizarAuto />} />
      <Route path="/cotizar-medicina"   element={<CotizarMedicina />} />
      <Route path="/nosotros"           element={<Nosotros />} />
    </Routes>
  )
}
