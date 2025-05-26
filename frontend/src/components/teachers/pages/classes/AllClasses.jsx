import { useEffect, useState } from "react";
import SingleAttendence from './SingleAttendence'
import { useAuth } from '../../../../contexts/AuthContext'
// import "./Notes.css";

const AllClasses = () => {
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
  // const { user } = useAuth();
  const teacherId = 160;

  useEffect(() => {


    const fetchTeacherData = async () => {
      console.log("fetch students")
      try {
        const [subjectRes, groupRes] = await Promise.all([
          fetch(`http://localhost:5000/api/teachers/${teacherId}`),
          fetch(`http://localhost:5000/api/teachers/${teacherId}/groups`),
        ]);

        if (!subjectRes.ok || !groupRes.ok) throw new Error("Failed to fetch data");

    const subjectData = await subjectRes.json();
    const groupData = await groupRes.json();

    console.log(subjectData.data.subjects)
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
          `http://localhost:5000/api/groups/${selectedGroupId}/students`
        );
        if (!res.ok) throw new Error("Failed to fetch grades");

       
        const data = await res.json();
         console.log(data);
        setStudents(data.data);
        // setGroupInfo(data.data.groupInfo);
        // setSubjectInfo(data.data.subjectInfo);
        setError(null);

       
      } catch (err) {
        console.error(err);
        setError("Failed to load students.");
        setStudents([]);
        setGroupInfo(null);
        setSubjectInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [selectedGroupId, selectedSubjectId]);






  // const handleSave = async () => {
  //   try {
  //     const allRequests = [];

  //     for (const [studentId, grade] of Object.entries(grades)) {
  //       const studentNotes = [
  //         { noteType: "note_cc", value: grade.note_cc },
  //         { noteType: "note_devoir", value: grade.note_devoir },
  //         { noteType: "note_examen", value: grade.note_examen },
  //       ];

  //       studentNotes.forEach(({ noteType, value }) => {
  //         const payload = {
  //           eleveId: parseInt(studentId),
  //           subjectId: selectedSubjectId,
  //           trimestre,
  //           noteType,
  //           value: parseFloat(value) || 0,
  //         };

  //         allRequests.push(
  //           fetch("http://localhost:5000/api/notes/save", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(payload),
  //           })
  //         );
  //       });
  //     }

  //     await Promise.all(allRequests);
  //     alert("Grades saved successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error saving grades.");
  //   }
  // };

  return (
    <div className="notes-section">
      <h1 className="notes-section-title">Students</h1>

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
        <div className="classes">
          <div className="all-students">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Class</th>
                    <th>Attendence</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <SingleAttendence
                      student={student}
                      key={student.id}
                      subjectId={selectedSubjectId}
                      groupId={selectedGroupId}
                      teacherId={teacherId}
                    />
                  ))}
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AllClasses;
