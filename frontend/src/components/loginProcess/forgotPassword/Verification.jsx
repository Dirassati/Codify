import { useState,useRef, useEffect } from 'react';
import './verification.css'
import Header from './Header'
import { Navigate, useNavigate } from 'react-router-dom';


function Verification() {
const navigate=useNavigate();
    const [values, setValues] = useState(["", "", "", ""]);
    const inputsRef = useRef([]);

    const [timer,setTimer]=useState(30);
const [resend,setResend]=useState(false);

function startTimer() {
  setTimer(30);

  const timerRun = setInterval(() => {
    setTimer((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        clearInterval(timerRun);
        return 0;
      }
    });
  }, 1000);
}



useEffect(()=>{
    startTimer();
},[resend])

    const handleChange = (index, e) => {
        let inputValue = e.target.value;
    
        // Allow only one number
        if (/^\d?$/.test(inputValue)) {
          let newValues = [...values];
          newValues[index] = inputValue;
          setValues(newValues);
    
          // Move to the next input 
          if ( inputValue && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
          }
        }
      };




    return (
        <div className='forgot-password-container verification'>
            <Header />
            <div className='forgot-password'>
                <div className='containerr'>
                    <h3>Verification</h3>
                    <p >Enter your 4 digits code that you received on your email.</p>
                    <div className="input-field ">
                        {values.map((value,index)=>{ 
                          return  <input type="number"key={index} value={value} onChange={(e)=>handleChange(index,e)}  ref={(el) => (inputsRef.current[index] = el)}/>
                            })}
                       
                    </div>
                    <p className='time'>{timer>0 ? timer : "Time Out Please click resend to get another Code"}</p>
                    <button onClick={()=>{navigate('/newpassword')}}>Continue</button>
                    <p>If you didn’t receive a code! <span onClick={()=>{setResend(prev=>!prev)}}>Resend</span></p>
                </div>
               
            </div>

        </div>
    )
}

export default Verification