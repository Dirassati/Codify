import React from 'react'

function SingleChild({child}) {
    return (
        <tr >
           
            <td className='name'>

                <span> {`${child.student_first_name}  ${child.student_last_name}`}</span>
            </td>


            <td className='grade'>
                <div>  {child.student_grade}</div>
            </td>


        </tr>
    )
}

export default SingleChild