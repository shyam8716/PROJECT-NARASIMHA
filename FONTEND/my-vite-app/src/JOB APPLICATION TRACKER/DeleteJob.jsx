import React, { useState } from "react";
const DeleteJob = () => {
  const [jobId, setJobId] = useState("");
  const [message, setMessage] = useState("");
  const handleDelete = () => {
    if (!jobId) {
      setMessage("❌ Please enter a Job ID to delete.");
      return;
    }
    fetch(`http://127.0.0.1:8000/jobs/Delete_JobApplication_data/${jobId}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMessage("✅ Job deleted successfully!");
        setJobId(""); 
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setMessage("❌ Failed to delete job.");
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Job</h2>
      <p>{message}</p>
      <label>
        Enter Job ID to delete:{" "}
        <input
          type="number"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />
      </label>
      <br />
      <button
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleDelete}
      >
        Delete Job
      </button>
    </div>
  );
};
export default DeleteJob;