import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./Button";
import { useQueryString } from "../hooks/useQueryString";
import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Form } from "./Form";
import { useCities } from "../hooks/useCities";
import { Message } from "./Message";
const LOCATIONIQ_BASE_URL = "https://us1.locationiq.com/v1";
const WIKIPEDIA_BASE_URL = "https://en.wikipedia.org/api/rest_v1";
const locationIqApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const pexelsApiToken = import.meta.env.VITE_PIXELS_TOKEN;
const PEXELS_BASE_URL = "https://api.pexels.com/v1";
const getCountrFlag = (countryCode) =>
  `https://flagcdn.com/w40/${countryCode}.png`;
export const CityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lat, lon] = useQueryString();
  const [cityInfo, setCityInfo] = useState([]);
  const [aboutCity, setAboutCity] = useState({});
  const [cityImage, setCityImage] = useState({});
  const { src: { original: imgSrc } = {} } = cityImage;
  const {
    country: countryName,
    country_code,
    state,
    city_district,
    county,
    region,
    city = state ?? city_district ?? county ?? region,
  } = cityInfo || {};
  const [isOpen, setIsOpen] = useState(false);
  const { visitedCities } = useCities();
  //use global state as a fallback details
  const {
    emoji,
    note,
    city: cityName,
    country,
    country_code: visitedCountryCode,
    imgUrl,
    about,
  } = visitedCities.find((city) => city.id === id) ?? {};
  const isVisited = visitedCities.map(({ id }) => id).includes(id);
  const countryFlag = getCountrFlag(country_code || visitedCountryCode);
  useEffect(() => {
    async function getCity() {
      if (cityName) return;
      if (!lon && !lat) return;
      const res = await fetch(
        `${LOCATIONIQ_BASE_URL}/reverse?key=${locationIqApiToken}&lat=${lat}&lon=${lon}&format=json&`
      );
      const { address } = await res.json();
      setCityInfo(address);
    }
    getCity();
  }, [lat, lon, cityName]);

  useEffect(() => {
    const URLs = [
      `${WIKIPEDIA_BASE_URL}/page/summary/${city ?? cityName}`,
      `${PEXELS_BASE_URL}/search?query=${city}`,
    ];
    async function getMoreCityInfo() {
      if (!city) return;
      const [res1, res2] = await Promise.all([
        fetch(URLs[0]),
        fetch(URLs[1], {
          headers: {
            Authorization: pexelsApiToken,
          },
        }),
      ]);
      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      setAboutCity(data1);
      setCityImage(data2?.photos[3]);
    }
    getMoreCityInfo();
  }, [city, cityName]);
  return (
    <section className="h-screen text-white relative">
      <div
        className="h-[50%] relative"
        style={{
          background: `url(${imgSrc || imgUrl}) center/cover`,
        }}
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
              <h1 className="text-2xl  font-bold max-w-[300px] ">
                {city ?? cityName}
              </h1>
              <p className="text-sm">{countryName ?? country}</p>
              <img
                src={countryFlag ?? emoji}
                alt="Country flag"
                className="absolute top-2 right-0 rounded-sm w-[40px]"
              />
            </header>
            <div className="mt-5 mb-3">
              <h2 className=" mb-1">ABOUT</h2>
              <p className="text-sm text-gray-700">
                {aboutCity?.description ?? about}
              </p>
            </div>
            <div>
              <h2 className=" mb-4 font-inter">HIGHTLIGHT</h2>
            </div>
            <div className="mb-4">
              <h2 className="">NOTES</h2>
              <div className="text-sm bg-gray-100 p-3 rounded-lg mt-1 h-[100px] flex items-center justify-center text-center">
                {isVisited && <p>{note}</p>}
                {!isVisited && (
                  <Message message="Save visit to add and view note." />
                )}
              </div>
            </div>

            {!isVisited && (
              <Button
                styles="rounded-full block w-[100%] mx-auto"
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
        {isOpen && (
          <Form
            setIsOpen={setIsOpen}
            city={city}
            state={state}
            country_code={country_code}
            emoji={countryFlag}
            country={countryName}
            id={id}
            imgUrl={imgSrc}
            about={aboutCity.description}
          />
        )}
      </BottomSheet>
    </section>
  );
};
