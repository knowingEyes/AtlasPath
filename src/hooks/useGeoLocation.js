import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [myPosition, setMyPosition] = useState(null);
  const [error, setError] = useState(null);

  const getUserGeoLocation = () => {
    if (!navigator.geolocation)
      return setError("GeoLocation is not supported by your browser");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };
  return { myPosition, error, getUserGeoLocation };
};

// export const useGeoLocation = () => {
//   const [position, setMyPosition] = useState(null);
//   const [error, setError] = useState(null);
//   if (!navigator.geolocation) return setError("browser does not support it");
//   navigator.geolocation.getCurrentPosition((pos) => {
//     setMyPosition(
//       {
//         lat: pos.coords.latitude,
//         lon: pos.coords.longitude,
//       },
//       (error) => {
//         setError(error);
//       }
//     );
//   });
// };
