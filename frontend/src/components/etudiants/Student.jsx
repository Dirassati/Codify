import './student.css'
import StudentSideBar from './StudentSideBar'
import { Outlet } from 'react-router-dom'

function Student() {
  return (
    <div className="student-layout">
  <div className="sidebar">
    <StudentSideBar />
  </div>
  <div className="page">
    <Outlet />
  </div>
</div>
  )
}

export default Student
