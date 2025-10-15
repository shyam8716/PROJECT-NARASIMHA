import React from 'react'
import Routing from './Routing'
import{Routes,Route} from 'react-router-dom'
import AddJob from './JOB APPLICATION TRACKER/AddJob'
import HomePage from './JOB APPLICATION TRACKER/HomePage'
import ViewJob from './JOB APPLICATION TRACKER/ViewJob'
const App = () => {
  return (
    <div>
      <Routing/>
    <Routes>
      <Route path="/AddJob"element={<AddJob/>}></Route>
      <Route path="/"element={<HomePage/>}></Route>
      <Route path="ViewJob"element={<ViewJob/>}></Route>
    </Routes>
    
    </div>
  )
}

export default App
