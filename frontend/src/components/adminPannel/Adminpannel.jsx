import { Outlet } from 'react-router-dom'
import './adminpannel.css'
import Sidebar from './SideBar/Sidebar'
import Header from './Pages/Header/Header'
import { useState } from 'react'

function Adminpannel() {



  return (
    <div className='admin-pannel'>
     <div><Sidebar /></div> 
    <div className='page'><Outlet /></div>  
    </div>
  )
}

export default Adminpannel