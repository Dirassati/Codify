import React from 'react'

import { useState } from 'react';
import uploadIcon from '../../../assets/icons/upload-pdf-icon.svg'
import logo from '../../../assets/images/logo1.svg'
import Footer from "../../../pages/homepage/Footer";


import { useNavigate } from 'react-router-dom';


function AddChild() {
const navigate=useNavigate();

function handleAddChild() {
    navigate('/signupStudent')
}

    return (
       



 <div className="Holder">
      <header className="header">
        <div className="logoparent">
          <img src={logo} alt="Dirassati Logo" />
          <h3>Dirasati</h3>
        </div>

        <h1>Student Information</h1>
        <p className="intro-text">
          Welcome to our school!
          <br /> <br />
          Thank you for your interest in joining our school. To help us assist you better, Add Child to start registering Your child or Finish to stop for now . We look forward to supporting your child's learning journey!        
         <span style={{display:"block", color:"#3498db"}}>Note: once you choose to Finish You can come back to Add your childs when you get your parent account by mail, stay tuned</span> 
          </p>
      </header>



      <div style={{
            display: "flex", 
            justifyContent: "center", 
            width: "100%", 
            gap: "100px", 
            padding: "50px 300px", 
          
        }}>


            <button className="submit-btn" style={{ width: "", flexGrow: "1" ,margin:0}}  onClick={handleAddChild}>Add Child</button>
            <button  className="submit-btn" style={{ width: "", flexGrow: "1",margin:"0" }}   onClick={()=>{navigate('/')}} >Finish</button>
        </div>




     
      <Footer />
    </div>
    )
}

export default AddChild