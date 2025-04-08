import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Login from './components/loginProcess/login/Login'

import ForgotPassword from './components/loginProcess/forgotPassword/ForgotPassword'
import Verification from './components/loginProcess/forgotPassword/Verification'
import NewPassword from './components/loginProcess/forgotPassword/NewPassword'
import Success from './components/loginProcess/forgotPassword/Success'
import Adminpannel from './components/adminPannel/Adminpannel'
import Parent from './components/parents/Parent'
import Teacher from './components/teachers/teacher'
import Student from './components/etudiants/Student'
import Sparent from './components/signup/parent/Sparent'
import Sstudent from './components/signup/student/Sstudent'
import Dashboard from './components/adminPannel/Pages/Dashboard/Dashboard'
import Students from './components/adminPannel/Pages/Students/Students'
import Teachers from './components/adminPannel/Pages/Teachers/Teachers'
import Events from './components/adminPannel/Pages/Events/Events'
import Food from './components/adminPannel/Pages/Food/Food'
import Finance from './components/adminPannel/Pages/Finance/Finance'
import Users from './components/adminPannel/Pages/User/Users'
import Activities from './components/adminPannel/Pages/Activity/Activities'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signupParent' element={<Sparent />}></Route>
        <Route path='/signupStudent' element={<Sstudent />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/verification' element={<Verification />}></Route>
        <Route path='/newpassword' element={<NewPassword />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/adminpannel' element={<Adminpannel />}>
          <Route path='Dashboard' element={<Dashboard />}></Route>
          <Route path='Students' element={<Students />}></Route>
          <Route path='Teachers' element={<Teachers />}></Route>
          <Route path='Events' element={<Events />}></Route>
          <Route path='Food' element={<Food />}></Route>
          <Route path='Finance' element={<Finance />}></Route>
          <Route path='Users' element={<Users />}></Route>
          <Route path='LatestActivities' element={<Activities />}></Route>

        </Route>
        <Route path='/parent' element={<Parent />}></Route>
        <Route path='/student' element={<Student />}></Route>
        <Route path='/teacher' element={<Teacher />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
