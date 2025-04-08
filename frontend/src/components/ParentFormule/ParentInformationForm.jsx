import React, { useState } from "react";
import Footer from "../../pages/homepage/Footer";
import "./ParentInformationForm.css";

const ParentInformationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    cardId: "",
    civilStatus: "",
    profession: "",
    childrenCount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Holder">
      <header className="header">
        <div className="logoparent">
        <img src="https://s3-alpha-sig.figma.com/img/11bc/093a/92d750e62fdfd689b8caa25a050e5c6d?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pLFHbyp2Vjg~9v6iOKKKj0kMDH01L74XuF2pXKdJZd5nh9NvWq4YHH5r2qMOJ8tMph4CTGDxiEDTZzOjdB0fZXZpHcWlC3UFrRoUMBz5DLJXzrhxg6asIjLWF06~rAv7SY-eHay~skbuimAzGoz~496hw8V1XZt~zbZc4iGjnn7jIv8K8JCSm2avCHK-1y82MdGA4O~a6f8jghyKFzkzuai25m7bjCcAwuuT-Vo0htaAcX0250fIyY7~ZZkooLFQWxIOAswkSkj5Cnj-9UW-3DvdkwhbmPep1J0SrdlYJWoV8IQarXOCB~O5OZ8~WWX-KT3dqnq86siW89MNTCuf6Q__" alt="Dirassati Logo" />
        <h3>Dirasati</h3>
        </div>
        
        <h1>Parent Information</h1>
        <p className="intro-text">
        Welcome to our school!
<br /> <br />
Thank you for your interest in joining our school. To help us assist you better, please fill out the form <br /> below with your details. We look forward to supporting your child's learning journey!
        </p>
      </header>

      <form className="form-container">
        <div className="form-group">
          <label>First Name <span>*</span></label>
          <input type="text" name="firstName" placeholder="Enter First Name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name <span>*</span></label>
          <input type="text" name="lastName" placeholder="Enter Last Name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number <span>*</span></label>
          <input type="tel" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email Address <span>*</span></label>
          <input type="email" name="email" placeholder="Enter Email Address" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Card ID <span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter Card ID" required onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
  <label for="civilStatus">Civil Status <span>*</span></label>
  <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
    <option value="">Select Civil Status</option>
    <option value="single">Single</option>
    <option value="married">Married</option>
    <option value="divorced">Divorced</option>
    <option value="widowed">Widowed</option>
  </select>
</div>

        <div className="form-group">
          <label>Profession <span>*</span></label>
          <input type="text" name="profession" placeholder="Enter Profession" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Number of children you want to enroll <span>*</span></label>
          <input type="number" name="childrenCount" placeholder="Enter Number" required onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <Footer />
    </div>
  );
};

export default ParentInformationForm;
