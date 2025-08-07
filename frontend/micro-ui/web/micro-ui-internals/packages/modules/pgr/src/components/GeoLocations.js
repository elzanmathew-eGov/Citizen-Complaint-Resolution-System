import React, { useEffect, useRef } from "react";

const GeoLocations = ({ t, config, onSelect, userType, formData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const key = globalConfigs?.getConfig("GMAPS_API_KEY");
  const defaultLocation = { lat: 31.634, lng: 74.8723 }; // Amritsar

  const loadGoogleMapsScript = (callback) => {
    if (window.google && window.google.maps) {
      callback();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    }
  };

  const getPincodeFromLatLng = (lat, lng, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const postalComponent = results[0].address_components.find((c) =>
          c.types.includes("postal_code")
        );
        const pincode = postalComponent?.long_name || null;
        callback(pincode);
      } else {
        console.error("Geocoder failed:", status);
        callback(null);
      }
    });
  };

  const handleLocationSelect = (location) => {
    getPincodeFromLatLng(location.lat, location.lng, (pincode) => {
      const locationWithPincode = { ...location, pincode };
      console.log("Selected Location with Pincode:", locationWithPincode);
      onSelect && onSelect(config.key, locationWithPincode);      
    });
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

    handleLocationSelect(defaultLocation);

    // Map click handler
    map.addListener("click", (e) => {
      const clickedLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      marker.setPosition(clickedLocation);
      handleLocationSelect(clickedLocation);
    });

    // Autocomplete setup
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
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
        handleLocationSelect(location);
      });
    }
  };

  useEffect(() => {
    loadGoogleMapsScript(initMap);
  }, []);

  return (
    <div>
      <h2>{t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}</h2>

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
