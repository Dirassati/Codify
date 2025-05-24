import './newpassword.css'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import eyeOpened from '../../../assets/icons/eyeopened.svg'
import eyeClosed from '../../../assets/icons/eyeclosed.svg'
import axios from 'axios';

function NewPassword() {
    const navigate = useNavigate();
    const [password1, setPassword1] = useState("");
    const [shown1, setShown1] = useState(false);
    const [password2, setPassword2] = useState("");
    const [shown2, setShown2] = useState(false);
    const [message,setMessage]=useState("");
const token=localStorage.getItem("token");
    // const maskePassword = (password) => {
    //     return password.replace(/./g, "*"); // Replace every character with '*'
    // };


async function handleClick() {
    console.log(password1);
    console.log(password2);
    if (password1!==password2) {
        setMessage("the fields must be the same");
    }
else{
    try {
        const res =axios.post('http://localhost:5000/api/auth/reset-password',{token,password1});
        console.log(res.message)
    } catch (error) {
        console.log(error.response?.data?.message || "failed");
    }
}
}

    return (
        <div className='forgot-password-container'>
            <Header />
            <div className='forgot-password'>
                <div className='containerr'>
                    <h2>DIRASSATI</h2>
                    <h3>New Password</h3>
                    <p >Set the new password for your account so you can login and access all featuress.</p>
                    <div className="input-field">
                        <label htmlFor="password">Enter new password</label>

                        <div style={{ position: "relative" }}>
                            <input type={shown1 ? "text" : "password"} placeholder='8 symbls at least'
                                onChange={(e) => {
                                    setPassword1(e.target.value);

                                }}
                                value={password1}
                            />
                            {!shown1 ? <img src={eyeClosed} className='eye-icon closed' onClick={() => { setShown1(prev => !prev) }} /> : <img src={eyeOpened} className='eye-icon' onClick={() => { setShown1(prev => !prev) }} />}
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Confirm password</label>
                        <div style={{ position: "relative" }}>
                            <input type={shown2 ? "text" : "password"} placeholder='8 symbls at least'
                                onChange={(e) => {
                                    setPassword2(e.target.value);

                                }}
                                value={password2}


                            />

                            <div className='icon-container'>  {!shown2 ? <img src={eyeClosed} className='eye-icon closed' onClick={() => { setShown2(prev => !prev) }} /> : <img src={eyeOpened} className='eye-icon' onClick={() => { setShown2(prev => !prev) }} />}</div>
                        </div>


                    </div>
                    <button onClick={handleClick }>Continue</button>
                </div>
            </div>
        </div>

    )
}

export default NewPassword