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

  const teacherId = 160

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev)
    setShowProfile(false)
  }

  const toggleProfile = () => {
    setShowProfile((prev) => !prev)
    setShowNotifications(false)
  }

  const annuler = () => {
    setShowProfile(false)
  }

  const addProfileInfo = (info) => {
    // Add profile update HTTP call here
  }

  const changePassword = (info) => {
    // Add password change HTTP call here
  }

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/api/timetable/teacher/${teacherId}`)
        if (!res.ok) throw new Error("Failed to fetch timetable")
        const data = await res.json()

        if (data.success) {
          setTimetableData(data.timetable)
        } else {
          throw new Error("API returned unsuccessful response")
        }
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTimetable()
  }, [teacherId])

  const dayMapping = {
    Dimanche: { number: "1/1", name: "(Sun)" },
    Lundi: { number: "1/2", name: "(Mon)" },
    Mardi: { number: "1/3", name: "(Tue)" },
    Mercredi: { number: "1/4", name: "(Wed)" },
    Jeudi: { number: "1/5", name: "(Thu)" },
    Vendredi: { number: "1/6", name: "(Fri)" },
    Samedi: { number: "1/7", name: "(Sat)" },
  }

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "Break", "13:00", "14:00", "15:00", "16:00"]

  const getClassForTimeSlot = (day, index) => {
    if (!timetableData || !timetableData[day]) return null
    if (index === 5) return null // Break

    const slotHour = 8 + (index < 5 ? index : index - 1)
    const classes = timetableData[day]

    for (const cls of classes) {
      const [start] = cls.timeslot.split("-")
      const [hour, minute] = start.split(":").map(Number)
      const durationHours = Math.floor(cls.duration / 60)

      if (hour === slotHour || (hour < slotHour && hour + durationHours > slotHour)) {
        return cls
      }
    }

    return null
  }

  const renderScheduleRows = () => {
    const days = Object.keys(dayMapping)

    return days.map((day) => (
      <div key={day} className="schedule-row">
        <div className="day-label">
          <div className="day-number">{dayMapping[day].number}</div>
          <div className="day-name">{dayMapping[day].name}</div>
        </div>
        {timeSlots.map((time, idx) => {
          if (time === "Break") return <div key={idx} className="class-cell empty break">Break</div>

          const cls = getClassForTimeSlot(day, idx)

          return (
            <div key={idx} className={`class-cell ${cls ? "" : "empty"}`}>
              {cls && (
                <>
                  <div className="class-info">{cls.group}</div>
                  <div className="class-room">{cls.classroom}</div>
                  <div className="class-subject">{cls.subject}</div>
                </>
              )}
            </div>
          )
        })}
      </div>
    ))
  }

  UseClickOutside(notificationsRef, () => setShowNotifications(false))
  UseClickOutside(profileRef, () => setShowProfile(false))

  return (
    <div className="dashboard-container">
      <div className="header-icons">
        <div className="notification-icon" onClick={toggleNotifications} ref={notificationsRef}>
<<<<<<< HEAD
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
=======
          🔔
        </div>
        <div className="message-icon">💬</div>
        <div className="profile-icon" onClick={toggleProfile}>
          <div className="avatar" />
>>>>>>> sara
        </div>
      </div>

      {showNotifications && (
        <div className="notification-dropdown" ref={notificationsRef}>
<<<<<<< HEAD
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
=======
          <h2>Notifications</h2>
          <div className="notification-card">📌 Notification 1 - Homework</div>
          <div className="notification-card">📌 Notification 2 - Meeting</div>
>>>>>>> sara
        </div>
      )}

      {showProfile && (
        <div ref={profileRef}>
          <Profile annuler={annuler} changePassword={changePassword} addProfileInfo={addProfileInfo} />
        </div>
      )}

      <h1 className="dashboard-title">Dashboard</h1>

<<<<<<< HEAD
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
=======
      {loading && <p>Loading timetable...</p>}
      {error && <p className="error">{error}</p>}
>>>>>>> sara

      {!loading && !error && (
        <div className="schedule-grid">
<<<<<<< HEAD
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
=======
          <div className="schedule-header">
            <div className="day-label-header">Day</div>
            {timeSlots.map((slot, idx) => (
              <div key={idx} className="time-slot-header">{slot}</div>
            ))}
          </div>
          {renderScheduleRows()}
>>>>>>> sara
        </div>
      )}
    </div>
  )
}

export default Dashboardd
