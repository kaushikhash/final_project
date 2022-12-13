import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Scan from './Components/Scan';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/scan" element={<Scan/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
