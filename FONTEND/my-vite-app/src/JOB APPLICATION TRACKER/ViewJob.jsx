import React, { useEffect, useState } from "react";
const ViewJob = () => {
  const [jobs, setJobs] = useState([]); 
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs/Reading_JobApplication_data/?format=json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data); 
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []); 
  if (error) return <h2>Error: {error}</h2>;
  if (jobs.length === 0) return <h2>Loading job details...</h2>;
  return (
    <div className="p-4">
      {jobs.map((job) => (
        <div key={job.id}className="border rounded-lg shadow-md p-3 mb-4 bg-white">
          <h2>ID: {job.id}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Role:</strong> {job.role}</p>
          <p><strong>Applied Date:</strong> {job.applied_date}</p>
          <p><strong>Notes:</strong> {job.notes}</p>
          <p><strong>Email:</strong> {job.email}</p>
          <p><strong>Phone Number:</strong> {job.phone_number}</p>
          <p><strong>Status:</strong> {job.status}</p>
        </div>
      ))}
    </div>
  );
};
export default ViewJob;
