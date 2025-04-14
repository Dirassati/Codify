import React, { useEffect,useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


function StudentCard() {
const [isLoading,setIsLoading]=useState(false);
const [message,setMessage]=useState("")
useEffect(()=>{
console.log(localStorage.getItem('studentDetails'))
},[true])



const handleValidation=async (e)=>{
    
    e.preventDefault();


try {
  setIsLoading(true);
  const response = await axios.post("http://localhost:5000/api/", );
  
  console.log(response.data);

      navigate('/adminpannel/Students');
 

} catch (err) {
  console.error(err);
  setMessage(err.response?.data?.message || "fail");
  console.log(err.response?.data?.message || "fail")
}
finally{
  setIsLoading(false)
}


      
    }
    

    const handleRefuse=async (e)=>{
    
        e.preventDefault();
    
    
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/", );
      
      console.log(response.data);
    
          navigate('/adminpannel/Students');
     
    
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "fail");
      console.log(err.response?.data?.message || "fail")
    }
    finally{
      setIsLoading(false)
    }
    
    
          
        }

    return (
        <div className='add-student'  >
            <Header title="Student Details" />

            <div className="forms-container" >
                <div className="inscription-card">
                    <div className="top">Parent Details</div>

                    <div className="form-container">

                        <form >


                            <div className='input-container'>
                                <label>First Name *</label>
                                <input type="text" name="parent_firstName" value="aaa" placeholder="Enter First Name" required onChange="" />
                            </div>
                            <div className='input-container'>
                                <label>Last Name *</label>
                                <input type="text" name="lastName" value="aaa" placeholder="Enter Last Name" required onChange="" />
                            </div>

                            <div className='input-container'>
                                <label for="email">Email </label>
                                <input type="text" name="parent_email" value="aaa@" placeholder='Enter the email' />
                            </div>

                            <div className='input-container'>
                                <label for="phone">Phone </label>
                                <input type="text" name="parent_phone" value="aaa" placeholder='Enter the phone number' />
                            </div>

                            <div className='input-container'>
                                <label>Profession</label>
                                <input type="text" name="parent_profession" value="aaa" placeholder="Enter the profession" required onChange="" />
                            </div>



                            <div className='input-container'>
                                <label for="status">Status </label>
                                <select name="parent_status" required onChange="">
                                    <option value="">Select Civil Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>



                            <div className='input-container'>
                                <label>Address *</label>
                                <textarea type="text" name="parent_adress" rows="10" cols="50" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " className='adress' required onChange="" />
                            </div>

                            <div className='input-container'>
                                <label for="payment">Payment </label>
                                <div>
                                    <input type="radio" name="payment_methode" value="cash" /> Done
                                    <input type="radio" name="payment_methode" value="card" /> Not
                                   
                                </div>




                            </div>









                        </form>
                    </div>
                </div>



                <div className="inscription-card">
                    <div className="top">Student Details</div>

                    <div className="form-container">

                        <form >


                            <div className='input-container'>
                                <label>First Name *</label>
                                <input type="text" name="student_firstName" placeholder="Enter First Name" required onChange="" />
                            </div>
                            <div className='input-container'>
                                <label>Last Name *</label>
                                <input type="text" name="student_lastName" placeholder="Enter Last Name" required onChange="" />
                            </div>

                            <div className='input-container'>
                                <label>Place of birth *</label>
                                <input type="text" name="student_adress" placeholder="Enter Phone Number" required onChange="" />
                            </div>
                            <div className='input-container'>
                                <label>Date of birth *</label>
                                <input type="text" name="address" placeholder="Enter Phone Number" required onChange="" />
                            </div>
                            <div className='input-container'>
                                <label for="degree">Degree </label>
                                <input type="text" name="student_degree" placeholder='Enter the degree' />
                            </div>

                            <div className='input-container'>
                                <label for="gender">Gender </label>
                                <select name="student_gender" required onChange="">
                                    <option value="">Select Civil Status</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>

                                </select>
                            </div>

                            <div className='input-container'>
                                <label for="nationality">Nationality </label>
                                <input type="text" name="student_nationality" placeholder='Enter nationality' />
                            </div>

                            <div className='input-container'>
                                <label>Blood Type</label>
                                <input type="text" name="student_bloodType" placeholder="Enter Blood type" required onChange="" />
                            </div>

                            <div className='input-container' >
                                <label>Chronic illness</label>
                                <input type="text" name="student_chronicIllness" placeholder="Enter any chronic illnisses you have" onChange="" />
                            </div>
                            <div className='input-container'>
                                <label>Allergies </label>
                                <input type="text" name="student_allergies" placeholder="Enter any kind of allergies you have" onChange="" />
                            </div>






                            <div className='input-container'>
                                <label>Address *</label>
                                <textarea type="text" name="student_address" rows="10" cols="50" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " className='adress' required onChange="" />
                            </div>










                        </form>
                    </div>
                </div>

                <div className="btns">
                    <button style={{backgroundColor:"red",border:"none"}} className='cancel refused' onClick={handleRefuse}>  {isLoading?<CircularProgress />: "Refuse"}</button>
                    <button style={{backgroundColor:"green"}} className='submit valide' onClick={handleValidation}  > {isLoading?<CircularProgress />: "Validate"}</button>
                </div>
            </div>


        </div>
    )
}

export default StudentCard