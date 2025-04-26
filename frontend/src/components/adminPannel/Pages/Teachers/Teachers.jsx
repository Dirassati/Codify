
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../Students/SearchBar';
import './Teachers.css';

const Teachers = () => {
  const dummyData = Array.from({ length: 28 }, (_, i) => ({  // Updated to 114 items for testing
    name: [
      "Dimitres Viga", "Tom Housenburg", "Dana Benevista", "Salvadore Morbeau",
      "Maria Historia", "Jack Sally", "Lula Beatrice", "Nella Vita",
      "Nadia Laravel", "Dakota Farral", "Miranda Adila", "Indiana Barker"
    ][i % 12],
    subject: [
      "Mathematics", "Science", "Art", "Biology",
      "History", "Physics", "Algorithm", "English",
      "Programming", "Science", "Art", "Biology"
    ][i % 12],
    image: `https://i.pravatar.cc/150?img=${i % 70 + 1}`
  }));

  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // 12 items per page
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const paginatedData = dummyData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="teachers-app">
      <Header title="Teachers" />
      <SearchBar title="teacher" />
      <div className="grid">
        {paginatedData.map((item, idx) => (
          <div className="card" key={idx}>
            <div className="dots">⋮</div>
            <img className="avatar" src={item.image} alt="Profile" />
            <h3>{item.name}</h3>
            <p>{item.subject}</p>
            <div className="icons">
              <button className="icon-btn">📞</button>
              <button className="icon-btn">✉️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>&lt;</button>

        {[...Array(totalPages)].map((_, idx) => (  // This dynamically creates the pagination buttons
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
        Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, dummyData.length)} from {dummyData.length} data
      </p>
      <Outlet />
    </div>
    
  );
};

export default Teachers;

