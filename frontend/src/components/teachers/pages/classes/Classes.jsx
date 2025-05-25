"use client"

import { useState, useEffect } from "react"
import "./Classes.css"
import { FaEllipsisV } from "react-icons/fa"

const Classes = ({ apiUrl }) => {
  // State for classes data
  const [classes, setClasses] = useState([])
  // State for loading status
  const [isLoading, setIsLoading] = useState(true)
  // State for any error messages
  const [error, setError] = useState(null)
  // State for active class (if needed for interactions)
  const [activeClass, setActiveClass] = useState(null)

  useEffect(() => {
    // Function to fetch classes data
    const fetchClasses = async () => {
      try {
        if (apiUrl) {
          // Fetch from API if URL is provided
          const response = await fetch(apiUrl)

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          const data = await response.json()
          setClasses(data)
        } else {
          // Use sample data if no API URL
          setClasses([
            { id: 1, code: "2MT", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 2, code: "2M", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 3, code: "2SC", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 4, code: "2MT", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 5, code: "2M", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 6, code: "2SC", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 7, code: "2MT", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 8, code: "2M", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 9, code: "2SC", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 10, code: "2MT", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 11, code: "2M", description: "Math", day: "Dimanche", time: "08:00h" },
            { id: 12, code: "2SC", description: "Math", day: "Dimanche", time: "08:00h" },
          ])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClasses()
  }, [apiUrl])

  // Function to handle menu click
  const handleMenuClick = (id) => {
    setActiveClass(id === activeClass ? null : id)
    console.log(`Menu clicked for class ID: ${id}`)
  }

  if (isLoading) {
    return <div className="loading">Loading classes...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return  (
  <div className="classes">
    <div className="classes-container">
      <h1 className="classes-title">My Classes</h1>
      <div className="classes-grid">
        {classes.map((classItem) => (
          <div key={classItem.id} className="class-card">
            <div className="class-header">
              <div className="class-code">{classItem.code}</div>
              <div className="menu-icon" onClick={() => handleMenuClick(classItem.id)}>
                <FaEllipsisV />
              </div>
            </div>
            <div className="class-details">
              <p className="class-description">Description Cours: {classItem.description}</p>
              <p className="class-date">Data: {classItem.day} {classItem.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}

export default Classes
