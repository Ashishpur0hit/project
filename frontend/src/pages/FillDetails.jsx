import React, { useState } from "react";
import Sidebar from "../component/Sidebar";


const FillDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    address: "",
    condition: "",
    location: "",
  });

  const [locationStatus, setLocationStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser.");
      return;
    }
    setLocationStatus("Fetching location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = `Lat: ${latitude}, Long: ${longitude}`;
        setFormData((prevData) => ({ ...prevData, location }));
        setLocationStatus("Location fetched successfully!");
      },
      () => {
        setLocationStatus("Unable to fetch location.");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Details submitted successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar></Sidebar>

      {/* Main Content */}
      <div className="flex items-center justify-center w-3/4 p-6">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Patient Details
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700"
              >
                Condition of Emergency
              </label>
              <textarea
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the emergency condition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Location
              </label>
              <button
                type="button"
                onClick={handleLocation}
                className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Use My Current Location
              </button>
              {formData.location && (
                <p className="mt-2 text-sm text-gray-700">{formData.location}</p>
              )}
              {locationStatus && (
                <p className="mt-2 text-sm text-gray-500">{locationStatus}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Details
            </button>
          </form>

          <button
            onClick={() => alert("Emergency Button Clicked!")}
            className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Emergency
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillDetails;
