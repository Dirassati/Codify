import './dashboard.css'
import Header from '../Header/Header'
import studentIcon from '../../../../assets/icons/student-icon.svg'
import teacherIcon from '../../../../assets/icons/teacher-icon.svg'
import eventIcon from '../../../../assets/icons/event-icon.svg'
import schoolperformance from '../../../../assets/images/schoolperformance.svg'
import schoolfinance from '../../../../assets/images/schoolfinance.svg'
import schoolcalendar from '../../../../assets/images/schoolcalendar.svg'
import unpaiedstudents from '../../../../assets/images/unpaidstudent.svg'
import { useNavigate } from 'react-router-dom'
import { usePageContext } from '../../../../contexts/PageContext'
import { useAuth } from "../../../../contexts/AuthContext";

function Dashboard() {
const navigate=useNavigate();
const {setPage}=usePageContext();

 //const { user } = useAuth()
 // <Header title="Dashboard"  name={user.id}/>


  return (
    <div className='dashboard'>
    
     
      <Header title="Dashboard" />
      <div className="dashboard-container">
        <div className="left-bar">

          <div className="school-data">
            <div className="item student">
              <div className="icon">
                <img src={studentIcon} alt="student icon" />

              </div>
              <div>
                <h5> Students</h5>
                <p>625</p>
              </div>
            </div>
            <div className="item teacher">
              <div className="icon">
                <img src={teacherIcon} alt="teacher icon" />

              </div>
              <div>
                <h5>Teachers</h5>
                <p>36</p>
              </div>
            </div>
            <div className="item event">
              <div className="icon">
                <img src={eventIcon} alt="event icon" />

              </div>
              <div>
                <h5>Events</h5>
                <p>20</p>
              </div>
            </div>
          </div>


<div className=" charts chart school-performance" onClick={()=>{navigate('/adminpannel/Finance');setPage(5)}}>
  <img src={schoolperformance} alt="school performance chart" />
</div>

<div className="charts school-calendar-finance">
  <div className='chart'>
    <img src={schoolfinance} alt="school finance chart" />
  </div>
  <div className='chart'>
    <img src={schoolcalendar} alt="school calendar" />
  </div>
</div>

<div className=" charts chart school-performance" onClick={()=>{navigate('/adminpannel/Finance');setPage(5)}} >
  <img src={unpaiedstudents} alt="school performance chart" />
</div>
        </div>

   
      </div>
    </div>
  )
}

export default Dashboard