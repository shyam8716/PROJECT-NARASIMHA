import React, { useState } from 'react';
const AddJob = () => {
  const [jobdata, setjobdata] = useState({
    id: 1,                         // include id
    company: "infosys",
    role: "python developer",
    applied_date: "2025-09-03",
    note: "I am very glad to apply to this company",
    email: "meghashyam997@gmail.com",
    phone_number: "7416785615",
    status: "applied"
  });
  const [error, setError] = useState(null);
  const onchangeevent = (event) => {
    const { name, value } = event.target;
    setjobdata({ ...jobdata, [name]: value });
  };
  const jobinfo = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/jobs/Reading_JobApplication_data/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobdata),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(JSON.stringify(errData));
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job successfully added:", data);
        alert("Job successfully added!");
        setjobdata({ id: jobdata.id + 1, company: "", role: "", applied_date: "", note: "", email: "", phone_number: "", status: "applied" });
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
        <input type="number" name="id" value={jobdata.id} onChange={onchangeevent} /><br />
        <input type="text" name="company" placeholder="Enter your company" value={jobdata.company} onChange={onchangeevent} /><br />
        <input type="text" name="role" placeholder="Enter your role" value={jobdata.role} onChange={onchangeevent} /><br />
        <input type="date" name="applied_date" value={jobdata.applied_date} onChange={onchangeevent} /><br />
        <input type="text" name="note" placeholder="Enter your note" value={jobdata.note} onChange={onchangeevent} /><br />
        <input type="email" name="email" placeholder="Enter your email" value={jobdata.email} onChange={onchangeevent} /><br />
        <input type="number" name="phone_number" placeholder="Enter your phone number" value={jobdata.phone_number} onChange={onchangeevent} /><br />
        <select name="status" value={jobdata.status} onChange={onchangeevent}>
          <option value="Offered">Offered</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Applied">Applied</option>
        </select>
        <br /><br />
        <button type="button" onClick={jobinfo}>Submit</button>
      </section>
    </div>
  );
};
export default AddJob;