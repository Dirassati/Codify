"use client"

import { useState, useEffect } from "react"

import "./Subjects.css"

export default function Subjects() {
  
  const studentId = 189;

  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!studentId) return

    async function fetchSubjects() {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${studentId}/subjects`)
        if (!res.ok) throw new Error("Failed to fetch subjects")
        const json = await res.json()
        if (json.success) {
          setSubjects(json.data)
        } else {
          throw new Error("API returned failure")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [studentId])

  if (loading) return <div className="subjects__loading">Chargement des matières...</div>
  if (error) return <div className="subjects__error">Erreur : {error}</div>

  return (
    <div className="subjects">
      <h2 className="subjects__title">Matières</h2>
      <ul className="subjects__list">
        {subjects.map(({ id, name, description, weekly_hours, is_double_session, coefficient }) => (
          <li key={id} className="subjects__item">
            <h3 className="subjects__name">{name}</h3>
            <p className="subjects__description">{description}</p>
            <div className="subjects__details">
              <span className="subjects__detail">Heures/semaine: {weekly_hours}</span>
              <span className="subjects__detail">Double séance: {is_double_session ? "Oui" : "Non"}</span>
              <span className="subjects__detail">Coefficient: {coefficient}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
