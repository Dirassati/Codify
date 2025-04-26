import './dashboard.css'
import Header from '../Header/Header'
import studentIcon from '../../../../assets/icons/student-icon.svg'
import teacherIcon from '../../../../assets/icons/teacher-icon.svg'
import eventIcon from '../../../../assets/icons/event-icon.svg'
import schoolperformance from '../../../../assets/images/schoolperformance.svg'
import schoolfinance from '../../../../assets/images/schoolfinance.svg'
import schoolcalendar from '../../../../assets/images/schoolcalendar.svg'
import unpaiedstudents from '../../../../assets/images/unpaidstudent.svg'


function Dashboard() {
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


<div className=" charts school-performance">
  <img src={schoolperformance} alt="school performance chart" />
</div>

<div className="charts school-calendar-finance">
  <div >
    <img src={schoolfinance} alt="school finance chart" />
  </div>
  <div >
    <img src={schoolcalendar} alt="school calendar" />
  </div>
</div>

<div className=" charts school-performance">
  <img src={unpaiedstudents} alt="school performance chart" />
</div>
        </div>

        <div className="right-bar">


        </div>
      </div>
    </div>
  )
}

export default Dashboard