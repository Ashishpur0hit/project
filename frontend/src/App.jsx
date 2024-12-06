import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FillDetails from './pages/FillDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<Home />} />
        <Route path="/filldetails" element={<FillDetails />} />
      </Routes>
    </Router>
  )
}

export default App
