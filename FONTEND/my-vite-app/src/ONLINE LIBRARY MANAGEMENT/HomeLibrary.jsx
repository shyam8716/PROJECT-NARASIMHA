import React from 'react';
import { Link } from 'react-router-dom';

const HomeLibrary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        Welcome to the Online Library Management
      </h1>
      <p className="text-lg mb-8 text-gray-300 text-center">Select an option below:</p>

      <Link to="/ViewPage" className="disco-link blue">
        View Library Details
      </Link>
      <Link to="/AddPage" className="disco-link green">
        Add New Library Details
      </Link>
      <Link to="/UpdatePage" className="disco-link yellow">
        Update Existing Library Details
      </Link>
      <Link to="/DeletePage" className="disco-link red">
        Delete Existing Library Details
      </Link>
      <style>{`
        .disco-link {
          display: inline-block;
          padding: 15px 35px;
          margin: 10px;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
          color: #fff;
          border-radius: 12px;
          text-align: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
          z-index: 1;
        }
        .disco-link::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          border-radius: inherit;
          opacity: 0.7;
          z-index: -1;
          filter: blur(20px);
          animation: discoGlow 2s infinite alternate;
        }
        .disco-link:hover {
          transform: scale(1.1);
        }
        .disco-link.blue {
          background-color: #111a2c;
        }
        .disco-link.blue::before {
          background: linear-gradient(45deg, #3b82f6, #0ff, #3b82f6);
        }
        .disco-link.green {
          background-color: #0a1f14;
        }
        .disco-link.green::before {
          background: linear-gradient(45deg, #10b981, #0ff, #10b981);
        }
        .disco-link.yellow {
          background-color: #2c220a;
        }
        .disco-link.yellow::before {
          background: linear-gradient(45deg, #facc15, #ff0, #facc15);
        }
        .disco-link.red {
          background-color: #2c0a0a;
        }
        .disco-link.red::before {
          background: linear-gradient(45deg, #ef4444, #f0f, #ef4444);
        }
        @keyframes discoGlow {
          0% { transform: rotate(0deg) scale(1); opacity: 0.6; }
          25% { transform: rotate(45deg) scale(1.05); opacity: 0.8; }
          50% { transform: rotate(90deg) scale(1.1); opacity: 1; }
          75% { transform: rotate(135deg) scale(1.05); opacity: 0.8; }
          100% { transform: rotate(180deg) scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
export default HomeLibrary;