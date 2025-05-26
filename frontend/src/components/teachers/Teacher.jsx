import { Outlet, useNavigate } from 'react-router-dom'
import './teacher.css'
import TeacherSideBar from './TeacherSideBar'
import { useState } from 'react';
import { handleLogout } from '../../functions/Logout.jsx';
import { useAuth } from '../../contexts/AuthContext';

function Teacher() {
  const navigate = useNavigate();
  const {setUser}=useAuth();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  function handlleLogout() {
    handleLogout(setUser,navigate);
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
            <button className='confirmer' onClick={handlleLogout}>déconnecter</button>
            <button className='annuler' onClick={()=>{setShowLogoutConfirmation(false)}}>annuler</button>
          </div>
        </div>
      }

    </div>
  )
}

export default Teacher