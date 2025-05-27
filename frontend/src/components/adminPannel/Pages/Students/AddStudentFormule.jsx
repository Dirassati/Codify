import './addstudentformule.css'
import Header from '../Header/Header'
import { useState, useRef, useEffect } from 'react';

import uploadIcon from '../../../../assets/icons/upload-pdf-icon.svg'

import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';

function AddStudentFormule() {


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  const [proofOfResidenceFile, setProofOfResidenceFile] = useState(null);
  const [previousSchoolRecords, setPreviousSchoolRecords] = useState(null);
  const [immunizationRecords, setImmunizationRecords] = useState(null);
  const [message, setMessage] = useState("");
  const [parentExist, setParentExist] = useState(true);
  const [addChild, setAddChild] = useState(false);
  const [parentCardId, setParentCardId] = useState("");
  const [parentData, setParentData] = useState({
    parent_id: 0,
    parent_firstName: "",
    parent_lastName: "",
  });



  const [parentInfo, setParentInfo] = useState({
    parent_firstName: "",
    parent_lastName: "",
    parent_phone: "",
    parent_email: "",
    parent_address: "",
    parent_profession: "",
    parent_status: "",
    payment_methode: "",
  });

  const [studentInfo, setStudentInfo] = useState({
    student_firstName: "",
    student_date: "",
    student_lastName: "",
    student_address: "",
    student_degree: "",
    student_bloodType: "",
    student_gender: "",
    student_placeOfBirth: "",
    student_dateOfBirth: "",
    student_chronicIllness: "",
    student_allergies: "",
    student_photo: null,
    student_birthCertificateFile: null,
    student_proofOfResidenceFile: null,
    student_previousSchoolRecords: null,
    student_immunizationRecords: null,
  });

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);

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






  const handleChange = (e) => {

    if (e.target.name.includes("parent")) {
      setParentInfo({ ...parentInfo, [e.target.name]: e.target.value });
    }

    else {
      setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
    }






  }



  const handleFileChange = (e) => {
    const name = e.target.getAttribute("name");

    const file = e.target.files[0];


    if (file && file.type === 'application/pdf') {
      setStudentInfo(prev => ({ ...prev, [name]: file }));
    } else {
      console.log('Please select a PDF file.');
    }


  };




  const handleClick = (e) => {
    const name = e.target.getAttribute("name");


    if (name === "birthCertificateFile") {
      fileInputRef1.current.click();
    }
    else if (name === "proofOfResidenceFile") {
      fileInputRef2.current.click();
    }
    else if (name === "previousSchoolRecords") {
      fileInputRef3.current.click();
    }
    else if (name === "student_photo") {
      fileInputRef5.current.click();
    }
    else {
      fileInputRef4.current.click();
    }


  }

  async function createParentAcc(e) {
    e.preventDefault();
    setParentExist(true);
    setIsLoading(true);
    try {

      //   const response = await axios.post("http://localhost:5000/api/inscription/parent", parentInfo);

      //   console.log(response.data);//supposing data is parent id

      //  //get parent
      //   try {
      //     const res = await axios.get(`http://localhost:5000/api/inscription/parents/${response.data}`);
      //     console.log(res.data);
      //     setParentData(response.data);//// changble according to backend
      //   } catch (error) {
      //     console.error(err);
      //   setMessage(err.response?.data?.message || "adding parent  failed");
      //   console.log(err.response?.data?.message || "adding parent  failed")
      //   }
      setIsLoading(false);


    }
    catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "adding parent  failed");
      console.log(err.response?.data?.message || "adding parent  failed")
    }
  }

  function getTodayAsText() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }



  async function createStudentAcc() {
    console.log(studentInfo);
    console.log(parentInfo);
    setIsLoading(true);

    const birthDate = new Date(studentInfo.student_dateOfBirth);
    const datePart = birthDate.toISOString().split("T")[0].replace(/-/g, "");
    const randomPart = String(Math.floor(Math.random() * 1000)).padStart(
      3,
      "0"
    );
    const matricule = `${datePart}${randomPart}`;
    const fakeEmail = `${student.student_last_name.toLowerCase()}${matricule}@dirassati.com`;
    const passwordEleve = Array.from({ length: 12 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]".charAt(
        Math.floor(Math.random() * 88)
      )
    ).join("");

    const formData = new FormData();
    formData.append("student_last_name", studentInfo.student_lastName);
    formData.append("student_first_name", studentInfo.student_firstName);
    formData.append("student_grade", studentInfo.student_degree);
    formData.append("student_gender", studentInfo.student_gender);
    formData.append("student_nationality", studentInfo.student_placeOfBirth);
    formData.append("student_birth_date", studentInfo.student_dateOfBirth);
    formData.append("student_blood_type", studentInfo.student_bloodType);
    formData.append("student_allergies", studentInfo.student_allergies);
    formData.append("student_chronic_illnesses", studentInfo.student_chronicIllness);


    // if (!studentInfo.birthCertificateFile || !studentInfo.proofOfResidenceFile || !studentInfo.previousSchoolRecords || !studentInfo.immunizationRecords) {
    //   setError("fill the required fields")
    // }

    // else {
    //   formData.append("birth_certificate", studentInfo.birthCertificateFile);
    //   formData.append("residence_proof", studentInfo.proofOfResidenceFile);
    //   formData.append("previous_school_records", studentInfo.previousSchoolRecords);
    //   formData.append("immunization_records", studentInfo.immunizationRecords);

    // }

    setAddChild(false);

    try {

      const date = getTodayAsText();
      const res = await axios.post(`http://localhost:5000/api/register`, {
        email: fakeEmail,
        password: passwordEleve,
        matricule: matricule,
        user_role: 'eleve',
        last_name: formData.student_last_name,
        first_name: formData.student_first_name,
        address: studentInfo.student_address,
        grade: studentInfo.student_degree,
        gender: studentInfo.gender,
        nationality: studentInfo.student_address,
        birth_date: studentInfo.student_dateOfBirth,
        blood_type: studentInfo.student_bloodType,
        allergies: studentInfo.student_allergies,
        chronic_illnesses: studentInfo.student_chronicIllness,
        date_inscription: date,
        parent_id: parentData.parent_id,

      },
        {
          headers: { "Content-Type": "multipart/form-data", }
        },
      );

      console.log(res.data);
      navigate('/addchild')

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "adding student failed failed");
      console.log(err.response?.data?.message || "adding student failed failed")
    }
    finally {
      setIsLoading(false);
    }



    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
  }



  function getParentData(e) {
    e.preventDefault();


    if (!parentData.parent_firstName) {
      if (parentCardId) {
        //http request output=parentData
        setAddChild(true);
      }
      else {
        alert("FILL the fields")
      }

    }
    else {
      console.log("parent data already here");
      setAddChild(true);
    }
  }


  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading  data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='add-student'  >
      <Header title="Add New Student" />

      <div className="forms-container" >
        <div className="inscription-card">
          <div className="top">Parent Details</div>

          <div className="form-container">

            {
              parentExist
                ?

                <div>
                  <form >
                    {
                      !parentData.parent_firstName
                      &&
                      <div className='input-container'>
                        <label>Enter Card Id if parent Account exist *</label>
                        <input type="text" name="parent_card_id" placeholder="Enter Card Id" required onChange={(e) => { setParentCardId(e.target.value) }} />
                      </div>
                    }

                    {
                      parentData.parent_firstName
                      &&
                      <div className='input-container'>
                        <label>First Name *</label>
                        <input type="text" name="parent_firstName" value={parentData.parent_firstName} placeholder="Enter First Name" required />
                      </div>
                    }
                    {
                      parentData.parent_lastName
                      &&
                      <div className='input-container'>
                        <label>Last Name *</label>
                        <input type="text" name="lastName" value={parentData.parent_lastName} placeholder="Enter Last Name" required />
                      </div>
                    }




                  </form>
                  <div className="btns">
                    <button className='submit' onClick={getParentData}>Next</button>
                    <button className='cancel' onClick={() => {
                      setParentExist(false);
                      setAddChild(false)
                    }}>  Create Parent account</button>
                  </div>
                </div>
                :
                <div>

                  <form >


                    <div className='input-container'>
                      <label>First Name *</label>
                      <input type="text" name="parent_firstName" placeholder="Enter First Name" required onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                      <label>Last Name *</label>
                      <input type="text" name="parent_lastName" placeholder="Enter Last Name" required onChange={handleChange} />
                    </div>

                    <div className='input-container'>
                      <label htmlFor="email">Email </label>
                      <input type="text" name="parent_email" placeholder='Enter the email' />
                    </div>

                    <div className='input-container'>
                      <label htmlFor="phone">Phone </label>
                      <input type="text" name="parent_phone" placeholder='Enter the phone number' />
                    </div>

                    <div className='input-container'>
                      <label>Profession</label>
                      <input type="text" name="parent_profession" placeholder="Enter the profession" required onChange={handleChange} />
                    </div>



                    <div className='input-container'>
                      <label htmlFor="status">Status </label>
                      <select name="parent_status" required onChange={handleChange}>
                        <option value="">Select Civil Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>



                    <div className='input-container'>
                      <label>Address *</label>
                      <textarea type="text" name="parent_adress" rows="10" cols="50" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " className='adress' required onChange={handleChange} />
                    </div>

                    <div className='input-container'>
                      <label htmlFor="payment">Payment </label>
                      <div>
                        <input type="radio" name="payment_methode" value="cash" /> Cash
                        <input type="radio" name="payment_methode" value="card" /> Card
                        <input type="radio" name="payment_methode" value="card" /> Later
                      </div>




                    </div>








                  </form>
                  <div className="btns">
                    <button className='cancel' >  Cancel</button>
                    <button className='submit' onClick={createParentAcc}> Create</button>
                  </div>

                </div>
            }


          </div>
        </div>

        {
          addChild
          &&
          <div>
            <div className="inscription-card">
              <div className="top">Student Details</div>

              <div className="form-container">
                <div className="form">
                  <div className='photo-container'>
                    <label htmlFor="photo">add Photo</label>
                    <input type="file" name="student_photo" ref={fileInputRef5} onChange={handleFileChange} style={{ display: "none" }} />


                    <div className="photo-input" name="student_photo" onClick={handleClick}></div>
                  </div>
                  <form>



                    <div className='input-container'>
                      <label>First Name *</label>
                      <input type="text" name="student_firstName" placeholder="Enter First Name" required onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                      <label>Last Name *</label>
                      <input type="text" name="student_lastName" placeholder="Enter Last Name" required onChange={handleChange} />
                    </div>

                    <div className='input-container'>
                      <label>Place of birth *</label>
                      <input type="text" name="student_adress" placeholder="Enter Phone Number" required onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                      <label>Date of birth *</label>
                      <input type="text" name="student_dateOfBirth" placeholder="Enter Phone Number" required onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                      <label for="degree">Degree </label>
                      <input type="text" name="student_degree" placeholder='Enter the degree' onChange={handleChange} />
                    </div>

                    <div className='input-container'>
                      <label htmlFor="gender">Gender </label>
                      <select name="student_gender" required onChange={handleChange}>
                        <option value="">Select Civil Status</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>

                      </select>
                    </div>

                    <div className='input-container'>
                      <label htmlFor="nationality">Nationality </label>
                      <input type="text" name="student_nationality" placeholder='Enter nationality' />
                    </div>

                    <div className='input-container'>
                      <label>Blood Type</label>
                      <input type="text" name="student_bloodType" placeholder="Enter Blood type" required onChange={handleChange} />
                    </div>

                    <div className='input-container' >
                      <label>Chronic illness</label>
                      <input type="text" name="student_chronicIllness" placeholder="Enter any chronic illnisses you have" onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                      <label>Allergies </label>
                      <input type="text" name="student_allergies" placeholder="Enter any kind of allergies you have" onChange={handleChange} />
                    </div>




                    <div className='input-container'>
                      <label> Birth certificate</label>

                      <input style={{ display: "none" }} ref={fileInputRef1} name='student_birthCertificateFile' type="file" accept="application/pdf" onChange={handleFileChange} />

                      <div

                        className="upload-input"
                      >
                        <p

                        >{studentInfo.student_birthCertificateFile ? studentInfo.student_birthCertificateFile.name : "Upload Birth certificate"}</p>
                        <button
                          type='button'

                          onClick={handleClick}
                        >
                          <img name='birthCertificateFile' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
                      </div>

                    </div>

                    <div className='input-container'>
                      <label>Proof of residence</label>

                      <input style={{ display: "none" }} ref={fileInputRef2} name='student_proofOfResidenceFile' type="file" accept="application/pdf" onChange={handleFileChange} />

                      <div

                        className="upload-input"
                      >
                        <p

                        >{studentInfo.student_proofOfResidenceFile ? studentInfo.student_proofOfResidenceFile.name : "Upload Proof of residence"}</p>
                        <button
                          type='button'

                          onClick={handleClick}
                        >
                          <img name='proofOfResidenceFile' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
                      </div>

                    </div>

                    <div className='input-container'>
                      <label>Previous school records</label>

                      <input style={{ display: "none" }} ref={fileInputRef3} name='student_previousSchoolRecords' type="file" accept="application/pdf" onChange={handleFileChange} />

                      <div

                        className="upload-input"
                      >
                        <p

                        >{studentInfo.student_previousSchoolRecords ? studentInfo.student_previousSchoolRecords.name : "Upload Previous school records"}</p>
                        <button
                          type='button'

                          onClick={handleClick}
                        >
                          <img name='previousSchoolRecords' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
                      </div>

                    </div>

                    <div className='input-container'>
                      <label> Immunization Records ( For First Grade )</label>

                      <input style={{ display: "none" }} ref={fileInputRef4} name='student_immunizationRecords' type="file" accept="application/pdf" onChange={handleFileChange} />

                      <div
                        className="upload-input"

                      >
                        <p

                        >{studentInfo.student_immunizationRecords ? studentInfo.student_immunizationRecords.name : "Upload Immunization Records "}</p>
                        <button
                          type='button'

                          onClick={handleClick}
                        >
                          <img name='immunizationRecords' src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
                      </div>

                    </div>

                    <div className='input-container'>
                      <label>Address *</label>
                      <textarea type="text" name="student_address" rows="10" cols="50" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " className='adress' required onChange={handleChange} />
                    </div>

                  </form>
                </div>

              </div>
            </div>

            <div className="btns">
              <button className='cancel' >  Cancel</button>
              <button className='submit' onClick={createStudentAcc}>{isLoading ? <CircularProgress /> : "Submit"}</button>
            </div>
          </div>
        }




      </div>


    </div>
  )
}

export default AddStudentFormule