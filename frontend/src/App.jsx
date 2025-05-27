import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Login from './components/loginProcess/login/Login'

import ForgotPassword from './components/loginProcess/forgotPassword/ForgotPassword'
import Verification from './components/loginProcess/forgotPassword/Verification'
import NewPassword from './components/loginProcess/forgotPassword/NewPassword'
import Success from './components/loginProcess/forgotPassword/Success'
import Adminpannel from './components/adminPannel/Adminpannel'
import Parent from './components/parents/Parent'
import Teacher from './components/teachers/Teacher'
import Student from './components/etudiants/Student'
import Homes from './components/etudiants/Home/Std_Home'
import Subjects from './components/etudiants/Subjects/Subjects'
import Notes_std from './components/etudiants/Notes/Notes'
import Profile from './components/etudiants/Profile/Profile'



import Sparent from './components/signup/parent/Sparent'
import Sstudent from './components/signup/student/Sstudent'
import Dashboard from './components/adminPannel/Pages/Dashboard/Dashboard'

import Students from './components/adminPannel/Pages/Students/Students'
import Teachers from './components/adminPannel/Pages/Teachers/Teachers'
import Finance from './components/adminPannel/Pages/Finance/Finance'
import Users from './components/adminPannel/Pages/User/Users'
import Groupes from './components/adminPannel/Pages/Groupes/Groupes'
import Activities from './components/adminPannel/Pages/Activity/Activities'
import AddChild from './components/signup/student/AddChild'

import AddStudentFormule from './components/adminPannel/Pages/Students/AddStudentFormule'
import StudentCard from './components/adminPannel/Pages/Students/StudentCard'

import NewTeachers from './components/adminPannel/Pages/Teachers/NewTeachers'
import Dashboardd from './components/teachers/pages/dashboard/Dashboardd'
import Studentss from './components/teachers/pages/students/Studentss'
import Classe from './components/teachers/pages/classes/Classe'
import Homework from './components/teachers/pages/homework/Homework'
import Courses from './components/teachers/pages/courses/Courses'
import Notes from './components/teachers/pages/notes/Notes'
import Eventss from './components/teachers/pages/events/Eventss'
import AllClasses from './components/teachers/pages/classes/AllClasses'
import Payment from './components/parents/payment/Payment';
import PForm from './components/parents/payment/PForm';
import PaymentSummary from './components/parents/payment/PaymentSummary';
import SuccessPayment from './components/parents/payment/SuccessPayment';
import ParentHome from './components/parents/home/ParentHome'

import ParentProfile from './components/parents/profile/ParentProfile'
import Reregistration from './components/parents/reregistration/Reregistration'
import ParentAddChild from './components/parents/addChild/ParentAddChild'
import Notifications from './components/parents/notifications/Notifications'
import AllAbsences from './components/adminPannel/Pages/Events/AllAbsences'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signupParent' element={<Sparent />}></Route>
        <Route path='/signupStudent' element={<Sstudent />}></Route>
        <Route path='/addchild?' element={<AddChild />}></Route>

        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/verification' element={<Verification />}></Route>
        <Route path='/newpassword' element={<NewPassword />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/adminpannel' element={<Adminpannel />}>
          <Route path='Dashboard' element={<Dashboard />}></Route>
          <Route path='Students' element={<Students />}></Route>

          <Route path='NewStudent' element={<AddStudentFormule />}></Route>
          <Route path='Studentcard' element={<StudentCard />}></Route>


          <Route path='Teachers'>
            <Route index element={<Teachers />} />
            <Route path='add' element={<NewTeachers />} />
          </Route>
          <Route path='Teachers/add' element={<NewTeachers />} />

          <Route path='Absences' element={<AllAbsences />}></Route>
          <Route path='Finance' element={<Finance />}></Route>
          <Route path='Users' element={<Users />}></Route>
          <Route path='Groupes' element={<Groupes />}></Route>
          <Route path='LatestActivities' element={<Activities />}></Route>

        </Route>


        <Route path='/student' element={<Student />}>
          <Route path='Home' element={< Homes />} />
          <Route path='Subjects' element={< Subjects />} />
          <Route path='Notes' element={< Notes_std />} />
          <Route path='Profile' element={< Profile />} />
        </Route>


        <Route path='/parent' element={<Parent />}>
          <Route path='Home' element={< ParentHome />} />
          <Route path='Re-registartion' element={< Reregistration />} />
          <Route path='Profile' element={< ParentProfile />} />
          <Route path='AddChildFormule' element={<ParentAddChild />} />
          <Route path='Notifications' element={<Notifications />} />
          <Route path="payment" element={<Payment />} />

          <Route path="payment/Success" element={<SuccessPayment />} />
          <Route path="payment/summary" element={<PaymentSummary />} />
          <Route path="payment/Form" element={<PForm />} />

        </Route>


        <Route path='/student' element={<Student />}>
          <Route path='Home' element={< Homes />} />
          <Route path='Subjects' element={< Subjects />} />
          <Route path='Notes' element={< Notes_std />} />
          <Route path='Profile' element={< Profile />} />
        </Route>


        <Route path='/teacher' element={<Teacher />}>
          <Route path='Dashboard' element={<Dashboardd />} />
          <Route path='Students' element={<Studentss />} />
          <Route path='Classes' element={<AllClasses />} />
          <Route path='Classe/:id' element={<Classe />} />
          <Route path='Homework' element={<Homework />} />
          <Route path='Courses' element={<Courses />} />
          <Route path='Notes' element={<Notes />} />
          <Route path='Events' element={<Eventss />} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App
