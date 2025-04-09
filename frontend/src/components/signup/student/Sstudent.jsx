import './sstudent.css'
import { useState, useRef } from 'react';
import uploadIcon from '../../../assets/icons/upload-pdf-icon.svg'
import logo from '../../../assets/images/logo1.svg'
import Footer from "../../../pages/homepage/Footer";

function Sstudent() {
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);

  const currentYear = new Date().getFullYear();


  const years = [];
  const months = [];
  const days = [];

  for (let i = currentYear; i >= 1950; i--) {
    years.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  console.log(days);



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
  }



  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      console.log('Selected PDF:', file);
    } else {
      console.log('Please select a PDF file.');
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
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
          <label>Adress <span>*</span></label>
          <input type="tel" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="civilStatus">Degree <span>*</span></label>
          <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
            <option value="">Select Degree</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age<span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter your Age" required onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="civilStatus">Nationality <span>*</span></label>
          <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
            <option value="">Select Your Nationality</option>
            <option value="single">Dz</option>
            <option value="married">mor</option>
            <option value="divorced">tun</option>

          </select>
        </div>

        <div className="form-group">
          <label>Blood Type<span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter Blood type" required onChange={handleChange} />
        </div>
        <div class="form-group formgroup">
          <label for="civilStatus">Gender <span>*</span></label>
          <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
            <option value="">Select Your Gender</option>
            <option value="single">Male</option>
            <option value="married">Female</option>


          </select>
        </div>

        <div className="form-group ">
          <label>Place of Birth<span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter Place of Birth" required onChange={handleChange} />
        </div>

        <div className="form-group formgroup ">
          <label>Date of Birth<span>*</span></label>
          <div className="date-container">

            <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
              <option value="">Day</option>
              {
                days.map((day) => (<option value="">{day}</option>))
              }


            </select>

            <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
              <option value="">Month</option>
              {
                months.map((month) => (<option value="">{month}</option>))
              }


            </select>

            <select name="civilStatus" id="civilStatus" required onChange={handleChange}>
              <option value="">Year</option>
              {
                years.map((year) => (<option value="">{year}</option>))
              }


            </select>

          </div>





        </div>

        <div className="form-group">
          <label>Upload birth certificate<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
            <button
              onClick={handleClick}
            >
              <img src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Upload birth certificate<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
            <button
              onClick={handleClick}
            >
              <img src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Upload birth certificate<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
            <button
              onClick={handleClick}
            >
              <img src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Upload birth certificate<span>*</span></label>

          <input style={{ display: "none" }} ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} />

          <div
            className='upload-btn'

          >
            <p
              className='place-holder'
            >{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
            <button
              onClick={handleClick}
            >
              <img src={uploadIcon} alt="uploadIcon" style={{ width: "30px", height: "30px", }} /></button>
          </div>

        </div>

        <div className="form-group">
          <label>Card ID <span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter Card ID" required onChange={handleChange} />
        </div>  <div className="form-group">
          <label>Card ID <span>*</span></label>
          <input type="text" name="cardId" placeholder="Enter Card ID" required onChange={handleChange} />
        </div>




        <button type="submit" className="submit-btn" >Submit</button>
      </form>
      <Footer />
    </div>



    //     <div  >
    //       <input

    //         style={{

    //           display: "none"

    //         }}
    //         ref={fileInputRef}
    //         type="file"
    //         accept="application/pdf"
    //         onChange={handleFileChange}
    //       />
    //       <div style={{
    // display:"flex",
    // justifyContent:"space-between",
    // alignItems:"center",
    //         width: "250px",
    //         height: "50px",

    //         borderRadius: "8px",

    //         padding: "5px 10px",

    //         border: "solid 2px #262626",

    //       }}
    //         >
    //         <p style={{fontFamily: "Outfit",
    // fontWeight: "500",
    // fontSize: "15px",

    // letterSpacing: "0%",
    // }}>{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
    //         <button style={{
    //           border: "none", background: "none", cursor: "pointer",
    //         }}
    //         onClick={handleClick}
    //         >
    //           <img src={uploadIcon} alt="uploadIcon"  style={{width: "30px",height: "30px",}}/></button>
    //       </div>




    //     </div>
  )
}

export default Sstudent