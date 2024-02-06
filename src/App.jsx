import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import GameSlotBooking from './pages/GameSlotBooking'
import GamesList from './pages/GamesList'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './pages/RequireAuth'
import GameBooking from './pages/GameBooking'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/"  element={<Home/>}/> 
        <Route path="/login"  element={<Login/>}/> 
        <Route path="/sign-up"  element={<SignUp/>}/> 
        <Route path="/game-booking" element={<GameBooking />} />       
        <Route path="/games-list" element={<RequireAuth><GamesList /></RequireAuth>} />            
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
