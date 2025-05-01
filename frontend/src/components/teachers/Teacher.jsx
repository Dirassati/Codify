import { Outlet } from 'react-router-dom'
import './teacher.css'
import TeacherSideBar from './TeacherSideBar'

function Teacher() {
  return (
    <div className='tteacher'>
     <div className="sidebar"><TeacherSideBar /></div> 
      <div className="page" style={{backgroundColor:"#F3F4FF"}}><Outlet /></div> 
      teacher
      </div>
  )
}

export default Teacher