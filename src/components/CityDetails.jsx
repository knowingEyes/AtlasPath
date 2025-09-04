import { FaArrowLeft } from "react-icons/fa";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useQueryString } from "../hooks/useQueryString";
import { useEffect, useState } from "react";
import { useCities } from "../hooks/useCities";
const LOCATIONIQ_BASE_URL = "https://us1.locationiq.com/v1";
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const WIKIPEDIA_BASE_URL = "https://en.wikipedia.org/api/rest_v1";
export const CityDetails = () => {
  const navigate = useNavigate();
  const [lat, lon] = useQueryString();
  const [cityInfo, setCityInfo] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const {
    place_id: id,
    lon: cityLon,
    lat: cityLat,
    address,
    country_code,
  } = cityInfo || {};
  const { handleNewCity } = useCities();
  useEffect(() => {
    async function getCity() {
      if (!lon && !lat) return;
      const res = await fetch(
        `${LOCATIONIQ_BASE_URL}/reverse?key=${ApiToken}&lat=${lat}&lon=${lon}&format=json&`
      );
      const data = await res.json();
      setCityInfo(data);
    }
    getCity();
  }, [lat, lon]);
  useEffect(() => {
    async function getAboutCity() {
      if (!address?.city) return;
      const res = await fetch(
        `${WIKIPEDIA_BASE_URL}/page/summary/${address?.city}`
      );
      const { extract } = await res.json();
      setAboutCity(extract);
    }
    getAboutCity();
  }, [address?.city]);
  return (
    <section className="h-screen text-white relative">
      <div
        className="h-[50%] relative"
        style={{ background: `url(${img}) center/cover` }}
      >
        <button
          className=" mt-20 p-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl text-center absolute w-full bottom-9 font-bold">
          {address?.city}
        </h1>
      </div>
      <div
        className="h-[52%] bg-white rounded-t-[20px]
       p-4 absolute w-full z-10 -translate-y-4 text-black"
      >
        <h1 className="font-bold">About {address?.city}</h1>
        <p className="text-sm ">
          {/* {aboutCity} */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, minus
          possimus, impedit iste quae, ipsam dolores asperiores laborum quis
          ducimus officiis. Aperiam optio quod impedit fuga quas quia!
          Repudiandae, harum!
        </p>
        <Button
        styles="w-full rounded-full"
          onClick={() => {
            navigate("/form", {
              state: {
                cityName: address?.city,
                id : new Date().getTime(),
                lon,
                lat,
                country: address?.country,
                country_code: country_code,
                city_image: "",
              },
            });
          }}
        >
          Save visit{" "}
        </Button>
      </div>
    </section>
  );
};
