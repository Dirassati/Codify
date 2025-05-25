import React, { useState } from 'react';
import { Loader2, Calendar, Clock, UserRound, MapPin, BookOpen } from 'lucide-react';
import './Users.css';

const Users = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupId, setGroupId] = useState('');

  const generateTimetable = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/timetable/generate/all');
      const data = await response.json();
      
      if (data.success) {
        setTimetable(data.timetable);
      } else {
        setError('Failed to generate timetable');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getGroupTimetable = async () => {
    if (!groupId) {
      setError('Please enter a group ID');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/timetable/${groupId}`);
      const data = await response.json();
      
      if (data.success) {
        setTimetable(data.timetable);
      } else {
        setError('Failed to retrieve timetable');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const days = timetable ? Object.keys(timetable) : [];

  const getSubjectColor = (subject) => {
    const subjects = {
      'Physics': 'bg-blue-50 border-blue-200',
      'Mathématiques': 'bg-purple-50 border-purple-200',
      'Langue arabe': 'bg-green-50 border-green-200'
    };
    return subjects[subject] || 'bg-gray-50 border-gray-200';
  };

  const isAfternoon = (timeSlot) => {
    const startHour = parseInt(timeSlot.split(':')[0]);
    return startHour >= 12;
  };

  return (
    <div className="timetable-container">
      <h1 className="page-title">Timetable Management</h1>

      <div className="actions-container">
        <button 
          className="action-button generate-button"
          onClick={generateTimetable}
          disabled={loading}
        >
          {loading ? <Loader2 className="spin-icon" size={18} /> : <Calendar size={18} />}
          Generate Timetable
        </button>

        <input
          type="text"
          placeholder="Enter Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="group-input"
        />

        <button 
          className="action-button get-button"
          onClick={getGroupTimetable}
          disabled={loading}
        >
          {loading ? <Loader2 className="spin-icon" size={18} /> : <UserRound size={18} />}
          Get Group Timetable
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {timetable && (
        <div className="timetable-content">
          <h2 className="timetable-heading">Weekly Schedule</h2>
          
          <div className="days-container">
            {days.map(day => (
              <div key={day} className="day-column">
                <h3 className="day-title">{day}</h3>

                {timetable[day].length === 0 ? (
                  <div className="no-classes">No classes scheduled</div>
                ) : (
                  <div className="classes-list">
                    {timetable[day].map((session, index) => (
                      <div 
                        key={index} 
                        className={`class-card ${getSubjectColor(session.subject)}`}
                      >
                        <div className="class-header">
                          <h4 className="subject-name">{session.subject}</h4>
                          <div className={`time-badge ${isAfternoon(session.timeslot) ? 'afternoon' : 'morning'}`}>
                            <Clock size={14} />
                            <span>{session.timeslot}</span>
                          </div>
                        </div>

                        <div className="class-details">
                          <div className="detail-item">
                            <UserRound size={14} />
                            <span>{session.teacher}</span>
                          </div>

                          <div className="detail-item">
                            <MapPin size={14} />
                            <span>{session.classroom}</span>
                            <span className="classroom-type">({session.classroom_type})</span>
                          </div>

                          <div className="detail-item">
                            <BookOpen size={14} />
                            <span>{Math.floor(session.duration / 60)}h {session.duration % 60 > 0 ? `${session.duration % 60}m` : ''}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!timetable && !loading && !error && (
        <div className="empty-state">
          <Calendar size={64} />
          <p>Click one of the buttons above to generate or retrieve a timetable</p>
        </div>
      )}
    </div>
  );
};


export default Users;
