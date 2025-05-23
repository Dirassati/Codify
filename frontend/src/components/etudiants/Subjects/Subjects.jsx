"use client"

import { useState } from "react"
import "./Subjects.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Simple subjects data
const allSubjects = [
  { id: 1, name: "History", image: "" },
  { id: 2, name: "Mathematics", image: "" },
  { id: 3, name: "Music", image: "" },
  { id: 4, name: "Programation", image: "" },
  { id: 5, name: "Geography", image: "" },
  { id: 6, name: "natural sciences", image: "" },
]

// Simple schedule - which subjects are on which days
const schedule = {
  1: [1, 3], // Day 1: History, Music
  5: [2, 4], // Day 5: Mathematics, Programation
  10: [5, 6], // Day 10: Geography, natural sciences
  15: [1, 2], // Day 15: History, Mathematics
  20: [3, 4], // Day 20: Music, Programation
  27: [2, 5, 6], // Day 27: Mathematics, Geography, natural sciences
}

export default function Subjects() {
  const [selectedDay, setSelectedDay] = useState(27)

  // Get subjects for the selected day
  const getSubjectsForDay = (day) => {
    const subjectIds = schedule[day] || []
    return allSubjects.filter((subject) => subjectIds.includes(subject.id))
  }

  // Calendar days
  const days = ["Sun", "Mon", "Tue", "We", "Thu", "Fri", "Sat"]

  // Generate calendar dates for April 2021
  const calendarDates = []
  // Previous month days
  for (let i = 25; i <= 30; i++) {
    calendarDates.push({ day: i, currentMonth: false })
  }
  // Current month days
  for (let i = 1; i <= 30; i++) {
    calendarDates.push({ day: i, currentMonth: true })
  }

  // Get subjects to display
  const subjectsToDisplay = getSubjectsForDay(selectedDay)

  return (
    <div className="subjects-container">
      
      <div className="subjects-content">
        <h1>Subjects</h1>

        {selectedDay && <h2>Subjects for April {selectedDay}, 2021</h2>}

        <div className="subjects-grid">
          {subjectsToDisplay.length > 0 ? (
            subjectsToDisplay.map((subject) => (
              <div key={subject.id} className="subject-card">
                <img src={subject.image || "/placeholder.svg"} alt={subject.name} className="subject-image" />
                <div className="subject-name">{subject.name}</div>
              </div>
            ))
          ) : (
            <div className="no-subjects">No subjects scheduled for this day</div>
          )}
        </div>
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <h3>April 2021</h3>
          <div className="calendar-nav">
            <button>
              <ChevronLeft size={16} />
            </button>
            <button>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {/* Day headers */}
          {days.map((day, index) => (
            <div key={`day-${index}`} className="day-header">
              {day}
            </div>
          ))}

          {/* Calendar dates */}
          {calendarDates.map((date, index) => (
            <div
              key={`date-${index}`}
              className={`calendar-date ${!date.currentMonth ? "other-month" : ""} ${date.currentMonth && date.day === selectedDay ? "selected" : ""} ${date.currentMonth && schedule[date.day] ? "has-subjects" : ""}`}
              onClick={() => date.currentMonth && setSelectedDay(date.day)}
            >
              {date.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
