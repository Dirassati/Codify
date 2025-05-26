import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Activities.css';

function Activities() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes/all-with-averages')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data); 
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="activities__loading">Loading...</div>;

  return (
    <div className="activities">
      <Header title="Gradebook" />

      {Object.entries(data).map(([trimestreKey, groupsObj]) => {
        // Convert groupsObj to array
        const groupsArray = Object.values(groupsObj);

        // Group groups by level (taking level from the first student in the group)
        const groupsByLevel = groupsArray.reduce((acc, group) => {
          const level = group.students[0]?.level || 'unknown';
          if (!acc[level]) acc[level] = [];
          acc[level].push(group);
          return acc;
        }, {});

        return (
          <section key={trimestreKey} className="activities__trimester">
            <h2 className="activities__trimester-title">
              {trimestreKey.replace('_', ' ').toUpperCase()}
            </h2>

            {Object.entries(groupsByLevel).map(([level, groups]) => {
              // Sort groups by group_name inside this level
              groups.sort((a, b) => a.group_name.localeCompare(b.group_name));

              return (
                <div key={level} className="activities__level-group">
                  <h3 className="activities__level-title">{level.toUpperCase()}</h3>
                  <div className="activities__groups">
                    {groups.map(group => (
                      <div key={group.group_id} className="activities__group-card">
                        <h4 className="activities__group-title">{group.group_name}</h4>
                        <table className="activities__table">
                          <thead>
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Level</th>
                              <th>Average</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.students.map(student => (
                              <tr key={student.eleve_id}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.level}</td>
                                <td>{student.moyenne_generale?.toFixed(2) ?? 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

export default Activities;
