"use client"

import { useRef, useState, useEffect } from "react"
import "./dashboard.css"
import Profile from "./Profile"
import UseClickOutside from "../../../../functions/UseClickOutside"

const Dashboardd = () => {
  const profileRef = useRef()
  const notificationsRef = useRef()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [timetableData, setTimetableData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // You'll need to replace this with the actual teacher ID
  const teacherId = 160

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowProfile(false)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
  }

  const annuler = () => {
    setShowProfile(false)
  }

  const addProfileInfo = (info) => {
    //http requests
  }

  const changePassword = (info) => {
    //http requests
  }

  // Fetch timetable data from API
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true)
        const response = await fetch( ` http://localhost:5000/api/timetable/teacher/${teacherId}`)

        if (!response.ok) {
         
          throw new Error("Failed to fetch timetable data")
        }

        const data = await response.json()

        if (data.success) {
          setTimetableData(data.timetable)
        } else {
          throw new Error("API returned unsuccessful response")
        }
      } catch (err) {
        setError(err.message)
        console.error("Error fetching timetable:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTimetable()
  }, [teacherId])

  // Map French day names to display format
  const dayMapping = {
    Dimanche: { number: "1/1", name: "(Sun)" },
    Lundi: { number: "1/2", name: "(Mon)" },
    Mardi: { number: "1/3", name: "(Tue)" },
    Mercredi: { number: "1/4", name: "(Wed)" },
    Jeudi: { number: "1/5", name: "(Thu)" },
    Vendredi: { number: "1/6", name: "(Fri)" },
    Samedi: { number: "1/7", name: "(Sat)" },
  }

  // Time slots for the grid
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "Break", "13:00", "14:00", "15:00", "16:00"]

  // Function to get class info for a specific day and time slot
  const getClassForTimeSlot = (day, timeSlotIndex) => {
    if (!timetableData || !timetableData[day]) return null

    const dayClasses = timetableData[day]

    // Find a class that matches this time slot
    for (const classInfo of dayClasses) {
      const [startTime] = classInfo.timeslot.split("-")
      const startHour = Number.parseInt(startTime.split(":")[0])
      const startMinute = Number.parseInt(startTime.split(":")[1])

      // Map time slot index to actual hours
      let slotHour
      if (timeSlotIndex === 5) return null // Break slot
      if (timeSlotIndex < 5) {
        slotHour = 8 + timeSlotIndex
      } else {
        slotHour = 8 + timeSlotIndex // Accounting for break
      }

      // Check if this class starts at this time slot
      if (
        startHour === slotHour ||
        (startHour < slotHour && startHour + Math.floor(classInfo.duration / 60) > slotHour)
      ) {
        return {
          group: classInfo.group,
          classroom: classInfo.classroom,
          subject: classInfo.subject,
        }
      }
    }

    return null
  }

  // Render schedule rows
  const renderScheduleRows = () => {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

    return days.map((day) => {
      const dayInfo = dayMapping[day]

      return (
        <div key={day} className="schedule-row">
          <div className="day-label">
            <div className="day-number">{dayInfo.number}</div>
            <div className="day-name">{dayInfo.name}</div>
          </div>
          {timeSlots.map((timeSlot, index) => {
            if (timeSlot === "Break") {
              return <div key={index} className="class-cell empty"></div>
            }

            const classInfo = getClassForTimeSlot(day, index)

            return (
              <div key={index} className={`class-cell ${!classInfo ? "empty" : ""}`}>
                {classInfo && (
                  <>
                    <div className="class-info">{classInfo.group}</div>
                    <div className="class-room">{classInfo.classroom}</div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )
    })
  }

  UseClickOutside(notificationsRef, () => {
    setShowNotifications(false)
  })

  return (
    <div className="dashboard-container">
      <div className="header-icons">
        <div className="notification-icon" onClick={toggleNotifications} ref={notificationsRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div className="message-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>

        <div className="profile-icon" onClick={toggleProfile}>
          <div className="avatar"></div>
        </div>
      </div>

      {showNotifications && (
        <div className="notification-dropdown" ref={notificationsRef}>
          <h2 className="notification-title">Notification</h2>
          <div className="notification-subtitle">Home Work</div>
          <div className="notification-card">
            <div className="notification-content">
              <div className="notification-header">
                <h3>Notification 1</h3>
                <button className="menu-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
              <p className="notification-description">Description Course: xxxxxx</p>
            </div>
          </div>
          <div className="notification-card">
            <div className="notification-content">
              <div className="notification-header">
                <h3>Notification 2</h3>
                <button className="menu-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
              <p className="notification-description">Description Course: Axxxxxx</p>
            </div>
          </div>
          <div className="notification-card">
            <div className="notification-content">
              <div className="notification-header">
                <h3>Notification 3</h3>
                <button className="menu-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
              <p className="notification-description">Description Course: Axxxxxx</p>
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div ref={profileRef}>
          <Profile annuler={annuler} changePassword={changePassword} addProfileInfo={addProfileInfo} />
        </div>
      )}

      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon students-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-label">Students</div>
            <div className="stat-value">72</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon classes-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-label">Classes</div>
            <div className="stat-value">07</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon courses-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-label">Courses</div>
            <div className="stat-value">40</div>
          </div>
        </div>
      </div>

      <div className="schedule-container">
        <div className="schedule-header">
          <h2 className="schedule-title">Weekly Schedule</h2>
        </div>

        <div className="schedule-grid">
          <div className="time-slots">
            <div className="day-label"></div>
            {timeSlots.map((slot, index) => (
              <div key={index} className="time-slot">
                {slot}
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#8a94a6" }}>Loading timetable...</div>
          ) : error ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#ff7a59" }}>
              Error loading timetable: {error}
            </div>
          ) : (
            renderScheduleRows()
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboardd
