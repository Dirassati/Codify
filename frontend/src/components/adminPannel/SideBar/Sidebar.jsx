import './sidebar.css'
import logo from '../../../assets/images/logo.svg'
import { useEffect, useState } from 'react'
import home from '../../../assets/icons/home.svg'
import activity from '../../../assets/icons/activity.svg'
import event from '../../../assets/icons/event.svg'
import food from '../../../assets/icons/food.svg'
import student from '../../../assets/icons/student.svg'
import Teacher from '../../../assets/icons/Teacher.svg'
import finance from '../../../assets/icons/finance.svg'
import user from '../../../assets/icons/user.svg'
import SchoolIcon from '@mui/icons-material/School';
import {Link, Navigate, useNavigate} from 'react-router-dom'
function Sidebar() {


    const [index, setIndex] = useState(1);
const navigate=useNavigate();

    useEffect(()=>{
        if (index===1) {
            navigate('dashboard')
        }
    },[])
    return (
        <div className='side-bar'>
            <div onClick={() => { setIndex(1) }} className="title">
                <img src={logo} alt="logo" />
                <h2>Dirassati</h2>
            </div>

            <div className="links">
                <Link to='dashboard' onClick={() => { setIndex(1) }} className={`link ${index === 1 ? 'clicked' : ''}`}>
                    <img className='icon' src={home} alt="home" />
                    <div className="name">Dashboard</div>
                </Link>
                <Link to='Students' onClick={() => { setIndex(2) }} className={`link ${index === 2 ? 'clicked' : ''}`}>
                    <SchoolIcon className='icon' />
                    <div className="name">Students</div>
                </Link>
                <Link to='Teachers' onClick={() => { setIndex(3) }} className={`link ${index === 3 ? 'clicked' : ''}`}>
                    <img className='icon' src={Teacher} alt="teacher" />
                    <div className="name">Teachers</div>
                </Link>
                <Link to='Events' onClick={() => { setIndex(4) }} className={`link ${index === 4 ? 'clicked' : ''}`}>
                    <img className='icon' src={event} alt="event" />
                    <div className="name">Events</div>
                </Link>
                <Link to='Finance' onClick={() => { setIndex(5) }} className={`link ${index === 5 ? 'clicked' : ''}`}>
                    <img className='icon' src={finance} alt="finance" />
                    <div className="name">Finance</div>
                </Link>
                <Link to='Food' onClick={() => { setIndex(6) }} className={`link ${index === 6 ? 'clicked' : ''}`}>
                    <img className='icon' src={food} alt="food" />
                    <div className="name">Food</div>
                </Link>
                <Link to='Users' onClick={() => { setIndex(7) }} className={`link ${index === 7 ? 'clicked' : ''}`}>
                    <img className='icon' src={user} alt="user" />
                    <div className="name">Users</div>
                </Link>
                <Link to='Groupes' onClick={() => { setIndex(8) }} className={`link ${index === 8 ? 'clicked' : ''}`}>
                    <img className='icon' src={user} alt="user" />
                    <div className="name">Groupes</div>
                </Link>
                <Link to='LatestActivities' onClick={() => { setIndex(9) }} className={`link ${index === 9 ? 'clicked' : ''}`}>
                    <img className='icon' src={activity} alt="activity" />
                    <div className="name">Gradebook</div>
                </Link>
            </div>

            <div className="footer">
                <h5>Akademi - School Admission Dashboard</h5>
                <p>Made with <span>♥</span>  by Peterdraw</p>
            </div>
        </div>
    )
}

export default Sidebar