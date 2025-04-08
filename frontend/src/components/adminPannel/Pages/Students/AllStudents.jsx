import './allstudents.css'
import Student from './student'
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'

function AllStudents() {
    return (
        // <div className='all-students'>

        //     <div >
        //         <input type="checkbox" />
        //         <div className="column">Name</div>
        //     </div>

        //     <div className="column">Id</div>
        //     <div className="column">Date</div>
        //     <div className="column">Parent name</div>
        //     <div className="column">City</div>
        //     <div className="column">Contact</div>
        //     <div className="column">Grade</div>
        //     <div className="column">Action</div>


        //     <div className="students-container">
        //         <Student />
        //     </div>


        //     <div className="bottom">

        //     </div>
        // </div>


        <table className='all-students'>
            <thead>
                <tr>
                    <th>
                        <inut type="checkbox" />
                        <div className="column">Name</div>
                    </th>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Parent name</th>
                    <th>City</th>
                    <th>Contact</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <inut type="checkbox" />
                        <div className="column">Name</div>
                    </td>
                    <td>#33333</td>
                    <td>march 22 2024</td>
                    <td>mana wiliam</td>
                    <td>Oran</td>
                    <td>
                        <img src={phoneIcon} alt="phoneIcon" />
                        <img src={messageIcon} alt="messageIcon" />
                    </td>
                    <td>
                        Viic
                    </td>
                    <td><img src={threedotsIcons} alt="show more icon" /></td>

                </tr>

            </tbody>
        </table>
    )
}

export default AllStudents
