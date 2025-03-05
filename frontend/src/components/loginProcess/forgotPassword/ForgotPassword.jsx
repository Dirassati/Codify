import './forgotpassword.css'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate=useNavigate();
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
                        <input type="email" placeholder='Enter email'/>
                    </div>
                    <button onClick={()=>{navigate('/verification')}}>Continue</button>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword