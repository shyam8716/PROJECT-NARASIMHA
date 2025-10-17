import React, { useState } from "react";
const AddJob = () => {
  const [jobData, setJobData] = useState({
    id: 1,
    company: "infosys",
    role: "python developer",
    applied_date: "2025-09-03",
    notes: "I am very glad to apply to this company", 
    email: "meghashyam997@gmail.com",
    phone_number: "7416785615",
    status: "Applied", 
  });
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/jobs/Creating_new_Jobapplication_data/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(JSON.stringify(errData));
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job successfully added:", data);
        alert("Job successfully added!");
        setJobData({
          id: jobData.id + 1,
          company: "",
          role: "",
          applied_date: "",
          notes: "",
          email: "",
          phone_number: "",
          status: "Applied",
        });
        setError(null);
      })
      .catch((err) => {
        console.error("Error adding job:", err);
        setError(err.message);
      });
  };
  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <section className="form">
        <input
          type="number"
          name="id"
          value={jobData.id}
          onChange={handleChange}
          placeholder="ID"
        />
        <br />
        <input
          type="text"
          name="company"
          placeholder="Enter your company"
          value={jobData.company}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="role"
          placeholder="Enter your role"
          value={jobData.role}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="applied_date"
          value={jobData.applied_date}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="notes"
          placeholder="Enter your notes"
          value={jobData.notes}
          onChange={handleChange}
        ></textarea>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={jobData.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter your phone number"
          value={jobData.phone_number}
          onChange={handleChange}
        />
        <br />
        <label>Status: </label>
        <select name="status" value={jobData.status} onChange={handleChange}>
          <option value="">-- Select Status --</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <br />
        <br />
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>
    </div>
  );
};
export default AddJob;