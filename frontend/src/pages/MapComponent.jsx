import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, TrafficLayer } from "@react-google-maps/api";
import Sidebar from "../component/Sidebar";

const MapComponent = () => {
  const mapContainerStyle = { width: "100%", height: "100vh" };
  const delhiRedFort = { lat: 29.2186, lng: 79.5156 }; // Patient location

  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false); // Track map loading state
  const [userLocation, setUserLocation] = useState(null); // Track user's real-time location
  const [routeDetails, setRouteDetails] = useState(null); // Store route details
  const [directionsRenderers, setDirectionsRenderers] = useState([]); // Store multiple renderers

  // Remove HTML tags from step instructions
  function removeHTMLTags(inputString) {
    const strippedString = inputString.replace(/<[^>]*>/g, "");
    return strippedString;
  }

  // Fetch real-time user location
  const fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  };

  // Load directions between user and patient
  const loadDirections = () => {
    if (!window.google || !mapRef.current || !userLocation) {
      console.error("Map or location is not ready.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: userLocation,
      destination: delhiRedFort,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        console.log("Directions loaded successfully.");
        const routes = result.routes;

        // Render each route with custom polyline colors
        const renderers = routes.map((route, index) => {
          const renderer = new window.google.maps.DirectionsRenderer({
            directions: result,
            routeIndex: index,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: index === 0 ? "green" : "red", // Green for best route, red for others
              strokeWeight: 5,
            },
          });
          renderer.setMap(mapRef.current);
          return renderer;
        });

        setDirectionsRenderers(renderers);

        // Extract and clean route details
        const routeInfo = routes.map((route, index) => ({
          routeNumber: index + 1,
          duration: route.legs[0].duration.text,
          distance: route.legs[0].distance.text,
          steps: route.legs[0].steps.map((step) => ({
            ...step,
            instructions: removeHTMLTags(step.instructions),
          })),
        }));
        setRouteDetails(routeInfo);
        if (routeInfo[0]?.steps?.length > 0) {
          speakStep(`Route ${routeInfo[0].routeNumber} starts here. ${routeInfo[0].steps[0].instructions}`);
        }
      } else {
        console.error("Directions request failed: ", status);
      }
    });
  };

  // Speak route instructions
  const speakStep = (step) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(step);
      speechSynthesis.speak(speech);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  useEffect(() => {
    if (mapLoaded && userLocation) {
      loadDirections();
    }
  }, [mapLoaded, userLocation]);

  useEffect(() => {
    fetchUserLocation(); // Start fetching real-time user location
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <LoadScript googleMapsApiKey="AIzaSyDM80KzkiLqRMqHE4lEYl-2jGapbssxpBE">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || delhiRedFort} // Fallback to patient location if user location unavailable
          zoom={6}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
        >
          {/* Custom Markers */}
          {userLocation && <Marker position={userLocation} label="A" title="Ambulance (You)" />}
          <Marker position={delhiRedFort} label="B" title="Patient" />

          {/* Traffic Layer */}
          <TrafficLayer />
        </GoogleMap>
      </LoadScript>

      <div className="w-1/5 bg-white p-4 h-screen overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Route Details</h3>
        {routeDetails ? (
          routeDetails.map((route, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-semibold">Route {route.routeNumber}</h4>
              <p>
                <strong>Duration:</strong> {route.duration}
              </p>
              <p>
                <strong>Distance:</strong> {route.distance}
              </p>
              <div>
                <h5 className="font-medium">Route Steps:</h5>
                <ul className="list-disc pl-5">
                  {route.steps.map((step, idx) => (
                    <li key={idx} className="mb-2">
                      {step.instructions}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>Loading route details...</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
