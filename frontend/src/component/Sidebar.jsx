import React from 'react';
import { FaHandHolding,FaPhone,FaRobot, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
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
        <button
          onClick={()=>{
            navigate('/home')
          }}
          className="w-full flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </button>
        <button
          onClick={navigation}
          className="flex w-full items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaUser className="text-lg" />
          <span>Fill Details</span>
        </button>
        <button
          onClick={()=>{navigate('/map')}}
          className=" w-full flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaCog className="text-lg" />
          <span>Map</span>
        </button>

        <button
          onClick={()=>{navigate('/help')}}
          className=" w-full flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaHandHolding className="text-lg" />
          <span>Help & Support</span>
        </button>

        <button
          onClick={()=>{navigate('/bot')}}
          className=" w-full flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaRobot className="text-lg" />
          <span>Virtual Support</span>
        </button>

        <button
          onClick={()=>{navigate('/room')}}
          className=" w-full flex items-center px-4 py-2 space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <FaPhone className="text-lg" />
          <span>Voice Call</span>
        </button>

        
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <button
        onClick={()=>{navigate('/')}}
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
