import React, { useState } from "react";
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

const AddaPage = () => {
  const [formData, setFormData] = useState({
    id: 1,
    title: "my girl friend is an alien",
    author: "fang ling and chai jayoke",
    genre: "Action",
    published_date: new Date(),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await api.post("/online_library_management/Reading_library_api/", {
        ...formData,
        published_date: formData.published_date.toISOString().split("T")[0],
      });
      setSuccess("✅ Book added successfully!");
      setFormData({
        id: "",
        title: "",
        author: "",
        genre: "Action",
        published_date: new Date(),
      });
    } catch (err) {
      setError(
        `❌ Failed to add book. ${
          err.response?.data ? JSON.stringify(err.response.data) : ""
        }`
      );
    }
  };

  return (
    <div className="disco-container">
      <section className="disco-section">
        <h1 className="disco-title">Add New Book</h1>
        {success && <p className="disco-success">{success}</p>}
        {error && <p className="disco-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="disco-label">ID:</label>
          <input
            className="disco-input"
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <label className="disco-label">Title:</label>
          <input
            className="disco-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label className="disco-label">Author:</label>
          <input
            className="disco-input"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <label className="disco-label">Genre:</label>
          <div
            className="disco-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {formData.genre || "--Select Genre--"}
            <div className={`disco-options ${dropdownOpen ? "open" : ""}`}>
              {genres.map((genre) => (
                <div
                  key={genre}
                  className="disco-option"
                  onClick={() => handleSelect(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>

          <label className="disco-label">Published Date:</label>
          <div className="date-wrapper">
            <DatePicker
              selected={formData.published_date}
              onChange={handleDateChange}
              className="disco-date"
              dateFormat="yyyy-MM-dd"
              calendarClassName="disco-calendar"
            />
            <div className="calendar-icon"></div>
          </div>

          <button className="disco-button" type="submit">
            Submit
          </button>
        </form>
      </section>

      <style>{`
        /* Neon Animations */
        @keyframes neon-title {0%,100%{color:#ff073a;}25%{color:#ff6f61;}50%{color:#ffcd38;}75%{color:#00ffea;}}
        @keyframes neon-success {0%,100%{color:#7fff00;}25%{color:#32cd32;}50%{color:#00fa9a;}75%{color:#adff2f;}}
        @keyframes neon-error {0%,100%{color:#00ffff;}25%{color:#1e90ff;}50%{color:#8a2be2;}75%{color:#ff1493;}}
        @keyframes neon-input {0%,100%{border-color:#ff073a;}25%{border-color:#00ffea;}50%{border-color:#7fff00;}75%{border-color:#ff00ff;}}
        @keyframes neon-button {0%,100%{border-color:#ff073a;color:#ff073a;}25%{border-color:#ff6f61;color:#ff6f61;}50%{border-color:#ffcd38;color:#ffcd38;}75%{border-color:#00ffea;color:#00ffea;}}
        @keyframes neon-option {0%,100%{color:#ff073a;}25%{color:#00ffea;}50%{color:#7fff00;}75%{color:#ff00ff;}}
        @keyframes neon-days {
          0%,100%{color:#ff073a;}
          12%{color:#00ffea;}
          25%{color:#ff00ff;}
          37%{color:#7fff00;}
          50%{color:#ff6f61;}
          62%{color:#00ffff;}
          75%{color:#ffcd38;}
          87%{color:#adff2f;}
        }

        /* Container & Section */
        .disco-container {display:flex; justify-content:center; align-items:center; min-height:100vh; background:#121212; font-family:Arial,sans-serif; color:#fff;}
        .disco-section {background:#1e1e1e; padding:40px; border-radius:15px; box-shadow:0 0 30px #ff00ff,0 0 60px #00ffff,0 0 90px #ff073a; width:100%; max-width:500px;}

        /* Titles & Messages */
        .disco-title {animation:neon-title 1s linear infinite; font-size:2em; text-align:center; margin-bottom:20px;}
        .disco-success {animation:neon-success 1s linear infinite; font-weight:bold; text-align:center;}
        .disco-error {animation:neon-error 1s linear infinite; font-weight:bold; text-align:center;}

        /* Labels */
        .disco-label {display:block; margin-top:15px; margin-bottom:5px; font-weight:bold;}

        /* Inputs */
        .disco-input, .disco-date {
          width:100%; padding:10px; border:2px solid #fff; border-radius:5px; background:#121212; color:#fff; outline:none; font-size:1em; margin-bottom:10px;
          animation: neon-input 1s linear infinite; box-shadow:0 0 5px #ff073a,0 0 10px #00ffea,0 0 20px #ff00ff; transition:box-shadow 0.3s;
        }
        .disco-input:hover, .disco-date:hover {box-shadow:0 0 10px #ff073a,0 0 20px #00ffea,0 0 30px #ff00ff;}

        /* Dropdown */
        .disco-dropdown {position:relative; padding:10px; border:2px solid #fff; border-radius:5px; cursor:pointer; background:#121212; animation:neon-input 1s linear infinite;}
        .disco-options {display:none; position:absolute; top:100%; left:0; right:0; background:#1e1e1e; border:2px solid #fff; border-radius:5px; margin-top:5px; z-index:10; max-height:200px; overflow-y:auto;}
        .disco-options.open {display:block;}
        .disco-option {padding:10px; cursor:pointer; animation: neon-option 1s linear infinite;}
        .disco-option:hover {background-color:#222;}

        /* Date wrapper */
        .date-wrapper {position:relative; width:100%;}
        .calendar-icon {position:absolute; right:10px; top:50%; transform:translateY(-50%); width:24px; height:24px; pointer-events:none; animation:neon-input 1s linear infinite;
          background-image:url("data:image/svg+xml,<svg fill='white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 10h5v5H7z'/></svg>"); background-size:cover;
        }

        /* Button */
        .disco-button {width:100%; padding:12px; margin-top:20px; font-size:1em; border:2px solid #ff073a; background:#121212; color:#ff073a; font-weight:bold; border-radius:5px; cursor:pointer; animation:neon-button 1s linear infinite; transition:0.3s;}
        .disco-button:hover {background:#ff073a; color:#121212;}

        /* === DatePicker Calendar (Popup) === */
        .disco-calendar {
          background:#ffffff;  /* white calendar background */
          border:2px solid #ff00ff;
          border-radius:10px;
          box-shadow:0 0 20px #ff00ff,0 0 40px #00ffff;
          color:#000;
        }

        .disco-calendar .react-datepicker__header {
          background:#f8f8f8;
          border-bottom:2px solid #ff00ff;
        }

        .disco-calendar .react-datepicker__day {
          animation: neon-days 1.5s linear infinite;
          font-weight:bold;
        }

        .disco-calendar .react-datepicker__day--selected {
          background:#000 !important;
          color:#ff00ff !important;
          border-radius:50%;
          animation: neon-button 1s linear infinite;
        }

        .disco-calendar .react-datepicker__day:hover {
          background:#222;
          color:#fff;
        }
      `}</style>
    </div>
  );
};

export default AddaPage;

