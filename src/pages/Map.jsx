 import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryString } from "../hooks/useQueryString";
import { useCities } from "../hooks/useCities";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { Button } from "../components/Button";

//Create custom marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const Map = () => {
  const { myPosition, error, getUserGeoLocation, isLoading } = useGeoLocation();
  const [lat, lon] = useQueryString();
  const [position, setPosition] = useState([51.5074, -0.15]);
  const { visitedCities } = useCities();
  const positionToUse = myPosition || position;

  useEffect(() => {
    if (!lat && !lon) return;
    setPosition([lat, lon]);
  }, [lat, lon]);

  return (
    <div className="h-screen relative">
      <MapContainer
        center={positionToUse}
        zoom={6}
        scrollWheelZoom={false}
        className="h-[100vh]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        {visitedCities.map(({ lat, lon, cityName, emoji, id }) => (
          <Marker position={[lat, lon]} key={id} icon={customIcon}>
            <Popup>
              <div className="text-center flex flex-col items-center justify-center">
                <img src={emoji} alt="" className="w-5 mb-1" />
                <span>{cityName}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        {myPosition && (
          <Marker position={myPosition} icon={customIcon}></Marker>
        )}
        <SetView position={positionToUse} myPosition={myPosition} />
        <DetectClick />
      </MapContainer>
      {!myPosition && (
        <Button
          gradient={false}
          onClick={() => {
            getUserGeoLocation();
            if (error)
              alert(
                "Location access is blocked or turned off. Please enable location services in your browser settings and refresh the page."
              );
          }}
          styles="absolute z-9999 shadow-xl rounded-xl left-[50%] top-[5%] text-xs -translate-x-[50%] bg-black/50 text-white"
        >
          {isLoading ? "Loading..." : "Use my location"}
        </Button>
      )}
    </div>
  );
};

const SetView = ({ position, myPosition }) => {
  const [lat, lon] = useQueryString();
  const map = useMap();
  if (!myPosition && !lat && !lon) return;
  map.flyTo(position, 13);

  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(
        `/cities/${new Date().getTime()}?lat=${e.latlng.lat}&lon=${
          e.latlng.lng
        }`
      ),
  });
};

export default Map;