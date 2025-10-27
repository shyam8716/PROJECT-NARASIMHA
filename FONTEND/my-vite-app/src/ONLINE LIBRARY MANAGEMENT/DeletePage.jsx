import React, { useState, useEffect } from "react";
import axios from "axios";

const discoColors = ["#8B0000", "#FF6347", "#A40000", "#B22222", "#800000"]; // Dark red, tomato, blood red tones

const oppositeColors = ["#FFDAB9", "#2F4F4F", "#F5F5DC", "#FFFFE0", "#FFA07A"]; // Opposite/darker shades

const DeletePage = () => {
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const [discoColor, setDiscoColor] = useState(discoColors[0]);
  const [oppositeColor, setOppositeColor] = useState(oppositeColors[0]);

  // Disco blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * discoColors.length);
      setDiscoColor(discoColors[idx]);
      setOppositeColor(oppositeColors[idx]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async () => {
    if (!bookId) {
      setMessage("⚠️ Please enter a Book ID");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/online_library_management/Delete_library_api/${bookId}/`
      );
      setMessage(`✅ Book with ID ${bookId} deleted successfully!`);
      setBookId("");
    } catch (err) {
      setMessage(
        `❌ Failed to delete book. ${
          err.response?.data ? JSON.stringify(err.response.data) : err.message
        }`
      );
    }
  };
  return (
    <div className="container">
      <section className="form-section">
        <h1 className="title" style={{ color: discoColor }}>
          🗑️ Delete Book
        </h1>
        {message && (
          <p
            className="message blinking-message"
            style={{ color: oppositeColor }}
          >
            {message}
          </p>
        )}

        <input
          type="number"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="blinking input-dark"
          style={{ borderColor: discoColor, color: discoColor }}
        />

        <button
          onClick={handleDelete}
          className="btn blinking"
          style={{ backgroundColor: discoColor, color: oppositeColor }}
        >
          Delete Book
        </button>
      </section>
      <style>{`
        @keyframes blink {
          0%, 100% { border-color: #8B0000; color: #8B0000; }
          20% { border-color: #FF6347; color: #FF6347; }
          40% { border-color: #A40000; color: #A40000; }
          60% { border-color: #B22222; color: #B22222; }
          80% { border-color: #800000; color: #800000; }
        }
        @keyframes blink-message {
          0%, 100% { color: #FFDAB9; }
          20% { color: #2F4F4F; }
          40% { color: #F5F5DC; }
          60% { color: #FFFFE0; }
          80% { color: #FFA07A; }
        }
        .blinking {
          animation: blink 1s infinite;
        }
        .blinking-message {
          animation: blink-message 1s infinite;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #1c1c1c;
          padding: 20px;
        }
        .form-section {
          background: #2a2a2a;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 0 20px #000;
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
        }
        .input-dark {
          width: 100%;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 8px;
          background: #3a3a3a;
          font-size: 1.1rem;
          border: 2px solid;
        }
        .btn {
          width: 100%;
          padding: 15px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
        }
        .message {
          margin-bottom: 15px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};
export default DeletePage;