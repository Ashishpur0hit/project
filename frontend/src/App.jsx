import { useState , useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FillDetails from './pages/FillDetails';
import MapComponent from './pages/MapComponent';
import Help from './pages/Help';
import Virtual from './pages/Virtual';
import VoiceCall from './pages/VoiceCall';
import Meeting from './pages/Meeting';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filldetails" element={<FillDetails />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/help" element={<Help />} />
        <Route path="/bot" element={<Virtual />} />
        <Route path="/room" element={<VoiceCall />} />
        <Route
            path="/call"
            element={<Meeting />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
