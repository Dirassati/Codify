import './allstudents.css'
import Student from './Student'
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import leftArrowIcon from '../../../../assets/icons/leftArrow.svg'
import rightArrowIcon from '../../../../assets/icons/rightArrow.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function AllStudents({ filter }) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [studentsSelected, setStudentsSelected] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [studentsDisplayed, setStudentsDisplayed] = useState([]);
    const [studentsPageSelected, setStudentsPageSelected] = useState(1);
    const [studentsPages, setStudentsPages] = useState([]);
    const [studentsPagesStart, setStudentsPagesStart] = useState(1);
    const [filteredStudents, setFilteredStudents] = useState([]);
    
    const navigate = useNavigate();
    const students = [ //students 
    ]


    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/api/inscription/students/status/${filter}`);
                console.log(response.data);
                setFilteredStudents(response.data.students);
            } catch (err) {
                console.error(err);
                setMessage(err.response?.data?.message || "getting students failed  failed");
                console.log(err.response?.data?.message || " getting students failed failed")
            }
            finally{
                setIsLoading(false);
            }

        }

        fetchStudents();
    }, [filter])

    useEffect(() => {
        // Set displayed students based on current page and filter
        console.log(filter);

        const start = (studentsPageSelected - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setStudentsDisplayed(filteredStudents.slice(start, end));
    }, [filter, studentsPageSelected, filteredStudents]);

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
            setStudentsSelected(filteredStudents.map(student => student.id));
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
                        {
                            studentsDisplayed.map(student => (
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
