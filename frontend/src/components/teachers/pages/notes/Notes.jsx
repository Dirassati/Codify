import { useEffect, useState } from "react";
import "./Notes.css";

const Notes = () => {
  const [subjects, setSubjects] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [students, setStudents] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(false);

  const teacherId = 160;
  const trimestre = 1;

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const [subjectRes, groupRes] = await Promise.all([
          fetch(`http://localhost:5000/api/teachers/${teacherId}`),
          fetch(`http://localhost:5000/api/teachers/${teacherId}/groups`),
        ]);

        if (!subjectRes.ok || !groupRes.ok) throw new Error("Failed to fetch data");

        const subjectData = await subjectRes.json();
        const groupData = await groupRes.json();

        setSubjects(subjectData.data.subjects);
        setGroups(groupData.data);

        if (subjectData.data.subjects.length > 0) {
          setSelectedSubjectId(subjectData.data.subjects[0].id);
        }
        if (groupData.data.length > 0) {
          setSelectedGroupId(groupData.data[0].group_id);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load teacher data.");
      }
    };

    fetchTeacherData();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!selectedGroupId || !selectedSubjectId) return;
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/notes/${selectedGroupId}/${selectedSubjectId}/${trimestre}`
        );
        if (!res.ok) throw new Error("Failed to fetch grades");

        const data = await res.json();
        setStudents(data.data.students);
        setGroupInfo(data.data.groupInfo);
        setSubjectInfo(data.data.subjectInfo);
        setError(null);

        // Initialize grades state from fetched student notes
        const initialGrades = {};
        data.data.students.forEach((student) => {
          initialGrades[student.id] = {
            note_cc: student.note_cc ?? "",
            note_devoir: student.note_devoir ?? "",
            note_examen: student.note_examen ?? "",
          };
        });
        setGrades(initialGrades);
      } catch (err) {
        console.error(err);
        setError("Failed to load student grades.");
        setStudents([]);
        setGroupInfo(null);
        setSubjectInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [selectedGroupId, selectedSubjectId]);

  const handleGradeChange = (studentId, field, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [field]: value,
      },
    }));
  };

  // Use moyenne_matiere from backend directly
  const getStatus = (average) => {
    const avg = parseFloat(average);
    if (isNaN(avg) || avg === 0) return "Pending";
    return avg >= 10 ? "Pass" : "Fail";
  };

  const handleSave = async () => {
    try {
      const allRequests = [];

      for (const [studentId, grade] of Object.entries(grades)) {
        const studentNotes = [
          { noteType: "note_cc", value: grade.note_cc },
          { noteType: "note_devoir", value: grade.note_devoir },
          { noteType: "note_examen", value: grade.note_examen },
        ];

        studentNotes.forEach(({ noteType, value }) => {
          const payload = {
            eleveId: parseInt(studentId),
            subjectId: selectedSubjectId,
            trimestre,
            noteType,
            value: parseFloat(value) || 0,
          };

          allRequests.push(
            fetch("http://localhost:5000/api/notes/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            })
          );
        });
      }

      await Promise.all(allRequests);
      alert("Grades saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving grades.");
    }
  };

  return (
    <div className="notes-section">
      <h1 className="notes-section-title">Student Notes</h1>

      <div className="notes-group-selector">
        <label htmlFor="subject-select">Select Subject:</label>
        <select
          id="subject-select"
          value={selectedSubjectId || ""}
          onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className="notes-group-selector">
        <label htmlFor="group-select">Select Group:</label>
        <select
          id="group-select"
          value={selectedGroupId || ""}
          onChange={(e) => setSelectedGroupId(Number(e.target.value))}
        >
          {groups.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>
      </div>

      {groupInfo && subjectInfo && (
        <div className="notes-info">
          <p>
            <strong>Group:</strong> {groupInfo.gradeName} - {groupInfo.level} (
            {groupInfo.specializationName})
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
            const studentGrades = grades[student.id] || {};
            // Use moyenne_matiere from backend data directly
            const average = student.moyenne_matiere ?? "—";
            const status = getStatus(average);

            return (
              <div key={student.id} className="notes-table-row">
                <div className="notes-cell-name">
                  <span className="notes-bullet">•</span>
                  {student.first_name} {student.last_name}
                </div>
                <div className="notes-cell-cc">
                  <input
                    type="number"
                    value={studentGrades.note_cc || ""}
                    onChange={(e) =>
                      handleGradeChange(student.id, "note_cc", e.target.value)
                    }
                  />
                </div>
                <div className="notes-cell-devoir">
                  <input
                    type="number"
                    value={studentGrades.note_devoir || ""}
                    onChange={(e) =>
                      handleGradeChange(student.id, "note_devoir", e.target.value)
                    }
                  />
                </div>
                <div className="notes-cell-exam">
                  <input
                    type="number"
                    value={studentGrades.note_examen || ""}
                    onChange={(e) =>
                      handleGradeChange(student.id, "note_examen", e.target.value)
                    }
                  />
                </div>
                <div className="notes-cell-moyenne">{average}</div>
                <div className={`notes-cell-status ${status.toLowerCase()}`}>
                  {status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="notes-save-button-wrapper">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Notes;
