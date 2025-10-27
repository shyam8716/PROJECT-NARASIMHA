import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";
const ViewPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    const fetchBooks = async () => {
      try {
        const response = await api.get("/online_library_management/Reading_library_api/");
        setBooks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  if (loading) return <p style={{ color: "cyan", textAlign: "center", fontSize: "20px" }}>Loading books...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>Error: {error}</p>;
  if (books.length === 0) return <p style={{ color: "yellow", textAlign: "center", fontSize: "20px" }}>No books found.</p>;
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "#0f0f0f", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#00ffff", textShadow: "0 0 10px #0ff, 0 0 20px #0ff" }}>
        📚 Viewing Books Library
      </h1>
      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", textAlign: "left" }}>
          <thead>
            <tr>
              <th style={discoHeader("cyan")}>ID</th>
              <th style={discoHeader("magenta")}>Title</th>
              <th style={discoHeader("lime")}>Author</th>
              <th style={discoHeader("yellow")}>Genre</th>
              <th style={discoHeader("orange")}>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, idx) => (
              <tr key={book.id} style={discoRow(idx)}>
                <td style={discoCell}>{book.id}</td>
                <td style={discoCell}>{book.title}</td>
                <td style={discoCell}>{book.author}</td>
                <td style={discoCell}>{book.genre}</td>
                <td style={discoCell}>{book.published_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        @keyframes discoGlowRow {
          0% { background-color: #111; box-shadow: 0 0 5px #0ff; }
          25% { background-color: #1a0a1a; box-shadow: 0 0 10px #f0f; }
          50% { background-color: #111; box-shadow: 0 0 15px #ff0; }
          75% { background-color: #1a0a1a; box-shadow: 0 0 10px #0ff; }
          100% { background-color: #111; box-shadow: 0 0 5px #0ff; }
        }
        @keyframes discoGlowCell {
          0% { color: #0ff; text-shadow: 0 0 5px #0ff; }
          25% { color: #f0f; text-shadow: 0 0 10px #f0f; }
          50% { color: #ff0; text-shadow: 0 0 15px #ff0; }
          75% { color: #0ff; text-shadow: 0 0 10px #0ff; }
          100% { color: #0ff; text-shadow: 0 0 5px #0ff; }
        }
      `}</style>
    </div>
  );
};
const discoHeader = (color) => ({
  padding: "12px",
  borderBottom: `2px solid ${color}`,
  color: color,
  textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
  fontSize: "16px",
  animation: `discoGlowCell 4s infinite alternate`,
});

const discoRow = (idx) => ({
  animation: `discoGlowRow ${3 + (idx % 3)}s infinite alternate`,
});
const discoCell = {
  padding: "12px",
  borderBottom: "1px solid #333",
  animation: `discoGlowCell 2s infinite alternate`,
};
export default ViewPage;