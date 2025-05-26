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
import { usePageContext } from '../../../contexts/PageContext'
function Sidebar() {


    
const navigate=useNavigate();
const {page,setPage}=usePageContext();

    useEffect(()=>{
        if (page===1) {
            navigate('dashboard')
        }
    },[])
    return (
        <div className='side-bar'>
            <div onClick={() => { setPage(1) }} className="title">
                <img src={logo} alt="logo" />
                <h2>Dirassati</h2>
            </div>

            <div className="links">
                <Link to='dashboard' onClick={() => { setPage(1) }} className={`link ${page === 1 ? 'clicked' : ''}`}>
                    <img className='icon' src={home} alt="home" />
                    <div className="name">Dashboard</div>
                </Link>
                <Link to='Students' onClick={() => { setPage(2) }} className={`link ${page === 2 ? 'clicked' : ''}`}>
                    <SchoolIcon className='icon' />
                    <div className="name">Students</div>
                </Link>
                <Link to='Teachers' onClick={() => { setPage(3) }} className={`link ${page === 3 ? 'clicked' : ''}`}>
                    <img className='icon' src={Teacher} alt="teacher" />
                    <div className="name">Teachers</div>
                </Link>
                <Link to='Events' onClick={() => { setPage(4) }} className={`link ${page === 4 ? 'clicked' : ''}`}>
                    <img className='icon' src={event} alt="event" />
                    <div className="name">Events</div>
                </Link>
                <Link to='Finance' onClick={() => { setPage(5) }} className={`link ${page === 5 ? 'clicked' : ''}`}>
                    <img className='icon' src={finance} alt="finance" />
                    <div className="name">Finance</div>
                </Link>
                <Link to='Food' onClick={() => { setPage(6) }} className={`link ${page === 6 ? 'clicked' : ''}`}>
                    <img className='icon' src={food} alt="food" />
                    <div className="name">Food</div>
                </Link>
                <Link to='Users' onClick={() => { setPage(7) }} className={`link ${page === 7 ? 'clicked' : ''}`}>
                    <img className='icon' src={user} alt="user" />
                    <div className="name">Users</div>
                </Link>
                <Link to='Groupes' onClick={() => { setPage(8) }} className={`link ${page === 8 ? 'clicked' : ''}`}>
                    <img className='icon' src={user} alt="user" />
                    <div className="name">Groupes</div>
                </Link>
                <Link to='LatestActivities' onClick={() => { setPage(9) }} className={`link ${page === 9 ? 'clicked' : ''}`}>
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