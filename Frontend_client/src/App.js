import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Scan from './Components/Scan';
import QRgenerator from './Components/QRgenerator';
import Camera from './Components/Camera';
import Events from './Components/Events';
import QRscanner from './Components/QRscanner';
import Landing from './Components/Landing';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/scan" element={<Scan />} /> */}
          <Route path="/qr" element={<QRgenerator />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/events" element={<Events />} />
          <Route path="/scanner" element={<QRscanner />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
