import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import { useEffect, useState } from "react";
import { useQueryString } from "../hooks/useQueryString";

const Map = () => {
  // const navigate = useNavigate();
  const [lat, lon] = useQueryString();
  const [position, setPosition] = useState([51.505, -0.05]);
  const { getCity, city } = useCities();
  useEffect(() => {
    if (!lat && !lon) return;
    setPosition([lat, lon]);
  }, [lat, lon]);
  return (
    <div className="h-screen">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[100%]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const DetectClick = ({ handleGetCity }) => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      //  handleGetCity(e)
      navigate(`/cities/12?lat=${e.latlng.lat}&lon=${e.latlng.lng}`),
  });
};

export default Map;
