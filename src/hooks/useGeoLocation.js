import { useState } from "react";

export const useGeoLocation = () => {
  const [myPosition, setMyPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const delay = 500;

  const getUserGeoLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation)
      return setError("GeoLocation is not supported by your browser");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        setError(error.message);
        setTimeout(() => setIsLoading(false), delay);
      }
    );
  };
  console.log(isLoading);
  return { myPosition, error, getUserGeoLocation, isLoading };
};
