import React, { useState, useEffect } from "react";
import api from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Romance",
  "Horror",
  "Thriller",
  "Fantasy",
  "Science Fiction",
  "Other",
];

const discoColors = ["orange", "purple", "gold", "gray", "violet"];

const getOppositeColor = (color) => {
  switch (color) {
    case "orange":
      return "#003366";
    case "purple":
      return "#ffff66";
    case "gold":
      return "#000080";
    case "gray":
      return "#ff69b4";
    case "violet":
      return "#ffff00";
    default:
      return "#fff";
  }
};

const UpdatePage = () => {
  const [bookid, setBookid] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published_date: new Date(),
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [discoColor, setDiscoColor] = useState(discoColors[0]);

  // Disco color interval
  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor =
        discoColors[Math.floor(Math.random() * discoColors.length)];
      setDiscoColor(randomColor);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setFormData({ ...formData, genre: value });
    setDropdownOpen(false);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, published_date: date });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!bookid) {
      setError("⚠️ Please enter the Book ID to update the record.");
      return;
    }

    try {
      await api.post(
        `/online_library_management/Update_library_api/${bookid}/`,
        {
          title: formData.title,
          author: formData.author,
          genre: formData.genre,
          published_date: formData.published_date
            .toISOString()
            .split("T")[0],
        }
      );
      setSuccess("✅ Book updated successfully!");
      setFormData({
        title: "",
        author: "",
        genre: "",
        published_date: new Date(),
      });
      setBookid("");
    } catch (err) {
      setError(
        `❌ Failed to update book. ${
          err.response?.data ? JSON.stringify(err.response.data) : err.message
        }`
      );
    }
  };

  const oppositeColor = getOppositeColor(discoColor);

  return (
    <div className="container">
      <section className="form-section">
        <h1 className="title" style={{ color: discoColor }}>
          📖 Update Book
        </h1>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleUpdate}>
          <label>Book ID:</label>
          <input
            type="number"
            name="bookid"
            value={bookid}
            onChange={(e) => setBookid(e.target.value)}
            placeholder="Enter Book ID"
            className="blinking input-dark"
            style={{ borderColor: discoColor, color: discoColor }}
            required
          />

          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="blinking input-dark"
            style={{ borderColor: discoColor, color: discoColor }}
            required
          />

          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="blinking input-dark"
            style={{ borderColor: discoColor, color: discoColor }}
            required
          />

          <label>Genre:</label>
          <div
            className="dropdown blinking dropdown-dark"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ borderColor: discoColor, color: discoColor }}
          >
            {formData.genre || "Select Genre"}
            {dropdownOpen && (
              <div
                className="options blinking options-dark"
                style={{ borderColor: discoColor }}
              >
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="option"
                    style={{ color: discoColor }}
                    onClick={() => handleSelect(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>

          <label>Published Date:</label>
          <DatePicker
            selected={formData.published_date}
            onChange={handleDateChange}
            className="date-input blinking input-dark"
            dateFormat="yyyy-MM-dd"
            popperClassName="blinking-calendar"
            calendarClassName="blinking-calendar"
            dayClassName={() => "blinking"}
            style={{ borderColor: discoColor, color: discoColor }}
          />

          <button
            type="submit"
            className="btn blinking"
            style={{ background: discoColor, color: oppositeColor }}
          >
            Update Book
          </button>
        </form>
      </section>

      <style>{`
        @keyframes blink {
          0% { border-color: orange; color: orange; }
          20% { border-color: purple; color: purple; }
          40% { border-color: gold; color: gold; }
          60% { border-color: gray; color: gray; }
          80% { border-color: violet; color: violet; }
          100% { border-color: orange; color: orange; }
        }

        .blinking {
          animation: blink 1s infinite;
        }

        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          justify-content: center;
          align-items: center;
          background: #121212;
          padding: 20px;
        }

        .form-section {
          background: #1e1e1e;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 0 20px #000;
          max-width: 500px;
          width: 100%;
        }

        .title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 30px;
        }

        label {
          display: block;
          margin-top: 15px;
          margin-bottom: 5px;
          font-weight: bold;
          color: #ccc;
        }

        .input-dark {
          width: 100%;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          background: #2c2c2c;
          font-size: 1.1rem;
        }

        .dropdown-dark {
          background: #2c2c2c;
          border-radius: 8px;
          padding: 15px;
          cursor: pointer;
          position: relative;
        }

        .options-dark {
          position: absolute;
          background: #2c2c2c;
          border-radius: 8px;
          width: 100%;
          max-height: 150px;
          overflow-y: auto;
          top: 50px;
          left: 0;
          z-index: 1000;
        }

        .option {
          padding: 10px;
          cursor: pointer;
        }

        .option:hover {
          background: #444;
        }

        .btn {
          width: 100%;
          padding: 15px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          margin-top: 10px;
        }

        .success {
          color: #00ff7f;
          text-align: center;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .error {
          color: #ff4500;
          text-align: center;
          font-weight: bold;
          margin-bottom: 15px;
        }

        /* Datepicker dark theme blinking */
        .blinking-calendar {
          background: #2c2c2c !important;
          color: #fff !important;
          border: 2px solid;
          animation: blink 1s infinite;
        }

        .blinking-calendar .react-datepicker__day,
        .blinking-calendar .react-datepicker__day-name,
        .blinking-calendar .react-datepicker__header {
          animation: blink 1s infinite;
        }

        .blinking-calendar .react-datepicker__day--selected,
        .blinking-calendar .react-datepicker__day--keyboard-selected {
          background-color: ${discoColor} !important;
          color: ${oppositeColor} !important;
        }
      `}</style>
    </div>
  );
};

export default UpdatePage;
