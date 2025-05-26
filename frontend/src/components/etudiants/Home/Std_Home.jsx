"use client"

import { useState, useEffect } from "react"
import SearchField from "../SearchField"
import "./Std_Home.css"

const Std_Home = () => {
  const [studentId, setStudentId] = useState(null)
  const [scheduleData, setScheduleData] = useState(null)
  const [filteredSchedule, setFilteredSchedule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get student ID from localStorage
  useEffect(() => {
    const idFromStorage = localStorage.getItem("studentId")
    if (idFromStorage) {
      setStudentId(idFromStorage)
    } else {
      setLoading(false)
    }
  }, [])

  const parseTimeslot = (timeslotString) => {
    try {
      const cleanString = timeslotString.replace(/[[\]"()]/g, "")
      const [startTime, endTime] = cleanString.split(",")

      const startDate = new Date(startTime.trim())
      const endDate = new Date(endTime.trim())

      const formatTime = (date) => {
        return date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      }

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

  const timeToSlotIndex = (hour, minute) => {
    if (hour === 8) return 0
    if (hour === 9) return 1
    if (hour === 10) return 2
    if (hour === 11) return 3
    if (hour === 12) return 4
    if (hour === 13) return 6
    if (hour === 14) return 7
    if (hour === 15) return 8
    if (hour === 16) return 9
    if (hour === 10 && minute === 15) return 3
    return 0
  }

  const transformApiData = (apiData) => {
    const dayMapping = {
      Dimanche: { id: 1, name: "Dim", fullName: "(Sun)" },
      Lundi: { id: 2, name: "Lun", fullName: "(Mon)" },
      Mardi: { id: 3, name: "Mar", fullName: "(Tue)" },
      Mercredi: { id: 4, name: "Mer", fullName: "(Wed)" },
      Jeudi: { id: 5, name: "Jeu", fullName: "(Thu)" },
      Vendredi: { id: 6, name: "Ven", fullName: "(Fri)" },
      Samedi: { id: 7, name: "Sam", fullName: "(Sat)" },
    }

    const days = Object.keys(apiData.timetable)
      .map((dayName) => dayMapping[dayName])
      .filter(Boolean)

    const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "Break", "13:00", "14:00", "15:00", "16:00"]

    const classes = []

    Object.entries(apiData.timetable).forEach(([dayName, dayClasses]) => {
      const dayInfo = dayMapping[dayName]
      if (!dayInfo) return

      dayClasses.forEach((classItem) => {
        const timeInfo = parseTimeslot(classItem.timeslot)
        const slotIndex = timeToSlotIndex(timeInfo.startHour, timeInfo.startMinute)

        classes.push({
          day: dayInfo.id,
          timeSlot: slotIndex,
          class: classItem.subject,
          subject: classItem.subject,
          room: classItem.classroom,
          teacher: classItem.teacher,
          duration: classItem.duration,
          timeRange: `${timeInfo.start}-${timeInfo.end}`,
          highlight: classItem.duration > 60,
        })
      })
    })

    return { days, timeSlots, classes }
  }

  const getClassForSlot = (day, timeSlot) => {
    if (!filteredSchedule) return null
    return filteredSchedule.classes.find((classItem) => classItem.day === day && classItem.timeSlot === timeSlot)
  }

  useEffect(() => {
    const fetchScheduleData = async () => {
      if (!studentId) return

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/api/timetable/student/${studentId}`)
        const tdata = await response.json()
        console.log(tdata)

        if (!response.ok) {
          throw new Error(`Failed to fetch schedule: ${response.status}`)
        }

        if (!tdata.success) {
          throw new Error("API returned unsuccessful response")
        }

        const transformedData = transformApiData(tdata)
        setScheduleData(transformedData)
        setFilteredSchedule(transformedData)
      } catch (err) {
        console.error("Error fetching schedule:", err)
        setError(err.message)

        const fallbackData = {
          days: [
            { id: 1, name: "Dim", fullName: "(Sun)" },
            { id: 2, name: "Lun", fullName: "(Mon)" },
            { id: 3, name: "Mar", fullName: "(Tue)" },
            { id: 4, name: "Mer", fullName: "(Wed)" },
            { id: 5, name: "Jeu", fullName: "(Thu)" },
          ],
          timeSlots: ["08:00", "09:00", "10:00", "11:00", "12:00", "Break", "13:00", "14:00", "15:00", "16:00"],
          classes: [],
        }
        setScheduleData(fallbackData)
        setFilteredSchedule(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchScheduleData()
  }, [studentId])

  const handleSearch = (searchTerm) => {
    if (!scheduleData) return

    if (!searchTerm.trim()) {
      setFilteredSchedule(scheduleData)
      return
    }

    const filteredClasses = scheduleData.classes.filter(
      (classItem) =>
        classItem.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.teacher?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredSchedule({
      ...scheduleData,
      classes: filteredClasses,
    })
  }

  if (!studentId) {
    return (
      <div className="std-home-container">
        <div className="error-container">
          <h2>Student ID Required</h2>
          <p>Please login or provide a valid student ID to view the schedule.</p>
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
          <p>No schedule data found.</p>
          {error && (
            <>
              <p className="error-message">Error: {error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Try Again
              </button>
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

      {error && <div className="warning-banner">Warning: Using fallback data due to API error: {error}</div>}

      <div className="schedule-container">
        <div className="schedule-header">
          <h1>Weekly Schedule</h1>
        </div>

        <div className="timetable">
          <div className="timetable-header">
            <div className="day-column"></div>
            {filteredSchedule.timeSlots.map((timeSlot, index) => (
              <div key={index} className="time-slot-header">
                {timeSlot}
              </div>
            ))}
          </div>

          <div className="timetable-body">
            {filteredSchedule.days.map((day) => (
              <div key={day.id} className="timetable-row">
                <div className="day-label">
                  <div className="day-number">{day.name}</div>
                  <div className="day-name">{day.fullName}</div>
                </div>

                {filteredSchedule.timeSlots.map((_, timeSlotIndex) => {
                  const classItem = getClassForSlot(day.id, timeSlotIndex)
                  return (
                    <div
                      key={timeSlotIndex}
                      className={`time-slot ${classItem?.highlight ? "highlighted" : ""} ${!classItem ? "empty" : ""}`}
                      title={
                        classItem
                          ? `${classItem.subject} - ${classItem.teacher} - ${classItem.room}${
                              classItem.timeRange ? ` (${classItem.timeRange})` : ""
                            }`
                          : ""
                      }
                    >
                      {classItem && (
                        <>
                          <div className="class-name">{classItem.subject}</div>
                          <div className="room-name">{classItem.room}</div>
                          <div className="teacher-name">{classItem.teacher}</div>
                          <div className="time-range">{classItem.timeRange}</div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Std_Home
