"use client"

import { useState, useEffect } from "react"
import SearchField from "../SearchField"
import "./Std_Home.css"
import { useAuth } from "../../../contexts/AuthContext"

const Std_Home = () => {
    const {user:studentId }= useAuth();
  
  const [scheduleData, setScheduleData] = useState(null)
  const [filteredSchedule, setFilteredSchedule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 // useEffect(() => {
  //  const idFromStorage = localStorage.getItem("studentId")
  //  if (idFromStorage) {
    //  setStudentId(idFromStorage)
    //} else {
    //  setLoading(false)
    //}
  //}, [])

  const parseTimeslot = (timeslotString) => {
    try {
      const cleanString = timeslotString.replace(/[[\]"()]/g, "")
      const [startTime, endTime] = cleanString.split(",")
      const startDate = new Date(startTime.trim())
      const endDate = new Date(endTime.trim())

      const formatTime = (date) =>
        date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })

      return {
        start: formatTime(startDate),
        end: formatTime(endDate),
        startHour: startDate.getHours(),
        startMinute: startDate.getMinutes(),
      }
    } catch (error) {
      console.error("Error parsing timeslot:", error)
      return { start: "00:00", end: "00:00", startHour: 0, startMinute: 0 }
    }
  }

  const transformApiData = (apiData) => {
    const dayMapping = {
      Dimanche: { id: 1, name: "Dim", fullName: "(Sun)" },
      Lundi: { id: 2, name: "Lun", fullName: "(Mon)" },
      Mardi: { id: 3, name: "Mar", fullName: "(Tue)" },
      Mercredi: { id: 4, name: "Mer", fullName: "(Wed)" },
      Jeudi: { id: 5, name: "Jeu", fullName: "(Thu)" },
    }

    const days = Object.keys(apiData.timetable)
      .map((dayName) => dayMapping[dayName])
      .filter(Boolean)

    const classes = []

    Object.entries(apiData.timetable).forEach(([dayName, dayClasses]) => {
      const dayInfo = dayMapping[dayName]
      if (!dayInfo) return

      dayClasses.forEach((classItem, index) => {
        const timeInfo = parseTimeslot(classItem.timeslot)
        classes.push({
          day: dayInfo.id,
          index: index,
          subject: classItem.subject,
          room: classItem.classroom,
          teacher: classItem.teacher,
          duration: classItem.duration,
          timeRange: `${timeInfo.start}-${timeInfo.end}`,
          highlight: classItem.duration > 60,
        })
      })
    })

    return { days, classes }
  }

  const getClassesForDay = (day) => {
    if (!filteredSchedule) return []
    return filteredSchedule.classes
      .filter((classItem) => classItem.day === day)
      .sort((a, b) => a.index - b.index)
  }

  useEffect(() => {
    const fetchScheduleData = async () => {
      if (!studentId) return

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/api/timetable/student/${studentId}`)
        const tdata = await response.json()

        if (!response.ok || !tdata.success) {
          throw new Error("API response error")
        }

        const transformedData = transformApiData(tdata)
        setScheduleData(transformedData)
        setFilteredSchedule(transformedData)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.message)

        const fallback = {
          days: [
            { id: 1, name: "Dim", fullName: "(Sun)" },
            { id: 2, name: "Lun", fullName: "(Mon)" },
            { id: 3, name: "Mar", fullName: "(Tue)" },
            { id: 4, name: "Mer", fullName: "(Wed)" },
            { id: 5, name: "Jeu", fullName: "(Thu)" },
          ],
          classes: [],
        }
        setScheduleData(fallback)
        setFilteredSchedule(fallback)
      } finally {
        setLoading(false)
      }
    }

    fetchScheduleData()
  }, [studentId])

  const handleSearch = (term) => {
    if (!scheduleData) return
    if (!term.trim()) {
      setFilteredSchedule(scheduleData)
      return
    }

    const filtered = scheduleData.classes.filter(
      (c) =>
        c.subject?.toLowerCase().includes(term.toLowerCase()) ||
        c.room?.toLowerCase().includes(term.toLowerCase()) ||
        c.teacher?.toLowerCase().includes(term.toLowerCase())
    )

    setFilteredSchedule({
      ...scheduleData,
      classes: filtered,
    })
  }

  if (!studentId) {
    return (
      <div className="std-home-container">
        <div className="error-container">
          <h2>Student ID Required</h2>
          <p>Please login or provide a valid student ID.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="std-home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your schedule...</p>
        </div>
      </div>
    )
  }

  if (!scheduleData || !filteredSchedule) {
    return (
      <div className="std-home-container">
        <div className="error-container">
          <h2>No Schedule Available</h2>
          <p>Unable to display schedule.</p>
          {error && (
            <>
              <p className="error-message">Error: {error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">Retry</button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="std-home-container">
     <div className="search-wrappe">
  <SearchField onSearch={handleSearch} />
</div>


      {error && <div className="warning-banner">Warning: fallback used due to API error: {error}</div>}

      <div className="schedule-container">
        <div className="schedule-header">
          <h1>Weekly Schedule</h1>
        </div>

        <div className="timetable">
          <div className="timetable-body">
            {filteredSchedule.days.map((day) => (
              <div key={day.id} className="timetable-row">
                <div className="day-label">
                  <div className="day-number">{day.name}</div>
                  <div className="day-name">{day.fullName}</div>
                </div>

                <div className="class-list">
                  {getClassesForDay(day.id).map((classItem, idx) => (
                    <div
                      key={idx}
                      className={`time-slot ${classItem.highlight ? "highlighted" : ""}`}
                      title={`${classItem.subject} - ${classItem.teacher} - ${classItem.room} (${classItem.timeRange})`}
                    >
                      <div className="class-name">{classItem.subject}</div>
                      <div className="room-name">{classItem.room}</div>
                      <div className="teacher-name">{classItem.teacher}</div>
                      <div className="time-range">{classItem.timeRange}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Std_Home