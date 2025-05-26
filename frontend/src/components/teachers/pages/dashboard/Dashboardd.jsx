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
          🔔
        </div>
        <div className="message-icon">💬</div>
        <div className="profile-icon" onClick={toggleProfile}>
          <div className="avatar" />
        </div>
      </div>

      {showNotifications && (
        <div className="notification-dropdown" ref={notificationsRef}>
          <h2>Notifications</h2>
          <div className="notification-card">📌 Notification 1 - Homework</div>
          <div className="notification-card">📌 Notification 2 - Meeting</div>
        </div>
      )}

      {showProfile && (
        <div ref={profileRef}>
          <Profile annuler={annuler} changePassword={changePassword} addProfileInfo={addProfileInfo} />
        </div>
      )}

      <h1 className="dashboard-title">Dashboard</h1>

      {loading && <p>Loading timetable...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="schedule-grid">
          <div className="schedule-header">
            <div className="day-label-header">Day</div>
            {timeSlots.map((slot, idx) => (
              <div key={idx} className="time-slot-header">{slot}</div>
            ))}
          </div>
          {renderScheduleRows()}
        </div>
      )}
    </div>
  )
}

export default Dashboardd