import './sstudent.css'
import { useState, useRef, useEffect } from 'react';
import uploadIcon from '../../../assets/icons/upload-pdf-icon.svg'
import logo from '../../../assets/images/logo1.svg'
import Footer from "../../../pages/homepage/Footer";
import axios from 'axios'
import AddChild from './AddChild';
import { useNavigate } from 'react-router-dom';

function Sstudent() {

const navigate=useNavigate();

  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  const [proofOfResidenceFile, setProofOfResidenceFile] = useState(null);
  const [previousSchoolRecords, setPreviousSchoolRecords] = useState(null);
  const [immunizationRecords, setImmunizationRecords] = useState(null);
let day="";
let month="";
let year="";
let date ="..-..-....";


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    degree: "",
    age: "",
    bloodType: "",
    gender: "",
    placeOfBirth: "",
    dayOfBirth: "",
    monthOfBirth: "",
    fullDate:"..-..-....",
    yearOfBirth: "",
    chronicIllness: "",
    allergies: "",
    birthCertificateFile: null,
    proofOfResidenceFile: null,
    previousSchoolRecords: null,
    immunizationRecords: null,
  });

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [isRegistering, setIsRegistering] = useState(false);
  const currentYear = new Date().getFullYear();
  



  const years = [];
  const months = [];
  const days = [];

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const names = data.map(country => country.name.common);

        setCountries(names.sort());

      })
      .catch(err => console.error('Error:', err));
  }, []);



  for (let i = currentYear; i >= 1950; i--) {
    years.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }




// function generateBirthDate() {
//   const day = String(formData.dayOfBirth).padStart(2, '0');
//   const month = String(formData.monthOfBirth).padStart(2, '0');
//   const year = formData.yearOfBirth;

 
//   const date= `${day}-${month}-${year}`;
//   setFormData(prev=>({...prev,fullDate:date}))
  
// }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
     if (e.target.name === 'dayOfBirth' || e.target.name === 'monthOfBirth' || e.target.name === 'yearOfBirth') {
      if (e.target.name === 'dayOfBirth') {
        day=String(e.target.value).padStart(2, '0');
    
       date = day   + formData.fullDate.slice(2);
      }
      else if (e.target.name === 'monthOfBirth') {
        month=String(e.target.value).padStart(2, '0');
     
         date =    formData.fullDate.slice(0 ,3)+month+formData.fullDate.slice(5);
      }else{
      year=e.target.value;
      
    
       date =    formData.fullDate.slice(0,6)+year;
      }
      
       
       
  setFormData(prev=>({...prev,fullDate:date}))
       
     }



  }



  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {

      setFormData(prev => ({ ...prev, [e.target.name]: file }));

    } else {
      console.log('Please select a PDF file.');
    }

    
  };




  const handleClick = (e) => {

    if (e.target.name === "birthCertificateFile") {
      fileInputRef1.current.click();
    }
    else if (e.target.name === "proofOfResidenceFile") {
      fileInputRef2.current.click();
    }
    else if (e.target.name === "previousSchoolRecords") {
      fileInputRef3.current.click();
    }
    else {
      fileInputRef4.current.click();
    }


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

      <form className="form-container" onSubmit={(e) => {
        e.preventDefault();
      
        
        console.log(formData);
        
        navigate('/addchild?');
      }}>


        <div className="form-group">
          <label>First Name <span>*</span></label>
          <input type="text" name="firstName" placeholder="Enter First Name"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name <span>*</span></label>
          <input type="text" name="lastName" placeholder="Enter Last Name"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address <span>*</span></label>
          <input type="text" name="address" placeholder="Enter Phone Number" onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="degree">Degree <span>*</span></label>
          <select name="degree" id="civilStatus"  onChange={handleChange}>
            <option value="">Select Degree</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age<span>*</span></label>
          <input type="text" name="age" placeholder="Enter your Age"  onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="nationality">Nationality <span>*</span></label>
          <select name="nationality" id="civilStatus" style={{}} onChange={handleChange}>
            <option value="">Select Your Nationality</option>
            {countries.map((country) => (<option value={country}>{country}</option>))}



          </select>
        </div>

        <div className="form-group">
          <label>Blood Type<span>*</span></label>
          <input type="text" name="bloodType" placeholder="Enter Blood type"  onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="gender">Gender <span>*</span></label>
          <select name="gender" id="civilStatus"  onChange={handleChange}>
            <option value="">Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>


          </select>
        </div>

        <div className="form-group ">
          <label>Place of Birth<span>*</span></label>
          <input type="text" name="placeOfBirth" placeholder="Enter Place of Birth"  onChange={handleChange} />
        </div>

        <div className="form-group formgroup ">
          <label>Date of Birth<span>*</span></label>
          <div className="date-container">

            <select name="dayOfBirth" id="civilStatus" onChange={(e)=>{handleChange(e);}}>
              <option value="">Day</option>
              {
                days.map((day) => (<option value={day}>{day}</option>))
              }


            </select>

            <select name="monthOfBirth" id="civilStatus"  onChange={(e)=>{handleChange(e);}}>
              <option value="">Month</option>
              {
                months.map((month) => (<option value={month}>{month}</option>))
              }


            </select>

            <select name="yearOfBirth" id="civilStatus"  onChange={(e)=>{handleChange(e);}}>
              <option value="">Year</option>
              {
                years.map((year) => (<option value={year}>{year}</option>))
              }


            </select>

          </div>





        </div>

        <div className="form-group">
          <label> Birth certificate<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef1} name='birthCertificateFile' type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{formData.birthCertificateFile ? formData.birthCertificateFile.name : "Upload Birth certificate"}</p>
            <button
              type='button'

              onClick={handleClick}
            >
              <img name='birthCertificateFile' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Proof of residence<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef2} name='proofOfResidenceFile' type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{formData.proofOfResidenceFile ? formData.proofOfResidenceFile.name : "Upload Proof of residence"}</p>
            <button
              type='button'

              onClick={handleClick}
            >
              <img name='proofOfResidenceFile' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Previous school records<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef3} name='previousSchoolRecords' type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{formData.previousSchoolRecords ? formData.previousSchoolRecords.name : "Upload Previous school records"}</p>
            <button
              type='button'

              onClick={handleClick}
            >
              <img name='previousSchoolRecords' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label> Immunization Records ( For First Grade )<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef4} name='immunizationRecords' type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{formData.immunizationRecords ? formData.immunizationRecords.name : "Upload Immunization Records "}</p>
            <button
              type='button'

              onClick={handleClick}
            >
              <img name='immunizationRecords' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Chronic illness</label>
          <input type="text" name="chronicIllness" placeholder="Enter any chronic illnisses you have"  onChange={handleChange} />
        </div>  <div className="form-group">
          <label>Allergies </label>
          <input type="text" name="allergies" placeholder="Enter any kind of allergies you have"  onChange={handleChange} />
        </div>



        <button type='submit' className="submit-btn"  >Register</button>




      </form>
      <Footer />
    </div>




  )
}

export default Sstudent