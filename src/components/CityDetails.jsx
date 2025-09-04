import { FaArrowLeft } from "react-icons/fa";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./Button";
import { useQueryString } from "../hooks/useQueryString";
import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Form } from "./Form";
import { useCities } from "../hooks/useCities";
import { Message } from "./Message";
const LOCATIONIQ_BASE_URL = "https://us1.locationiq.com/v1";
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const WIKIPEDIA_BASE_URL = "https://en.wikipedia.org/api/rest_v1";
export const CityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lat, lon] = useQueryString();
  const [cityInfo, setCityInfo] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const { city, country: countryName } = cityInfo;
  const [isOpen, setIsOpen] = useState(false);
  const { visitedCities } = useCities();
  const {
    note,
    city: cityName,
    country,
  } = visitedCities.find((city) => city.id === id) ?? {};
  const isVisited = visitedCities.map(({ id }) => id).includes(id);
  useEffect(() => {
    async function getCity() {
      if (cityName) return;
      if (!lon && !lat) return;
      const res = await fetch(
        `${LOCATIONIQ_BASE_URL}/reverse?key=${ApiToken}&lat=${lat}&lon=${lon}&format=json&`
      );
      const { address } = await res.json();
      setCityInfo(address);
    }
    getCity();
  }, [lat, lon, cityName]);

  //get about the city from wikipedia
  useEffect(() => {
    async function getAboutCity() {
      if (!city && !cityName) return;
      const res = await fetch(
        `${WIKIPEDIA_BASE_URL}/page/summary/${city ?? cityName}` // fetch using the available city name either from global-state or api data
      );
      const { description } = await res.json();
      setAboutCity(description);
    }
    getAboutCity();
  }, [city, cityName]);
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
      </div>
      <BottomSheet>
        {!isOpen && (
          <>
            <header className="relative">
              {" "}
              <h1 className="text-2xl  font-bold">{city ?? cityName}</h1>
              <p className="text-sm">{countryName ?? country}</p>
              <span className="absolute top-1 right-0 text-xl">🖼</span>
            </header>
            <div className="mt-5 mb-3">
              <h1 className="font-bold">ABOUT</h1>
              <p className="text-sm ">{aboutCity}</p>
            </div>
            <div>
              <h2 className="font-bold mb-4">HIGHTLIGHT</h2>
            </div>
            <div>
              <h2 className="font-bold">Notes</h2>
              <div className="text-sm bg-gray-100 p-3 rounded-lg mt-1">
                {isVisited && <p>{note}</p>}
                {!isVisited && (
                  <Message message="Save visit to add and view note." />
                )}
              </div>
            </div>

            {!isVisited && (
              <Button
                styles=" rounded-full w-full"
                onClick={() => setIsOpen((p) => !p)}
              >
                Save visit
              </Button>
            )}
            {isVisited && (
              <Button styles=" rounded-full w-full">Visited</Button>
            )}
          </>
        )}
        {isOpen && <Form setIsOpen={setIsOpen} cityInfo={cityInfo} />}
      </BottomSheet>
    </section>
  );
};
