import React, { useState } from 'react';
import './Groupes.css';

const Groupes = () => {
  const [groups, setGroups] = useState([]);
  const [loadingDistribute, setLoadingDistribute] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [error, setError] = useState(null);

  const handleDistribute = async () => {
    setLoadingDistribute(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/groups/distribute', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to distribute groups');
      }
      alert('Groups distributed successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDistribute(false);
    }
  };

  const handleGetGroups = async () => {
    setLoadingGroups(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/groups/list');
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      setGroups(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGroups(false);
    }
  };

  return (
    <div className="groupes-container">
      <h2>Gestion des Groupes</h2>
      <div className="buttons">
        <button onClick={handleDistribute} disabled={loadingDistribute}>
          {loadingDistribute ? 'Distribution en cours...' : 'Distribuer'}
        </button>
        <button onClick={handleGetGroups} disabled={loadingGroups}>
          {loadingGroups ? 'Chargement...' : 'Afficher la liste des groupes'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {groups.length > 0 && (
        <table className="groups-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Année</th>
              <th>Niveau</th>
              <th>Spécialisation</th>
              <th>Salle</th>
              <th>Nombre d'élèves</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td>{group.year}</td>
                <td>{group.level}</td>
                <td>{group.specialization}</td>
                <td>{group.classroom}</td>
                <td>{group.student_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Groupes;
