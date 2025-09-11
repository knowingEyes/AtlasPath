import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryString } from "../hooks/useQueryString";
import { useCities } from "../hooks/useCities";
import { useGeoLocation } from "../hooks/useGeoLocation";

const Map = () => {
  const {myPosition, error} = useGeoLocation()
  const [lat, lon] = useQueryString();
  const [position, setPosition] = useState([51.565, -0.05]);
  const { visitedCities } = useCities();
  console.log(myPosition)
  useEffect(() => {
    if (!lat && !lon) return;
    setPosition([lat, lon]);
  }, [lat, lon]);
  return (
    <div className="h-screen">
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={false}
        className="h-[100vh]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        {visitedCities.map(({ lat, lon, cityName, emoji, id }) => (
          <Marker position={[lat, lon]} key={id}>
            <Popup>
              <div className="text-center flex flex-col items-center justify-center">
                <img src={emoji} alt="" className="w-5 mb-1" />
                <span>{cityName}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        <SetView position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const SetView = ({ position }) => {
  // const map = useMap();
  // map.flyTo(position, 13);
  // return null;
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
