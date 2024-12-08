import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation

const InfoComponent = () => {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use the history hook for programmatic navigation

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/get-patient-data') // Replace with your server URL if deployed
      .then((response) => {
        setPatientData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleClick = (patientLocation) => {
   
  
    // Convert patient location to the correct format (lat, lng)
    const loc = {
      lat: patientLocation.Lat, // Use patientLocation.Lat and patientLocation.Long
      lng: patientLocation.Long  // Use patientLocation.Long as lng
    };
  
    
  
    // Save the patient's location to localStorage in the correct format
    localStorage.setItem('location', JSON.stringify(loc));
  
    // Navigate to /map and pass the patient's location as state (in correct format)
    navigate('/map', { state: { destination: loc } });
  };
  


  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="w-full h-full mx-auto p-4 w-full ">
      <h2 className="text-3xl font-semibold text-center mb-6">Patient Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {patientData.map((patient) => (
          <div
            key={patient._id}
            className="bg-gray-200 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
            onClick={() => handleClick(patient.location)} // Handle click to navigate to map route
          >
            {console.log(patient.location)}
            <h3 className="text-xl font-bold mb-2">Full Name: {patient.fullName}</h3>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Condition:</strong> {patient.condition}</p>
            <p><strong>Location:</strong> {patient.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoComponent;
