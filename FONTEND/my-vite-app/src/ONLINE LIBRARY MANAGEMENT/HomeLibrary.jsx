import React from 'react'
import { Link } from 'react-router-dom'

const HomeLibrary = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome to the Job Application Tracker
      </h1>
      <p className="text-lg mb-6 text-gray-700">Select an option below:</p>
      <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "><Link to="/ViewPage">View library details</Link></button>
      </div>
    </div>
  )
}

export default HomeLibrary
