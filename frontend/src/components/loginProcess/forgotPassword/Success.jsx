import './success.css'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import success from '../../../assets/icons/success.svg'

function Success() {
    const navigate=useNavigate();
    return (
        <div className='forgot-password-container '>
            <Header />
            <div className='forgot-password success'>
                <div className='containerr'>
             <div className="image-container">   <img src={success} alt="success icon" /></div>   
                    <h3>Successfully</h3>
                    <p >Your password has been reset successfully</p>
                   
                    <button >Continue</button>
                </div>
            </div>
        </div>

    )
}

export default Success