import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const navigation = ()=>{
      navigate('/filldetails');
    }
  return (
    
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">MyApp</h1>
      </div>
      <nav className="flex-1 px-4 py-8 space-y-4">
        <a
          href="#home"
          className="flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </a>
        <button
          onClick={navigation}
          className="flex w-full items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaUser className="text-lg" />
          <span>Fill Details</span>
        </button>
        <a
          href="#settings"
          className="flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaCog className="text-lg" />
          <span>Settings</span>
        </a>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          className="flex items-center w-full px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
