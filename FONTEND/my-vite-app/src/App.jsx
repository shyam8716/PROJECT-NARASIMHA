import React from 'react';
import './App.css';
import Routing from './Routing';
import { Routes, Route } from 'react-router-dom';
import AddJob from './JOB APPLICATION TRACKER/AddJob';
import HomePage from './JOB APPLICATION TRACKER/HomePage';
import ViewJob from './JOB APPLICATION TRACKER/ViewJob';
import UpdateJob from './JOB APPLICATION TRACKER/UpdateJob';
import DeleteJob from './JOB APPLICATION TRACKER/DeleteJob';
const App = () => {
  return (
    <div>
      <Routing />
      <Routes>
        <Route path="/AddJob" element={<AddJob />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/ViewJob" element={<ViewJob />} />
        <Route path="/UpdateJob" element={<UpdateJob />} />
        <Route path="/DeleteJob"element={<DeleteJob/>}/>
      </Routes>
    </div>
  );
};
export default App; 