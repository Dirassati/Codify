import "./Notes.css";
import { FaSearch } from 'react-icons/fa';

const Notes = () => {
  const students = [
    { id: 1, name: "Rahul Sharma", cc: "08", devoir: "10", exam: "12", moyenne: "10", status: "Pass" },
    { id: 2, name: "Rahul Sharma", cc: "05", devoir: "06", exam: "07", moyenne: "06", status: "Fail" },
    { id: 3, name: "Rahul Sharma", cc: "12", devoir: "14", exam: "16", moyenne: "14", status: "Pass" },
    { id: 4, name: "Rahul Sharma", cc: "", devoir: "", exam: "", moyenne: "", status: "Pending" },
  ];

  return (
    <div className="notes-section">
      <h1 className="notes-section-title">Student Notes</h1>

      <div className="notes-search-wrapper">
        <input type="text" placeholder="Select class" className="notes-search-input" />
        <span className="notes-search-icon"><FaSearch /></span>
      </div>

      <div className="notes-table-wrapper">
        <div className="notes-table-header">
          <div className="notes-col-name">Name</div>
          <div className="notes-col-cc">CC</div>
          <div className="notes-col-devoir">Devoir</div>
          <div className="notes-col-exam">Exam</div>
          <div className="notes-col-moyenne">Moyenne</div>
          <div className="notes-col-status">Status</div>
        </div>

        <div className="notes-table-body">
          {students.map((student) => (
            <div key={student.id} className="notes-table-row">
              <div className="notes-cell-name"><span className="notes-bullet">•</span>{student.name}</div>
              <div className="notes-cell-cc">{student.cc}</div>
              <div className="notes-cell-devoir">{student.devoir}</div>
              <div className="notes-cell-exam">{student.exam}</div>
              <div className="notes-cell-moyenne">{student.moyenne}</div>
              <div className={`notes-cell-status ${student.status.toLowerCase()}`}>{student.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
