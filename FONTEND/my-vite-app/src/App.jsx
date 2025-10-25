import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AddJob from './JOB APPLICATION TRACKER/AddJob';
import HomePage from './JOB APPLICATION TRACKER/HomePage';
import ViewJob from './JOB APPLICATION TRACKER/ViewJob';
import UpdateJob from './JOB APPLICATION TRACKER/UpdateJob';
import DeleteJob from './JOB APPLICATION TRACKER/DeleteJob';
import Routing from './Routing';
import AddaPage from './ONLINE LIBRARY MANAGEMENT/AddaPage';
import ViewPage from './ONLINE LIBRARY MANAGEMENT/ViewPage';
import UpdatePage from './ONLINE LIBRARY MANAGEMENT/UpdatePage';
import DeletePage from './ONLINE LIBRARY MANAGEMENT/DeletePage';
import HomeLibrary from './ONLINE LIBRARY MANAGEMENT/HomeLibrary';
import LibraryRouting from './LibraryRouting';
const App = () => {
  return (
    <div>
      {/* <Routing/> */}
      <LibraryRouting/>
        <Routes>
        {/* <Route path="/AddJob" element={<AddJob />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ViewJob" element={<ViewJob />} />
        <Route path="/UpdateJob" element={<UpdateJob />} />
        <Route path="/DeleteJob"element={<DeleteJob/>}/>  */}
        <Route path="/AddPage"element={<AddaPage/>}/>
        <Route path="/Viewpage"element={<ViewPage/>}/>
        <Route path="/UpdatePage"element={<UpdatePage/>}/>
        <Route path="/Deletepage"element={<DeletePage/>}/>
        <Route path="/HomeLibrary"element={<HomeLibrary/>}/>
      </Routes> 
    </div> 
  );
};
export default App; 