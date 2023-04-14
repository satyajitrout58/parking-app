import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingContext from './common/Context'
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Onboard from './pages/Onboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ParkingContext><Home /></ParkingContext>} />
          <Route path='/onboard' element={<Onboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
