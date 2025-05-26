import "./Notes.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Notes = () => {
  const [students, setStudents] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [error, setError] = useState(null);

  const [selectedGroupId, setSelectedGroupId] = useState(1); // Default groupId
  const subjectId = 1;
  const trimestre = 1;

  const groups = [
    { id: 1, label: "Group 1" },
    { id: 2, label: "Group 2" },
    { id: 3, label: "Group 3" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notes/${selectedGroupId}/${subjectId}/${trimestre}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        setStudents(json.data.students);
        setGroupInfo(json.data.groupInfo);
        setSubjectInfo(json.data.subjectInfo);
        setError(null);
      } catch (err) {
        console.error("Error fetching student grades:", err);
        setError("Could not load student data.");
        setStudents([]);
        setGroupInfo(null);
        setSubjectInfo(null);
      }
    };

    fetchData();
  }, [selectedGroupId]); // <- re-fetch whenever selected group changes

  const getStatus = (moyenne) => {
    if (moyenne === null || moyenne === undefined || moyenne === 0) return "Pending";
    if (moyenne >= 10) return "Pass";
    return "Fail";
  };

  return (
    <div className="notes-section">
      <h1 className="notes-section-title">Student Notes</h1>

      {/* Group Selector */}
      <div className="notes-group-selector">
        <label htmlFor="group-select">Select Group:</label>
        <select
          id="group-select"
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(Number(e.target.value))}
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info */}
      {groupInfo && subjectInfo && (
        <div className="notes-info">
          <p>
            <strong>Group:</strong> {groupInfo.gradeName} - {groupInfo.level} ({groupInfo.specializationName})
          </p>
          <p>
            <strong>Subject:</strong> {subjectInfo.name}
          </p>
        </div>
      )}

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
