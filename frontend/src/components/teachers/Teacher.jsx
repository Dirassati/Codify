import { Outlet, useNavigate } from 'react-router-dom'
import './teacher.css'
import TeacherSideBar from './TeacherSideBar'
import { useState } from 'react';

function Teacher() {
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  function handleLogout() {
    navigate('/');
    //handle logout request
  }

  const toggleLogout=()=>{
    setShowLogoutConfirmation(true);
  }

  return (
    <div className='tteacher'>

      <div className="sidebar"><TeacherSideBar logout={toggleLogout}/></div>
      <div className="page" style={{ backgroundColor: "#f5f7ff" }}>

        <Outlet />
      </div>

      {
        showLogoutConfirmation
        &&
        <div className="logout-confirmation">
          <p>Vous vouliez vraiment déconnecter de ce compte </p>
          <div>
            <button className='confirmer' onClick={handleLogout}>déconnecter</button>
            <button className='annuler' onClick={()=>{setShowLogoutConfirmation(false)}}>annuler</button>
          </div>

        </div>
      }

    </div>
  )
}

export default Teacher