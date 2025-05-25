
import './parent.css'
import ParentSideBar from './ParentSideBar'

import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Parent() {
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
    <div className="parent-layout">
      <div className="sidebar">
        <ParentSideBar logout={toggleLogout}/>
      </div>

      <div className="page" >
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

export default Parent