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

const Map = () => {
  // const navigate = useNavigate();
  const [lat, lon] = useQueryString();
  const [position, setPosition] = useState([51.565, -0.05]);
  // const { getCity, city } = useCities();
  useEffect(() => {
    if (!lat && !lon) return;
    setPosition([lat,lon]);
  }, [lat, lon]);
  return (
    <div className="h-screen">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        className="h-[100%]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetView position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  ); 
};

const SetView = ({ position }) => {
  const map = useMap();
  map.setView(position);
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
