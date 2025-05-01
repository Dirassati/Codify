import "./note.css"
import { FaSearch } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';



const Note = () => {
  // Static data for the table
  const students = [
    { id: 1, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 2, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 3, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 4, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 5, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 6, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 7, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 8, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 9, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 10, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 11, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 12, name: "Rahul Sharma", mark: "15/20", status: "Pass" },
    { id: 13, name: "Rahul Sharma", mark: "05/20", status: "Fail" },
    { id: 14, name: "Rahul Sharma", mark: "/20", status: "Pending" },
    { id: 15, name: "Rahul Sharma", mark: "/20", status: "Pending" },
    { id: 16, name: "Rahul Sharma", mark: "/20", status: "Pending" },
  ]

  return (
    <div className="notes-container">
      <h1 className="notes-title">Notes</h1>

      <div className="search-container">
        <input type="text" placeholder="selecte class" className="search-input" />
        <span className="search-icon"> <FaSearch /></span>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="header-name">Name</div>
          <div className="header-mark">Mark</div>
          <div className="header-status">Status</div>
          <div className="header-action">Action</div>
        </div>

        <div className="table-body">
          {students.map((student) => (
            <div key={student.id} className="table-row">
              <div className="cell-name">
                <span className="bullet">•</span> {student.name}
              </div>
              <div className="cell-mark">{student.mark}</div>
              <div className={`cell-status ${student.status.toLowerCase()}`}>{student.status}</div>
              <div className="cell-action">
                <span className="eye-icon">  <FaEye /></span> Complete Result
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Note
