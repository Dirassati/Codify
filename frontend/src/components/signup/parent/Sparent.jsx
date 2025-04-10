import React, { useState } from "react";
import Footer from "../../../pages/homepage/Footer";
import "./Sparent.css";
import logo from '../../../assets/images/logo1.svg'
import { useNavigate } from "react-router-dom";

const ParentInformationForm = () => {

  const navigate=useNavigate();
  const [error,setError]=useState("");
  const [parentInfo, setParentInfo] = useState({
    parent_last_name: "",
    parent_first_name: "",
    parent_phone_number: "",
    parent_card_Id: "",
    email_address: "",
    parent_profession: "",
    parent_etat_civil: "",
    number_kids: "",
  });

  const handleChange = (e) => {
    setParentInfo({ ...parentInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit=(e)=>{
    
    e.preventDefault();
  localStorage.setItem('parentId',15);
    
     
      console.log(parentInfo);
      navigate('/addchild?');
    }
    
   
  

  return (
    <div className="Holder">
      <header className="header">
        <div className="logoparent">
        <img src={logo} alt="Dirassati Logo" />
        <h3>Dirasati</h3>
        </div>
        
        <h1>Parent Information</h1>
        <p className="intro-text">
        Welcome to our school!
<br /> <br />
Thank you for your interest in joining our school. To help us assist you better, please fill out the form <br /> below with your details. We look forward to supporting your child's learning journey!
        
        
        
        
        

        </p>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
     
        <div className="form-group">
          <label>First Name <span>*</span></label>
          <input type="text" name="parent_first_name" placeholder="Enter First Name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name <span>*</span></label>
          <input type="text" name="parent_last_name" placeholder="Enter Last Name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number <span>*</span></label>
          <input type="tel" name="parent_phone_number" placeholder="Enter Phone Number" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email Address <span>*</span></label>
          <input type="email" name="email_address" placeholder="Enter Email Address" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Card ID <span>*</span></label>
          <input type="text" name="parent_card_Id" placeholder="Enter Card ID" required onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
  <label for="civilStatus">Civil Status <span>*</span></label>
  <select name="parent_etat_civil" id="civilStatus" required onChange={handleChange}>
    <option value="">Select Civil Status</option>
    <option value="single">Single</option>
    <option value="married">Married</option>
    <option value="divorced">Divorced</option>
    <option value="widowed">Widowed</option>
  </select>
</div>

        <div className="form-group">
          <label>Profession <span>*</span></label>
          <input type="text" name="parent_profession" placeholder="Enter Profession" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Number of children you want to enroll <span>*</span></label>
          <input type="number" name="number_kids" placeholder="Enter Number" required onChange={handleChange} />
        </div>
        
        <button type="submit" className="submit-btn" >Submit</button>
       

      </form>
      <Footer />
    </div>
  );
};

export default ParentInformationForm;
