"use client"

import { useState, useEffect } from "react"
import "./notes.css"
import SearchField from '../SearchField'

const Notes = () => {
  const [semesters, setSemesters] = useState([])
  const [activeSemester, setActiveSemester] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/semesters')
        // const data = await response.json()

        // Simulating API response delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Sample data that would come from the API
        const data = [
          {
            name: "Semester 01",
            subjects: [
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Physics",
                continuousAssessment: "14/20",
                assignment: "13/20",
                exam: "16/20",
                average: "15.78",
              },
            ],
          },
          {
            name: "Semester 02",
            subjects: [
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
              {
                name: "Mathematics",
                continuousAssessment: "16/20",
                assignment: "12/20",
                exam: "15/20",
                average: "16.23",
              },
            ],
          },
          {
            name: "Semester 03",
            subjects: [
              {
                name: "Computer Science",
                continuousAssessment: "17/20",
                assignment: "16/20",
                exam: "18/20",
                average: "17.67",
              },
              {
                name: "Statistics",
                continuousAssessment: "15/20",
                assignment: "14/20",
                exam: "16/20",
                average: "15.67",
              },
            ],
          },
        ]

        setSemesters(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching semester data:", err)
        setError("Failed to load semester data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get the current semester's subjects
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

      {/* Grades table */}
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
