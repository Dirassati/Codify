import axios from "axios";
import './studentss.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../../assets/icons/leftArrow.svg";
import rightArrowIcon from "../../../../assets/icons/rightArrow.svg";
import searchIcon from '../../../../assets/icons/search.svg'
import SingleStudent from "./SingleStudent";
import Header from "../../../adminPannel/Pages/Header/Header";
import { FaSearch } from 'react-icons/fa';
function Studentss() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [studentsSelected, setStudentsSelected] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [studentsDisplayed, setStudentsDisplayed] = useState([]);
  const [studentsPageSelected, setStudentsPageSelected] = useState(1);
  const [studentsPages, setStudentsPages] = useState([]);
  const [studentsPagesStart, setStudentsPagesStart] = useState(1);
  const [students, setStudents] = useState([
    {
      id: 3,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt",

    }, {
      id: 4,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt",
    },
    {
      id: 5,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt",
    },
    {
      id: 6,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt"
    },
    {
      id: 7,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt"
    },
    {
      id: 8,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt"
    }, {
      id: 9,
      student_last_name: "senouci",
      student_first_name: "jalil",
      class: "1mt"
    },
    {
      id: 10,
      student_last_name: "senouci",
      student_first_name: "jalil",
    },
    {
      id: 11,
      student_last_name: "senouci",
      student_first_name: "jalil",
    },
    {
      id: 12,
      student_last_name: "senouci",
      student_first_name: "jalil",
    }

  ])

  const navigate = useNavigate();


  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(
  //         `http://localhost:5000/api/inscription/students/status/${filter}`
  //       );
  //       console.log(response.data);
  //       setstudents(response.data);
  //     } catch (err) {
  //       console.error(err);
  //       setMessage(
  //         err.response?.data?.message || "getting students failed  failed"
  //       );
  //       console.log(
  //         err.response?.data?.message || " getting students failed failed"
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchStudents();
  // }, [filter]);

  useEffect(() => {
    // Set displayed students based on current page and filter

    setTotalPages(Math.ceil(students.length / itemsPerPage));

    const start = (studentsPageSelected - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setStudentsDisplayed(students.slice(start, end));
  }, [studentsPageSelected, students]);

  useEffect(() => {
    // Update page numbers whenever filter changes
    setStudentsPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    if (studentsPageSelected > totalPages) {
      setStudentsPageSelected(1);
    }
  }, [students.length, totalPages]);

  useEffect(() => {
    // console.log("Displayed students:", studentsDisplayed);
  }, [studentsDisplayed]);

  function handleCheckClick(id) {
    if (studentsSelected.includes(id)) {
      setStudentsSelected((prev) =>
        prev.filter((studentSelected) => studentSelected !== id)
      );
    } else {
      setStudentsSelected((prev) => [...prev, id]);
    }
  }

  function handleCheckAll() {
    if (allChecked) {
      setStudentsSelected([]);
    } else {
      setStudentsSelected(students.map((student) => student.id));
    }
    setAllChecked((prev) => !prev);
  }

  return (

    <div className="studentss">
      <div className='classes-title'>
        Students
      </div>
    
              <div className="search-container">
                 <input type="text" placeholder="selecte class" className="search-input" />
                 <span className="search-icon"> <FaSearch /></span>
               </div>

      <div className="all-students">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleCheckAll}
                  />
                </th>

                <th>Id</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Class</th>


              </tr>
            </thead>
            <tbody>
              {studentsDisplayed.map((student) => (
                <SingleStudent
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
              Showing <span>{(studentsPageSelected - 1) * itemsPerPage + 1}</span>
              -
              <span>
                {Math.min(
                  studentsPageSelected * itemsPerPage,
                  students.length
                )}
              </span>{" "}
              from
              <span> {students.length}</span> data
            </div>
            <div className="right">
              <img
                src={leftArrowIcon}
                alt="leftIcon"
                onClick={() => {
                  if (studentsPagesStart > 1) {
                    setStudentsPagesStart((prev) => prev - 1);
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
                    setStudentsPagesStart((prev) => prev + 1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Studentss;
