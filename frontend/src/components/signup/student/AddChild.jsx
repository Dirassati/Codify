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
          Thank you for your interest in joining our school. To help us assist you better, please fill out the form below with your child's  details. We look forward to supporting your child's learning journey!        </p>
      </header>



      <div style={{
            display: "flex", 
            justifyContent: "center", 
            width: "100%", 
            gap: "100px", 
            padding: "50px 300px", 
          
        }}>


            <button className="submit-btn" style={{ width: "", flexGrow: "1" ,margin:0}}  onClick={handleAddChild}>Add Child</button>
            <button  className="submit-btn" style={{ width: "", flexGrow: "1",margin:"0" }}    >Finish</button>
        </div>




     
      <Footer />
    </div>
    )
}

export default AddChild