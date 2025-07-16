import React, { useEffect, useRef, useState } from "react";

const GeoLocations = ({ t, config, onSelect, userType, formData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const defaultLocation = { lat: 31.634, lng: 74.8723 }; // Amritsar

  const loadGoogleMapsScript = (callback) => {
    if (window.google && window.google.maps) {
      callback();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASqkAr3d494ihZaJeCOg4CJ3xnQ_83e2s&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    }
  };




  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 14,
    });

    mapInstanceRef.current = map;

    const marker = new window.google.maps.Marker({
      position: defaultLocation,
      map,
    });

    markerRef.current = marker;

    onSelect && onSelect(defaultLocation);


    // Handle map click
    map.addListener("click", (e) => {
      const clickedLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      marker.setPosition(clickedLocation);
      onSelect && onSelect(clickedLocation);
      console.log(clickedLocation, "clickedLocation");
      // Store in sessionStorage
      onSelect(config.key, clickedLocation);


    });

    // Set up autocomplete after the map is initialized
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // restrict to addresses
      });

      autocomplete.bindTo("bounds", map);
      autocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          alert("No location available for the selected place.");
          return;
        }

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        map.panTo(location);
        map.setZoom(16);
        marker.setPosition(location);
        onSelect && onSelect(location);
        onSelect(config.key, clickedLocation);

      });
    }
  };

  useEffect(() => {
    loadGoogleMapsScript(initMap);
  }, []);

  return (
    <div>
      <h2>{t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}</h2>

      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Address"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Google Map */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
};

export default GeoLocations;
