import { useEffect, useState } from 'react'
import './teachersidebar.css'
import HomeFilledIcon from '@mui/icons-material/Home';
import ManIcon from '@mui/icons-material/Man';
import ClassIcon from '@mui/icons-material/Class';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import LogoutIcon from '@mui/icons-material/Logout';


import logo from '../../assets/images/logoo1.svg'

import { Link } from 'react-router-dom'
import { usePageContext } from '../../contexts/PageContext';

function TeacherSideBar(props) {

  
    const {page,setPage}=usePageContext();

    const toggleLogout = () => {
        setShowLogout(true);
    }

 
    return (
        <div >
            <div className='side-bar teacher'>
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>DIRASSATI</h2>
                </div>

                <div className="links">
                    <Link to='Dashboard' onClick={() => { setPage(1) }} className={`link ${page === 1 ? 'clicked' : ''}`}>
                        <HomeFilledIcon className='icon' />
                        <div className="name">Dashboard</div>
                    </Link>
                    <Link to='Students' onClick={() => { setPage(2) }} className={`link ${page === 2 ? 'clicked' : ''}`}>
                        <ManIcon className='icon' />
                        <div className="name">Students</div>
                    </Link>
                    <Link to='Classes' onClick={() => { setPage(3) }} className={`link ${page === 3 ? 'clicked' : ''}`}>
                        <ClassIcon className='icon' />
                        <div className="name">Classes</div>
                    </Link>
                    <Link to='Homework' onClick={() => { setPage(4) }} className={`link ${page === 4 ? 'clicked' : ''}`}>
                        <ContentPasteIcon className='icon' />
                        <div className="name">Home Work</div>
                    </Link>
                    <Link to='Courses' onClick={() => { setPage(5) }} className={`link ${page === 5 ? 'clicked' : ''}`}>
                        <AutoStoriesIcon className='icon' />
                        <div className="name">Courses</div>
                    </Link>
                    <Link to='Notes' onClick={() => { setPage(6) }} className={`link ${page === 6 ? 'clicked' : ''}`}>
                        <EventNoteIcon className='icon' />
                        <div className="name">Notes</div>
                    </Link>
                    <Link to='Events' onClick={() => { setPage(7) }} className={`link ${page === 7 ? 'clicked' : ''}`}>
                        <EventAvailableIcon className='icon' />
                        <div className="name">Events</div>
                    </Link>

                    <button className={`link logout ${page === 8 ? 'clicked' : ''}`} onClick={props.logout}>
                        <LogoutIcon className='icon' />
                        <div className="name">Log Out</div>

                    </button>
                </div>



            </div>

        </div>
    )
}

export default TeacherSideBar