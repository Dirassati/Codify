import './login.css'
import { Captcha } from 'navid-react-captcha-generator';
import { Link } from 'react-router-dom'
import CachedIcon from '@mui/icons-material/Cached';
import { useState } from 'react';

function Login() {

const [captchaValue,setCaptchaValue]=useState('');//stock the latest captcha code
const [regenerate,setRegenerate]=useState(false);//to regenerate a captcha value

function handleCaptchaChange(value){
setCaptchaValue(value);
}

function regenerateCaptchaCode(){
setRegenerate(prev=>!prev);
}

    return (
        <div className='login'>
            <div className='form-container'>
                <h2>DIRASSATI</h2>
                <h3>Welcom Back</h3>

                <form>
                    <div className='input-field'>
                        <label htmlFor="email">User Name</label>
                        <input type="email" placeholder='Enter email or matricule' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter password' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="text">Security Text</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="text" placeholder='Enter the shown text' className='security-input' />
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

                    <button className='login-btn'>LOG IN</button>

                   <p className='forgot-password-link-container'><Link className='forgot-password-link' to='/forgotpassword'>Forgot Password?</Link></p> 








                </form>

            </div>
        </div>
    )
}

export default Login;