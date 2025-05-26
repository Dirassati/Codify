import "./Notes.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Notes = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const groupId = 1;      // Example groupId
  const subjectId = 2;    // Example subjectId
  const trimestre = 1;    // Example trimestre

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notes/${groupId}/${subjectId}/${trimestre}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        setStudents(json.data.students);
      } catch (err) {
        console.error("Error fetching student grades:", err);
        setError("Could not load student data.");
        // Fallback data
        setStudents([
          { id: 1, first_name: "Rahul", last_name: "Sharma", note_cc: "08", note_devoir: "10", note_examen: "12", moyenne_matiere: "10" }
        ]);
      }
    };

    fetchData();
  }, []);

  // Function to get status based on moyenne_matiere
  const getStatus = (moyenne) => {
    if (moyenne === null || moyenne === undefined || moyenne === 0) return "Pending";
    if (moyenne >= 10) return "Pass";
    return "Fail";
  };

  return (
    <div className="notes-section">
      <h1 className="notes-section-title">Student Notes</h1>

      <div className="notes-search-wrapper">
        <input type="text" placeholder="Select class" className="notes-search-input" />
        <span className="notes-search-icon"><FaSearch /></span>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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
          {students.map((student) => {
            const moyenne = parseFloat(student.moyenne_matiere) || 0;
            const status = getStatus(moyenne);

            return (
              <div key={student.id} className="notes-table-row">
                <div className="notes-cell-name">
                  <span className="notes-bullet">•</span>
                  {student.first_name} {student.last_name}
                </div>
                <div className="notes-cell-cc">{student.note_cc}</div>
                <div className="notes-cell-devoir">{student.note_devoir}</div>
                <div className="notes-cell-exam">{student.note_examen}</div>
                <div className="notes-cell-moyenne">{moyenne.toFixed(2)}</div>
                <div className={`notes-cell-status ${status.toLowerCase()}`}>{status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
