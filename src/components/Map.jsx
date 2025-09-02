import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const Map = () => {
  useEffect(() => {
    async function getCity() {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${ApiToken}&lat=51.503770&lon=-0.12794558&format=json&`
      );
      const data = await res.json();
      console.log(data);
    }

    getCity();
  });
  return (
    <div className="h-screen">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[90%]"
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

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/cities/${12345}`, {
        state: {
          "city image": "",
          note: "",
          id: 0,
          lat: e.latlng.lat,
          lng: e.latlng.lat,
          country: "",
          city: "",
        },
      }),
  });
};

export default Map;
