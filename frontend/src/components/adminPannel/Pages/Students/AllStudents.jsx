import './allstudents.css'
import Student from './student'
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import leftArrowIcon from '../../../../assets/icons/leftArrow.svg'
import rightArrowIcon from '../../../../assets/icons/rightArrow.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'

function AllStudents({ filter }) {
    const [studentsSelected, setStudentsSelected] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [studentsDisplayed, setStudentsDisplayed] = useState([]);
    const [studentsPageSelected, setStudentsPageSelected] = useState(1);
    const [studentsPages, setStudentsPages] = useState([]);
    const [studentsPagesStart, setStudentsPagesStart] = useState(1);
const navigate =useNavigate();
    const students = [
        
        {
            name: "Senouci Abdeldjalil",
            id: 6666,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"refused"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 77777,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"untreated"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88888,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88889,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88881,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88882,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88883,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88884,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88885,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88886,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }

        ,


        
    
        {
            name: "Senouci Abdeldjalil",
            id: 88887,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"refused"
        }
    
        
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88899,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"valide"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88879,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"valide"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88869,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"untreated"
        }
        ,
        {
            name: "Senouci Abdeldjalil",
            id: 88859,
            parentName: "senouci benaoumeur",
            grade: "vi",
            city: "Oran",
            date: "2024-03-14",
            phoneNumber: "0555855016",
            email: "abdeldjalil.sen@gmail.com",
            status:"unpaied"
        }



    ]

    const filteredStudents = students.filter(student => student.status === filter);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    useEffect(() => {
        // Set displayed students based on current page and filter
        const start = (studentsPageSelected - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setStudentsDisplayed(filteredStudents.slice(start, end));
    }, [filter, studentsPageSelected]);

    useEffect(() => {
        // Update page numbers whenever filter changes
        setStudentsPages(Array.from({ length: totalPages }, (_, i) => i + 1));
        if (studentsPageSelected > totalPages) {
            setStudentsPageSelected(1);
        }
    }, [filter, filteredStudents.length]);

    useEffect(() => {
        // console.log("Displayed students:", studentsDisplayed);
    }, [studentsDisplayed]);

    function handleCheckClick(id) {
        if (studentsSelected.includes(id)) {
            setStudentsSelected(prev => prev.filter(studentSelected => studentSelected !== id));
        } else {
            setStudentsSelected(prev => [...prev, id]);
        }
    }

    function handleCheckAll() {
        if (allChecked) {
            setStudentsSelected([]);
        } else {
            setStudentsSelected(students.map(student => student.id));
        }
        setAllChecked(prev => !prev);
    }

    return (
        <div className="all-students">
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" checked={allChecked} onChange={handleCheckAll} />
                            </th>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Parent name</th>
                            <th>City</th>
                            <th>Contact</th>
                            <th>Grade</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsDisplayed.map(student => (
                            <Student
                           
                                student={student}
                                studentsSelected={studentsSelected}
                                changed={handleCheckClick}
                                key={student.id}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="footer">
                    <div className="left">
                        Showing <span>{(studentsPageSelected - 1) * itemsPerPage + 1}</span>-
                        <span>{Math.min(studentsPageSelected * itemsPerPage, filteredStudents.length)}</span> from
                        <span> {filteredStudents.length}</span> data
                    </div>
                    <div className="right">
                        <img
                            src={leftArrowIcon}
                            alt="leftIcon"
                            onClick={() => {
                                if (studentsPagesStart > 1) {
                                    setStudentsPagesStart(prev => prev - 1);
                                }
                            }}
                        />
                        {studentsPages
                            .slice(studentsPagesStart - 1, studentsPagesStart + 2)
                            .map((page, i) => (
                                <div
                                    className={studentsPageSelected === page ? "clicked" : ""}
                                    key={i}
                                    onClick={() => setStudentsPageSelected(page)}
                                >
                                    {page}
                                </div>
                            ))}
                        <img
                            src={rightArrowIcon}
                            alt="rightIcon"
                            onClick={() => {
                                if (studentsPagesStart < studentsPages.length - 2) {
                                    setStudentsPagesStart(prev => prev + 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllStudents;
