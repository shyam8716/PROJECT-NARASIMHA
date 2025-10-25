import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios"; // adjust path if needed

const ViewPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetched = useRef(false); // ensures fetch happens only once

  useEffect(() => {
    if (fetched.current) return; // skip if already fetched
    fetched.current = true;

    const fetchBooks = async () => {
      try {
        const response = await api.get("/online_library_management/Reading_library_api/");
        console.log("Fetched data:", response.data); // will log only once
        setBooks(response.data); // backend should return an array
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "15px" }}>
            {book.title && <p><strong>Title:</strong> {book.title}</p>}
            {book.author && <p><strong>Author:</strong> {book.author}</p>}
            {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
            {book.published_date && <p><strong>Published Date:</strong> {book.published_date}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPage;
