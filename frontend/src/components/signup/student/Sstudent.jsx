import './sstudent.css'
import { useState, useRef } from 'react';
import uploadIcon from '../../../assets/icons/upload-pdf-icon.svg'

function Sstudent() {
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);

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



    <div  >
      <input

        style={{

          display: "none"

        }}
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
        width: "250px",
        height: "50px",
        
        borderRadius: "8px",

        padding: "5px 10px",

        border: "solid 2px #262626",

      }}
        >
        <p style={{fontFamily: "Outfit",
fontWeight: "500",
fontSize: "15px",

letterSpacing: "0%",
}}>{pdfFile ? pdfFile.name : "Upload Proof of Residence"}</p>
        <button style={{
          border: "none", background: "none", cursor: "pointer",
        }}
        onClick={handleClick}
        >
          <img src={uploadIcon} alt="uploadIcon"  style={{width: "30px",height: "30px",}}/></button>
      </div>



      
    </div>
  )
}

export default Sstudent