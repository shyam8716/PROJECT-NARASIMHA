import React, { useEffect, useState } from "react";
const UpdateJob = () => {
  const [jobData, setJobData] = useState({
    company: "",
    role: "",
    Applied_Date: "",
    notes: "", 
    email: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState("1");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!jobId) return;

    fetch(`http://127.0.0.1:8000/jobs/Update_Existing_JobApplication_data/${jobId}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setJobData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setMessage(`HTTP error! Status: 404`);
        setLoading(false);
      });
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Updating...");

    fetch(`http://127.0.0.1:8000/jobs/Update_Existing_JobApplication_data/${jobId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setMessage("✅ Job updated successfully!");
      })
      .catch((err) => {
        console.error("Update error:", err);
        setMessage("❌ Failed to update job.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Job</h2>
      <p>{message}</p>

      <label>
        Enter Job ID:
        <input
          type="number"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>

      {loading ? (
        <p>Loading job data...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div>
            <label>Company: </label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Role: </label>
            <input
              type="text"
              name="role"
              value={jobData.role}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Applied Date: </label>
            <input
              type="date"
              name="Applied_Date"
              value={jobData.Applied_Date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={jobData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Notes: </label>
            <textarea
              name="notes" // ✅ corrected here
              value={jobData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label>Status: </label>
            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
            >
              <option value="">-- Select Status --</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

         <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update Job</button>
        </form>
      )}
    </div>
  );
};
export default UpdateJob;