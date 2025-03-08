import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Login from './components/loginProcess/login/Login'

import ForgotPassword from './components/loginProcess/forgotPassword/ForgotPassword'
import Verification from './components/loginProcess/forgotPassword/Verification'
import NewPassword from './components/loginProcess/forgotPassword/NewPassword'
import Success from './components/loginProcess/forgotPassword/Success'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path='/forgotpassword' element={<ForgotPassword /> }></Route>
        <Route path='/verification' element={<Verification /> }></Route>
        <Route path='/newpassword' element={<NewPassword /> }></Route>
        <Route path='/success' element={<Success /> }></Route>

        </Routes>
        </BrowserRouter>

  )
}

export default App
