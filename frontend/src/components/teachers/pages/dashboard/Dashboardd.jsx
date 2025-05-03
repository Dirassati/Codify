import { useState } from "react"
import "./dashboard.css"

const Dashboardd = () => {
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className="dashboard-container">
      <div className="header-icons">
        <div className="notification-icon" onClick={toggleNotifications}>
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
        <div className="profile-icon">
          <div className="avatar"></div>
        </div>
      </div>

      {showNotifications && (
        <div className="notification-dropdown">
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

      <h1 className="dashboard-title">Dashboardd</h1>

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
            <div className="time-slot">08:00</div>
            <div className="time-slot">09:00</div>
            <div className="time-slot">10:00</div>
            <div className="time-slot">11:00</div>
            <div className="time-slot">12:00</div>
            <div className="time-slot">Break</div>
            <div className="time-slot">13:00</div>
            <div className="time-slot">14:00</div>
            <div className="time-slot">15:00</div>
            <div className="time-slot">16:00</div>
          </div>

          <div className="schedule-row">
            <div className="day-label">
              <div className="day-number">1/1</div>
              <div className="day-name">(Sun)</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
          </div>

          <div className="schedule-row">
            <div className="day-label">
              <div className="day-number">1/2</div>
              <div className="day-name">(Mon)</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
          </div>

          <div className="schedule-row">
            <div className="day-label">
              <div className="day-number">1/3</div>
              <div className="day-name">(Tue)</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
          </div>

          <div className="schedule-row">
            <div className="day-label">
              <div className="day-number">1/4</div>
              <div className="day-name">(Wed)</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
          </div>

          <div className="schedule-row">
            <div className="day-label">
              <div className="day-number">1/5</div>
              <div className="day-name">(Thu)</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell empty"></div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
            <div className="class-cell">
              <div className="class-info">3s1</div>
              <div className="class-room">salle 12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboardd
