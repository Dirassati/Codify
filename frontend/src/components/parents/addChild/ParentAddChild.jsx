import { useEffect, useRef, useState } from "react";
import uploadIcon from "../../../assets/icons/upload-pdf-icon.svg";
import SearchHeader from "../SearchHeader";

import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function AddChild() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  const [proofOfResidenceFile, setProofOfResidenceFile] = useState(null);
  const [previousSchoolRecords, setPreviousSchoolRecords] = useState(null);
  const [immunizationRecords, setImmunizationRecords] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    degree: "",
    bloodType: "",
    gender: "",
    placeOfBirth: "",
    dayOfBirth: "",
    monthOfBirth: "",
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

  const currentYear = new Date().getFullYear();

  const years = [];
  const months = [];
  const days = [];

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((country) => country.name.common);

        setCountries(names.sort());
      })
      .catch((err) => console.error("Error:", err));
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
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setStudentInfo((prev) => ({ ...prev, [e.target.name]: file }));
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const handleClick = (e) => {
    if (e.target.name === "birthCertificateFile") {
      fileInputRef1.current.click();
    } else if (e.target.name === "proofOfResidenceFile") {
      fileInputRef2.current.click();
    } else if (e.target.name === "previousSchoolRecords") {
      fileInputRef3.current.click();
    } else {
      fileInputRef4.current.click();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("student_last_name", studentInfo.lastName);
    formData.append("student_first_name", studentInfo.firstName);
    formData.append("student_grade", studentInfo.degree);
    formData.append("student_gender", studentInfo.gender);
    formData.append("student_nationality", studentInfo.placeOfBirth);
    formData.append(
      "student_birth_date",
      `${studentInfo.yearOfBirth}-${studentInfo.monthOfBirth}-${studentInfo.dayOfBirth}`
    );
    formData.append("student_blood_type", studentInfo.bloodType);
    formData.append("student_allergies", studentInfo.allergies);
    formData.append("student_chronic_illnesses", studentInfo.chronicIllness);

    // if (!studentInfo.birthCertificateFile || !studentInfo.proofOfResidenceFile || !studentInfo.previousSchoolRecords || !studentInfo.immunizationRecords) {
    //   setError("fill the required fields")
    // }

    // else {
    //   formData.append("birth_certificate", studentInfo.birthCertificateFile);
    //   formData.append("residence_proof", studentInfo.proofOfResidenceFile);
    //   formData.append("previous_school_records", studentInfo.previousSchoolRecords);
    //   formData.append("immunization_records", studentInfo.immunizationRecords);

    // }

    try {
      //  user.id is parent id
      const parentId = user.id;
      const res = await axios.post(
        `http://localhost:5000/api/inscription/${parentId}/students`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data);
      navigate("/parent/home");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "adding student failed failed");
      console.log(
        err.response?.data?.message || "adding student failed failed"
      );
    } finally {
      setIsLoading(false);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  }

  return (
    <div>
      <div className="search-wrappe">
        <SearchHeader />
      </div>

      <div className="Holder">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              First Name <span>*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Address <span>*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Phone Number"
              required
              onChange={handleChange}
            />
          </div>
          <div class="form-group formgroup">
            <label for="degree">
              Degree <span>*</span>
            </label>
            <select
              name="degree"
              id="civilStatus"
              required
              onChange={handleChange}
            >
              <option value="">Select Degree</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Age<span>*</span>
            </label>
            <input
              type="text"
              name="age"
              placeholder="Enter your Age"
              //       onChange=  {(e) =>{setStudentInfo({
              //   ...studentInfo,
              //   age: Number(e.target.value)
              // })}
              // }
            />
          </div>
          <div class="form-group formgroup">
            <label for="nationality">
              Nationality <span>*</span>
            </label>
            <select
              name="nationality"
              id="civilStatus"
              required
              style={{}}
              onChange={handleChange}
            >
              <option value="">Select Your Nationality</option>
              {countries.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              Blood Type<span>*</span>
            </label>
            <input
              type="text"
              name="bloodType"
              placeholder="Enter Blood type"
              required
              onChange={handleChange}
            />
          </div>
          <div class="form-group formgroup">
            <label for="gender">
              Gender <span>*</span>
            </label>
            <select
              name="gender"
              id="civilStatus"
              required
              onChange={handleChange}
            >
              <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group ">
            <label>
              Place of Birth<span>*</span>
            </label>
            <input
              type="text"
              name="placeOfBirth"
              placeholder="Enter Place of Birth"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group formgroup ">
            <label>
              Date of Birth<span>*</span>
            </label>
            <div className="date-container">
              <select
                name="dayOfBirth"
                id="civilStatus"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="">Day</option>
                {days.map((day) => (
                  <option value={day}>{day}</option>
                ))}
              </select>

              <select
                name="monthOfBirth"
                id="civilStatus"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>

              <select
                name="yearOfBirth"
                id="civilStatus"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>
              {" "}
              Birth certificate<span>*</span>
            </label>

            <input
              style={{ display: "none" }}
              ref={fileInputRef1}
              name="birthCertificateFile"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <div className="upload-btn">
              <p className="place-holder">
                {studentInfo.birthCertificateFile
                  ? studentInfo.birthCertificateFile.name
                  : "Upload Birth certificate"}
              </p>
              <button type="button" onClick={handleClick}>
                <img
                  name="birthCertificateFile"
                  src={uploadIcon}
                  alt="uploadIcon"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>
              Proof of residence<span>*</span>
            </label>

            <input
              style={{ display: "none" }}
              ref={fileInputRef2}
              name="proofOfResidenceFile"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <div className="upload-btn">
              <p className="place-holder">
                {studentInfo.proofOfResidenceFile
                  ? studentInfo.proofOfResidenceFile.name
                  : "Upload Proof of residence"}
              </p>
              <button type="button" onClick={handleClick}>
                <img
                  name="proofOfResidenceFile"
                  src={uploadIcon}
                  alt="uploadIcon"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>
              Previous school records<span>*</span>
            </label>

            <input
              style={{ display: "none" }}
              ref={fileInputRef3}
              name="previousSchoolRecords"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <div className="upload-btn">
              <p className="place-holder">
                {studentInfo.previousSchoolRecords
                  ? studentInfo.previousSchoolRecords.name
                  : "Upload Previous school records"}
              </p>
              <button type="button" onClick={handleClick}>
                <img
                  name="previousSchoolRecords"
                  src={uploadIcon}
                  alt="uploadIcon"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>
              {" "}
              Immunization Records ( For First Grade )<span>*</span>
            </label>

            <input
              style={{ display: "none" }}
              ref={fileInputRef4}
              name="immunizationRecords"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <div className="upload-btn">
              <p className="place-holder">
                {studentInfo.immunizationRecords
                  ? studentInfo.immunizationRecords.name
                  : "Upload Immunization Records "}
              </p>
              <button type="button" onClick={handleClick}>
                <img
                  name="immunizationRecords"
                  src={uploadIcon}
                  alt="uploadIcon"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Chronic illness</label>
            <input
              type="text"
              name="chronicIllness"
              placeholder="Enter any chronic illnisses you have"
              onChange={handleChange}
            />
          </div>{" "}
          <div className="form-group">
            <label>Allergies </label>
            <input
              type="text"
              name="allergies"
              placeholder="Enter any kind of allergies you have"
              onChange={handleChange}
            />
          </div>
          <button disabled={isLoading} type="submit" className="submit-btn">
            {isLoading ? <CircularProgress disableShrink /> : "Register"}
          </button>
          {message && (
            <div
              style={{
                color: "007AFF",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddChild;
