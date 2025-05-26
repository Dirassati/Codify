import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../Students/SearchBar';
import './Teachers.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teachers/list");
        const json = await response.json();
        if (json.status === "success" && Array.isArray(json.data)) {
          setTeachers(json.data);
        } else {
          console.error("Unexpected response structure:", json);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const paginatedData = teachers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="teachers-app">
      <Header title="Teachers" />
      <SearchBar title="teacher" />
      <div className="grid">
        {paginatedData.map((item, idx) => (
          <div className="card" key={idx}>
            <div className="dots">⋮</div>
            <img
              className="avatar"
              src="/images/teacher-logo.png"
              alt="Teacher Logo"
            />
            <h3>{item.first_name} {item.last_name}</h3>
            <p>{item.field || "Unknown Subject"}</p>
            <div className="icons">
              <button className="icon-btn">📞</button>
              <button className="icon-btn">✉️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>&lt;</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={page === idx + 1 ? "active" : ""}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>&gt;</button>
      </div>

      <p className="info">
        Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, teachers.length)} from {teachers.length} teachers
      </p>
      <Outlet />
    </div>
  );
};

export default Teachers;
