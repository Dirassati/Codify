

"use client"

import { useState, useEffect } from "react"
import "./Studentss.css"
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Studentss = ({ apiUrl }) => {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 5

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (apiUrl) {
          const response = await fetch(apiUrl)
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
          const data = await response.json()
          setStudents(data)
        } else {
          const sampleData = [
            { id: "20223658474", firstName: "Amine", lastName: "william", class: "1 SA 2" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "1 MT 2" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "2 Mt 1" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "2 SA 1" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "2 SA 1" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "2 SA 1" },
            { id: "20223658474", firstName: "Samanta", lastName: "william", class: "3 MT 3" },
          ]
          setStudents(sampleData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [apiUrl])

  const filteredStudents = students.filter(
    (student) =>
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  const isHighlighted = (index) => index % 2 === 0

  if (isLoading) return <div className="loading">Loading students...</div>
  if (error) return <div className="error">Error: {error}</div>


  return (
    <div className="students-container">
      <h1 className="students-title">Students</h1>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1) // reset to first page on search
          }}
        />
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead >
            <tr >
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={index} className={isHighlighted(index) ? "highlighted-row" : ""}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} from {filteredStudents.length} data
        </div>
        <div className="pagination-controls">
          <button className="pagination-arrow" onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button className="pagination-arrow" onClick={nextPage} disabled={currentPage === totalPages}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Studentss

