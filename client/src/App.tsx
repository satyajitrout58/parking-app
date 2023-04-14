import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingContext from './common/Context'
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import Onboard from './pages/onboard/Onboard'

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
