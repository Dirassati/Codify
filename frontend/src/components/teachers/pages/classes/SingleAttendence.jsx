
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function SingleStudent({ student, studentsSelected, changed }) {
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
        
            <td className='id'>{"#" + student.id}</td>
            <td className='id'>{student.student_last_name}</td>
            <td className='id'>{student.student_first_name}</td>
            <td className='id'>{student.class}</td>
            <td className='attendence'>
                <div>
                    <button className='present'>Present</button>
                    <button className='absent'>Absent</button>
                </div>
            </td>

        </tr>
    )
}

export default SingleStudent