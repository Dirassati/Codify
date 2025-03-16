import './login.css'
import { Captcha } from 'navid-react-captcha-generator';
import { Link } from 'react-router-dom'
import CachedIcon from '@mui/icons-material/Cached';
import { useState } from 'react';
import axios from 'axios'

function Login() {

const [captchaValue,setCaptchaValue]=useState('');//stock the latest captcha code
const [captchaInputValue,setCaptchaInputValue]=useState('');
const [regenerate,setRegenerate]=useState(false);//to regenerate a captcha value
const [user,setUser]=useState({email:"",password:""});
const [error,setError]=useState("")


function handleCaptchaChange(value){
setCaptchaValue(value);
}

function regenerateCaptchaCode(){
setRegenerate(prev=>!prev);
}

async function handleSubmit(e){
    e.preventDefault();
//console.log(captchaInputValue)
// console.log(captchaValue)
// console.log(user)

if (captchaInputValue!==captchaValue ){
setError("Error captcha")
}
else{

    try {
        const response = await axios.post("", {
         user
        });
  
        console.log(response.data);
  
        // Store the token in localStorage (or context)
        localStorage.setItem("token", token);
        // Redirect to dashboard, etc.
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Login failed");
      }

}

}


    return (


        <div className='login'>
            <div className='form-container'>
                <h2>DIRASSATI</h2>
                <h3>Welcom Back</h3>

                <form onSubmit={handleSubmit}>
                    {error&& <div style={{marginBottom:"10px",color:"red"}}>{error}</div>}
                    <div className='input-field'>
                        <label htmlFor="text">User Name</label>
                        <input type="text" placeholder='Enter email or matricule' onChange={(e)=>{setUser(prev=>({...prev,email:e.target.value}))}}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter password' onChange={(e)=>{setUser(prev=>({...prev,password:e.target.value}))}}/>
                    </div>
                    <div className='input-field'>
                        <label htmlFor="text">Security Text</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="text" placeholder='Enter the shown text' className='security-input' onChange={(e)=>{setCaptchaInputValue(e.target.value)}} />
                            <div style={{ border: "1px solid #EAEAEA", display: "flex", alignItems: "center" }}>
                                <Captcha
                                    onChange={handleCaptchaChange}
                                    regenerate={regenerate}
                                    width={120}
                                    height={56}
                                    length={5}
                                    fontSize={24}
                                    bgColor="#fff"
                                    textColor="#000"
                                    noise={false}
                                    lines={true}
                                    distortion={false}

                                />
                                <CachedIcon style={{ margin: "0 15px" ,cursor:"pointer"}} onClick={regenerateCaptchaCode}/>
                            </div>

                        </div>

                    </div>
                    <div className='input-field' style={{ display: 'flex', alignItems: "center" }}>
                        <input type="checkbox" name="REMEMBER ME" id="1" className='checkbox' />
                        <p htmlFor="checkbox">Remember Me</p>
                    </div>


                    <button className='login-btn' type='submit'>LOG IN</button>



                   <p className='forgot-password-link-container'><Link className='forgot-password-link' to='/forgotpassword'>Forgot Password?</Link></p> 









                </form>

            </div>
        </div>
    )
}

export default Login;