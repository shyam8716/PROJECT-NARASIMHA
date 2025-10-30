import React from 'react';
import { Link } from 'react-router-dom';

const LibraryRouting = () => {
  return (
    <header className="bg-gray-900 shadow-2xl">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <a className="flex title-font font-bold items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-12 h-12 p-2 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-xl"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-2xl text-white">LibraryTracker</span>
        </a>

        {/* Navigation Buttons */}
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          <Link to="/HomeLibrary" className="disco-link disco-home">
            Home
          </Link>
          <Link to="/AddPage" className="disco-link disco-add">
            Add library page
          </Link>
          <Link to="/ViewPage" className="disco-link disco-view">
            View existing library page
          </Link>
          <Link to="/UpdatePage" className="disco-link disco-update">
            Update library page
          </Link>
          <Link to="/DeletePage" className="disco-link disco-delete">
            Delete library details
          </Link>
        </nav>
      </div>

      {/* Disco CSS */}
      <style>{`
        .disco-link {
          position: relative;
          display: inline-block;
          padding: 15px 30px;
          font-weight: bold;
          border-radius: 12px;
          text-decoration: none;
          color: #fff;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .disco-link::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 12px;
          z-index: -1;
          filter: blur(20px);
          opacity: 0.7;
        }

        .disco-link:hover {
          transform: scale(1.1);
        }

        /* Home - blue neon flicker */
        .disco-home {
          background-color: #0d1b2a;
          box-shadow: 0 0 10px #3b82f6, 0 0 20px #0ff;
        }
        .disco-home::before {
          background: linear-gradient(45deg, #3b82f6, #0ff, #3b82f6);
          animation: flicker-home 2s infinite alternate;
        }
        @keyframes flicker-home {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 10px #3b82f6, 0 0 20px #0ff; }
          25% { opacity: 1; box-shadow: 0 0 15px #3b82f6, 0 0 30px #0ff; }
          50% { opacity: 0.8; box-shadow: 0 0 12px #3b82f6, 0 0 25px #0ff; }
          75% { opacity: 1; box-shadow: 0 0 18px #3b82f6, 0 0 35px #0ff; }
        }

        /* Add - green pulse */
        .disco-add {
          background-color: #0a1f14;
          box-shadow: 0 0 10px #10b981, 0 0 20px #6ee7b7;
        }
        .disco-add::before {
          background: linear-gradient(45deg, #10b981, #6ee7b7, #10b981);
          animation: pulse-add 2.5s infinite alternate;
        }
        @keyframes pulse-add {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.7; transform: scale(1); }
        }

        /* Update - lime ripple */
        .disco-update {
          background-color: #1a2a0a;
          box-shadow: 0 0 10px #84cc16, 0 0 25px #bef264;
        }
        .disco-update::before {
          background: linear-gradient(90deg, #84cc16, #bef264, #84cc16);
          animation: ripple-update 3s infinite;
        }
        @keyframes ripple-update {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        /* View - pink neon spin */
        .disco-view {
          background-color: #2a0a1a;
          box-shadow: 0 0 10px #ec4899, 0 0 20px #f472b6;
        }
        .disco-view::before {
          background: linear-gradient(45deg, #ec4899, #f472b6, #ec4899);
          animation: spin-view 2.5s linear infinite;
        }
        @keyframes spin-view {
          0% { transform: rotate(0deg); opacity: 0.7; }
          100% { transform: rotate(360deg); opacity: 0.7; }
        }

        /* Delete - red strobe */
        .disco-delete {
          background-color: #2c0a0a;
          box-shadow: 0 0 10px #ef4444, 0 0 20px #f87171;
        }
        .disco-delete::before {
          background: linear-gradient(45deg, #ef4444, #f87171, #ef4444);
          animation: strobe-delete 1.5s infinite alternate;
        }
        @keyframes strobe-delete {
          0%, 100% { opacity: 0.6; }
          10%, 30%, 50%, 70%, 90% { opacity: 1; }
        }
      `}</style>
    </header>
  );
};

export default LibraryRouting;
