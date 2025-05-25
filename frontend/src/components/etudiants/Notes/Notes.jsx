"use client"

import { useState, useEffect } from "react"
import "./notes.css"
import SearchField from '../SearchField'

const Notes = () => {
  const [semesters, setSemesters] = useState([])
  const [activeSemester, setActiveSemester] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:5000/api/notes/summary/16/1")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const json = await response.json()

        // Format data to fit existing structure
        const semesterData = {
          name: "Semester 01",
          subjects: json.data.map(subject => ({
            name: subject.name,
            continuousAssessment: subject.continuousAssessment || "-",
            assignment: subject.assignment || "-",
            exam: subject.exam || "-",
            average: subject.average || "-"
          }))
        }

        setSemesters([semesterData])
      } catch (err) {
        console.error("Error fetching semester data:", err)
        setError("Failed to load semester data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const currentSemesterSubjects = semesters[activeSemester]?.subjects || []

  if (loading) {
    return (
      <div className="notes-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading semester data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="notes-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="notes-container_teacher">
      <div className="search-wrappe">
        <SearchField />
      </div>

      <div className="semester-tabs">
        {semesters.map((semester, index) => (
          <button
            key={index}
            className={`semester-tab ${activeSemester === index ? "active" : ""}`}
            onClick={() => setActiveSemester(index)}
          >
            {semester.name}
          </button>
        ))}
      </div>

      <div className="grades-table-container">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Continuous Assessment</th>
              <th>Assignment</th>
              <th>Exam</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {currentSemesterSubjects.length > 0 ? (
              currentSemesterSubjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.continuousAssessment}</td>
                  <td>{subject.assignment}</td>
                  <td>{subject.exam}</td>
                  <td>{subject.average}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  No subjects found for this semester
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notes
