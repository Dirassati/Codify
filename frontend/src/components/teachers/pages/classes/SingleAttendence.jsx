
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
function SingleStudent({ student,subjectId,groupId,teacherId}) {
    const navigate = useNavigate();

    // const [parentData,setParentData]=useState({});
    // function handleClick() {
    //         navigate('/adminpannel/Studentcard');
    //         localStorage.setItem('studentDetails', JSON.stringify(student))
            
    // }


    const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2); // months are 0-indexed
  const day = (`0${today.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};


const getCurrentTiming = () => {
  const now = new Date();
  const hours = (`0${now.getHours()}`).slice(-2);
  const minutes = (`0${now.getMinutes()}`).slice(-2);
  const seconds = (`0${now.getSeconds()}`).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

async function handleAbsence() {

// Store them in variables
const date = getCurrentDate();
const timing = getCurrentTiming();

  try {
    const res = await axios.post("http://localhost:5000/api/absences/report", {
      studentId:student.id,
      groupId: groupId,
      teacherId: teacherId,
      subjectId: subjectId,
      date: date,
      timing: timing
    });

    console.log(res); // Optional: show success
  } catch (error) {
    console.error("Error reporting absence:", error);
  }
}


    return (
        <tr >
            
        
            <td className='id'>{student.last_name}</td>
            <td className='id'>{student.first_name}</td>
            <td className='id'>{student.grade_level}</td>
            <td className='attendence'>
                <div>
                  
                    <button className='absent' onClick={handleAbsence}>Absent</button>
                </div>
            </td>

        </tr>
    )
}

export default SingleStudent