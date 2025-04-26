import { useEffect, useState } from 'react'
import './teachersidebar.css'
import HomeFilledIcon from '@mui/icons-material/Home';
import ManIcon from '@mui/icons-material/Man';
import ClassIcon from '@mui/icons-material/Class';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import logo from '../../assets/images/logoo1.svg'

import { Link } from 'react-router-dom'

function TeacherSideBar() {

    const [index, setIndex] = useState(1);

    useEffect(()=>{
        setIndex(0);
    },[true])
    return (
        <div className='side-bar teacher'>
            <div className="title">
                <img src={logo} alt="" />
                <h2>DIRASSATI</h2>
            </div>

            <div className="links">
                <Link to='Dashboard' onClick={() => { setIndex(1) }} className={`link ${index === 1 ? 'clicked' : ''}`}>
                    <HomeFilledIcon className='icon'/>
                    <div className="name">Dashboard</div>
                </Link>
                <Link to='Students' onClick={() => { setIndex(2) }} className={`link ${index === 2 ? 'clicked' : ''}`}>
                    <ManIcon className='icon'/>
                    <div className="name">Students</div>
                </Link>
                <Link to='Classes' onClick={() => { setIndex(3) }} className={`link ${index === 3 ? 'clicked' : ''}`}>
                    <ClassIcon className='icon'/>
                    <div className="name">Classes</div>
                </Link>
                <Link to='Homework' onClick={() => { setIndex(4) }} className={`link ${index === 4 ? 'clicked' : ''}`}>
                    <ContentPasteIcon className='icon'/>
                    <div className="name">Home Work</div>
                </Link>
                <Link to='Courses' onClick={() => { setIndex(5) }} className={`link ${index === 5 ? 'clicked' : ''}`}>
                    <AutoStoriesIcon className='icon'/>
                    <div className="name">Courses</div>
                </Link>
                <Link to='Notes' onClick={() => { setIndex(6) }} className={`link ${index === 6 ? 'clicked' : ''}`}>
                    <EventNoteIcon className='icon'/>
                    <div className="name">Notes</div>
                </Link>
                <Link to='Events' onClick={() => { setIndex(7) }} className={`link ${index === 7 ? 'clicked' : ''}`}>
                    <EventAvailableIcon className='icon'/>
                    <div className="name">Events</div>
                </Link>
                <Link to='LatestActivities' className={`link ${index === 8 ? 'clicked' : ''}`}>
                    <div className="name">Log Out</div>
                </Link>
            </div>

        </div>
    )
}

export default TeacherSideBar