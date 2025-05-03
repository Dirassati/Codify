import './student.css'
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Student({ student, studentsSelected, changed }) {
    const navigate = useNavigate();
    const [parentData,setParentData]=useState({});



    function handleClick() {
            navigate('/adminpannel/Studentcard');
            localStorage.setItem('studentDetails', JSON.stringify(student))
            
    }
    return (
        <tr className={studentsSelected.includes(student.id) ? "clicked" : ""}>
            <td>
                <input type="checkbox" checked={studentsSelected.includes(student.id)} onChange={() => { changed(student.id) }} />

            </td>
            <td onClick={handleClick} className='name'>
                <div className='photo'></div>
                <span> {`${student.student_first_name}  ${student.student_last_name}`}</span>
            </td>
            <td className='id'>{"#" + student.id}</td>
            <td className='date'>{student.created_at}</td>
            <td className='parent-name'>{student.parent_inscription_id}</td>
            <td className='city'>{student.student_nationality}</td>
            <td >


                <div className="contact">
                    <div ><img src={phoneIcon} alt="phoneIcon" /></div>
                    <div > <img src={messageIcon} alt="messageIcon" /></div>
                </div>

            </td>
            <td className='grade'>
                <div>  {student.student_grade}</div>
            </td>
            <td className='status'>
                <div className={student.status}>{student.status}</div>
            </td>
            <td className='action'>
                <div> <img src={threedotsIcons} alt="show more icon" /></div>
            </td>

        </tr>
    )
}

export default Student