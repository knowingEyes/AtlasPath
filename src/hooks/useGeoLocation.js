import { useState } from "react";

export const useGeoLocation = () => {
  const [myPosition, setMyPosition] = useState(null);
  const [error, setError] = useState(null);

  const getUserGeoLocation = () => {
    if (!navigator.geolocation)
      return setError("GeoLocation is not supported by your browser");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      (error) => {
        setError(error.message);
      }
    );
  };
  
  return { myPosition, error, getUserGeoLocation };

};



