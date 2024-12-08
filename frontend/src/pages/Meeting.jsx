import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';

const Meeting = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);

  const startCall = () => {
    setIsCalling(true);
    // Simulate starting a call (Replace with actual logic)
  };

  const acceptCall = () => {
    setIsReceivingCall(false);
    setIsInCall(true);
    // Simulate accepting a call (Replace with actual logic)
  };

  const rejectCall = () => {
    setIsReceivingCall(false);
    // Simulate rejecting a call (Replace with actual logic)
  };

  const endCall = () => {
    setIsInCall(false);
    // Simulate ending the call (Replace with actual logic)
  };

  return (
    <div className='flex'>
        <Sidebar/>
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Voice Call Interface
        </h2>

        {/* Local Audio Stream */}
        <div className="mb-4">
          <h3 className="text-center text-lg font-semibold text-gray-600 mb-2">
            Local Audio
          </h3>
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No one's in the room yet</p>
          </div>
        </div>

        {/* Remote Audio Stream */}
        {isInCall && (
          <div className="mb-4">
            <h3 className="text-center text-lg font-semibold text-gray-600 mb-2">
              Remote Audio
            </h3>
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Remote Audio Stream</p>
            </div>
          </div>
        )}

        {/* Incoming Call or Active Call */}
        {isReceivingCall ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={acceptCall}
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={rejectCall}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        ) : isInCall ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={endCall}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
            >
              End Call
            </button>
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <button
              onClick={startCall}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
            >
              End Call
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Meeting;

