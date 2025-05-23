import { useState } from 'react';
import './forgotpassword.css'
import axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");

  async  function handleClick() {
   
try {
    const res=axios.post('',{email});
        console.log(res.data);
        // navigate('/verification');
        // localStorage.setItem("email",email);
        
} catch (error) {
    console.log(error.response?.data?.message||"failed");
}

       
    }
    return (
        <div className='forgot-password-container'>
            <Header />
            <div className='forgot-password'>
                <div className='containerr'>
                    <h2>DIRASSATI</h2>
                    <h3>Forgot password</h3>
                    <p >Enter your email for the verification
                        proccess,we will send 4 digits code to your email.</p>
                    <div className="input-field">
                        <label htmlFor="email">E mail</label>
                        <input type="email" placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <button onClick={handleClick}>Continue</button>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword