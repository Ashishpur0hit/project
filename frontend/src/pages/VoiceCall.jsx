import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import emailjs from 'emailjs-com';  // Importing EmailJS

const VoiceCall = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  // Function to send email when a user clicks on the "Join" button
  const sendJoinEmail = () => {
    const emailTemplateParams = {
      user_email: 'bishtk.l568@gmail.com',
      room_id: roomId,
      message: `This is an emergency join room with ID: ${roomId}. Please join as soon as possible.`,
      link: `${window.location.origin}/room`, // Current URL with the room ID
    };

    emailjs.send("service_6uz8jie", 'template_nuil0jx', emailTemplateParams, 'YS9J02wwbN5w_WZNs')
      .then((response) => {
        console.log('Email sent successfully', response);
      })
      .catch((error) => {
        console.log('Failed to send email', error);
      });
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    alert('Created a new room');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      alert('ROOM ID & username are required');
      return;
    }

    // Send email
    sendJoinEmail();

    // Redirect to the room
    navigate(`/call`);
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex w-full justify-center items-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              className="w-24 h-24"
              src="https://cdn1.iconfinder.com/data/icons/ui-colored-3/100/UI__1-1024.png"
              alt="code-sync-logo"
            />
          </div>
          <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">
            Paste Invitation ROOM ID
          </h4>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
              style={{
                color: "black",
              }}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
              style={{
                color: "black",
              }}
            />
            <button onClick={joinRoom} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all">
              Join
            </button>
            <div className="text-center text-sm text-gray-600 mt-4">
              If you don't have an invite then create &nbsp;
              <a
                onClick={createNewRoom}
                href=""
                className="text-blue-600 hover:underline"
              >
                new room
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;
