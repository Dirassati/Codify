import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Login from './components/loginProcess/login/Login'
import ForgotPassword from './components/loginProcess/forgotPassword/ForgotPassword'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
