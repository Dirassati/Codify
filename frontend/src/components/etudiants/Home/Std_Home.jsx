"use client"

import { useState } from "react"
import SearchField from "../SearchField"
import "./Std_Home.css"

// Sample schedule data - this would be fetched from an API in a real application
const scheduleData = {
  days: [
    { id: 1, name: "1/1", fullName: "(Sun)" },
    { id: 2, name: "1/2", fullName: "(Mon)" },
    { id: 3, name: "1/3", fullName: "(Tue)" },
    { id: 4, name: "1/4", fullName: "(Wed)" },
    { id: 5, name: "1/5", fullName: "(Thu)" },
  ],
  timeSlots: ["08:00", "09:00", "10:00", "11:00", "12:00", "Break", "13:00", "14:00", "15:00", "16:00"],
  classes: [
    // Format: day, timeSlot, class, room
    { day: 1, timeSlot: 0, class: "3s1", room: "salle 12" },
    { day: 1, timeSlot: 1, class: "3s1", room: "salle 12" },
    { day: 1, timeSlot: 2, class: "3s1", room: "salle 12" },
    { day: 1, timeSlot: 6, class: "3s1", room: "salle 12" },
    { day: 1, timeSlot: 7, class: "3s1", room: "salle 12" },
    { day: 1, timeSlot: 8, class: "3s1", room: "salle 12" },
    // Day 2
    { day: 2, timeSlot: 0, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 1, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 2, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 6, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 7, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 8, class: "3s1", room: "salle 12" },
    { day: 2, timeSlot: 9, class: "3s1", room: "salle 12" },
    // Day 3 - all slots filled
    { day: 3, timeSlot: 0, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 1, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 2, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 3, class: "3s1", room: "salle 12", highlight: true },
    { day: 3, timeSlot: 4, class: "3s1", room: "salle 12", highlight: true },
    { day: 3, timeSlot: 6, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 7, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 8, class: "3s1", room: "salle 12" },
    { day: 3, timeSlot: 9, class: "3s1", room: "salle 12" },
    // Day 4 - all slots filled
    { day: 4, timeSlot: 0, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 1, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 2, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 3, class: "3s1", room: "salle 12", highlight: true },
    { day: 4, timeSlot: 4, class: "3s1", room: "salle 12", highlight: true },
    { day: 4, timeSlot: 6, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 7, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 8, class: "3s1", room: "salle 12" },
    { day: 4, timeSlot: 9, class: "3s1", room: "salle 12" },
    // Day 5
    { day: 5, timeSlot: 0, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 1, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 2, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 4, class: "3s1", room: "salle 12", highlight: true },
    { day: 5, timeSlot: 6, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 7, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 8, class: "3s1", room: "salle 12" },
    { day: 5, timeSlot: 9, class: "3s1", room: "salle 12" },
  ],
}

const Std_Home = () => {
  const [filteredSchedule, setFilteredSchedule] = useState(scheduleData)

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredSchedule(scheduleData)
      return
    }

    // Filter the schedule based on search term
    // This is a simple implementation - you could make this more sophisticated
    const filteredClasses = scheduleData.classes.filter(
      (classItem) =>
        classItem.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.room.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredSchedule({
      ...scheduleData,
      classes: filteredClasses,
    })
  }

  // Helper function to find a class for a specific day and time slot
  const getClassForSlot = (day, timeSlot) => {
    return filteredSchedule.classes.find((classItem) => classItem.day === day && classItem.timeSlot === timeSlot)
  }

  return (
    <div className="std-home-container">
<div className="search-wrappe">
  <SearchField />
</div>
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
                    >
                      {classItem && (
                        <>
                          <div className="class-name">{classItem.class}</div>
                          <div className="room-name">{classItem.room}</div>
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
