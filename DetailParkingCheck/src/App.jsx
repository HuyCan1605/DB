
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import ParkingCheck from "./components/read_firebase"
import "./App.css";
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Parking_check' element={<ParkingCheck/>} />
        </Routes>
    </Router>

  );
};

export default App;