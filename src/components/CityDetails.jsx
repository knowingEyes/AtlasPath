import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./Button";
import { useQueryString } from "../hooks/useQueryString";
import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Form } from "./Form";
import { useCities } from "../hooks/useCities";
import { Message } from "./Message";
import { CountryFlag } from "./CountryFlag";
import { PhotoAttribution } from "./PhotoAttribution";
import {
  LOCATIONIQ_BASE_URL,
  locationIqApiToken,
  PEXELS_BASE_URL,
  pexelsApiToken,
  WIKIPEDIA_BASE_URL,
} from "../config/apiconfig";
import { getCountrFlag } from "../utils/getFlag";


export const CityDetails = () => {
  const { id } = useParams();
  const [lat, lon] = useQueryString();
  const { visitedCities } = useCities();
  const [cityInfo, setCityInfo] = useState([]);
  const [aboutCity, setAboutCity] = useState(null);
  const [cityImage, setCityImage] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const {
    src: { original: imgSrc } = {},
    photographer,
    photographer_url,
  } = cityImage || {};

  // Default City Details from an Api data from LocationIQ
  const {
    country: countryName,
    country_code,
    state,
    city_district,
    county,
    region,
    city = state ?? city_district ?? county ?? region,
  } = cityInfo || {};
  
  // Read from global State and use as a fallback City image
  const { imgUrl } = visitedCities.find((city) => city.id === id) ?? {};

  //Check if a city is already visited
  const isVisited = visitedCities.map(({ id }) => id).includes(id);

  const countryFlag = getCountrFlag(country_code);

  // Fetch a city using reverse geocoding API with city coordinates(lat and lon) from LocationIQ
  useEffect(() => {
    async function getCity() {
      if (!lon && !lat) return;
      const res = await fetch(
        `${LOCATIONIQ_BASE_URL}/reverse?key=${locationIqApiToken}&lat=${lat}&lon=${lon}&format=json&`
      );
      const { address } = await res.json();
      setCityInfo(address);
    }
    getCity();
  }, [lat, lon, city]);

  // Fetch city image from unsplash and about the city from wikipedia
  useEffect(() => {
    if (!city) return;
    const URLs = [
      `${WIKIPEDIA_BASE_URL}/page/summary/${city}`,
      `${PEXELS_BASE_URL}/search?query=${city}`,
    ];
    async function getMoreCityInfo() {
      const [res1, res2] = await Promise.all([
        fetch(URLs[0]),
        fetch(URLs[1], {
          headers: {
            Authorization: pexelsApiToken,
          },
        }),
      ]);
      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      setAboutCity(data1?.description);
      setCityImage(data2?.photos[Math.floor(Math.random() * 3) + 1]);
    }
    getMoreCityInfo();
  }, [city]);

  return (
    <section className="h-screen text-white relative overflow-y-hidden">
      <CityDetailsHero imgUrl={imgUrl} imgSrc={imgSrc} cityImage={cityImage}>
        <PhotoAttribution
          PhotoGraperName={photographer}
          photoGrapherUrl={photographer_url}
        />
      </CityDetailsHero>

      <BottomSheet>
        {!isOpen && (
          <CityDetailsContent
            isVisited={isVisited}
            countryName={countryName}
            cityName={city}
            aboutCity={aboutCity}
            countryFlag={countryFlag}
            id={id}
            setIsOpen={setIsOpen}
          />
        )}
        {isOpen && (
          <Form
            setIsOpen={setIsOpen}
            cityName={city}
            emoji={countryFlag}
            imgUrl={imgSrc}
            country={{country_name : countryName, country_code : country_code}}
            id={id}
            about={aboutCity}
          />
        )}
      </BottomSheet>
    </section>
  );
};

const CityDetailsContent = ({
  isVisited,
  countryName,
  cityName,
  aboutCity,
  countryFlag,
  id,
  setIsOpen,
}) => {
  const { visitedCities } = useCities();

  // Read from global State and use as a fallback City details
  const {
    emoji,
    note,
    cityName: visitedCityName,
    country: visitedCountryName,
    about,
  } = visitedCities.find((city) => city.id === id) ?? {};

  const aboutCityToUse = aboutCity || about;
  return (
    <>
      <header className="relative">
        <h1 className="text-2xl  font-bold max-w-[300px] ">
          {cityName ?? visitedCityName}
        </h1>
        <p className="text-sm">{countryName ?? visitedCountryName?.country_name}</p>
        <CountryFlag
          src={emoji || countryFlag}
          styles="absolute top-2 right-0 rounded-sm w-[40px]"
        />
      </header>
      <div className="mt-5 mb-3 [&_p]:text-left">
        <h2 className=" mb-1">ABOUT</h2>
        {!aboutCityToUse ? (
          <Message message="No information available for this location." />
        ) : (
          <p className="text-sm text-gray-700">{aboutCityToUse}</p>
        )}
      </div>
      <div>
        <h2 className=" mb-4 font-inter">HIGHTLIGHT</h2>
      </div>
      <div className="mb-4">
        <h2 className="">NOTES</h2>
        <div className="text-sm bg-gray-100 p-3 rounded-lg mt-1 h-[100px] flex items-center justify-center text-center">
          {isVisited ? (
            <p>{note}</p>
          ) : (
            <Message message="Save visit to add and view note." />
          )}
        </div>
      </div>
      <div className="[&>button]:rounded-full [&>button]:min-w-[100%]">
       {!isVisited ? (
          <Button
            onClick={() => setIsOpen((p) => !p)}
          >
            Save visit
          </Button>
        ) : (
          <Button>Visited</Button>
        )}
        </div>
    </>
  );
};

const CityDetailsHero = ({ imgSrc, imgUrl, children }) => {
  const navigate = useNavigate();
  const imageToUse = imgSrc || imgUrl;
  return (
    <>
      <div
        className="h-[50%] relative [&_p]:text-white"
        style={{
          background: `${
            imageToUse
              ? `url(${imageToUse}) center/cover`
              : "linear-gradient(to top, #3b82f6, #ef4444)"
          }`,
        }}
      >
        <Button
          styles="p-3 cursor-pointer  rounded-full ml-3 absolute top-10 "
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </Button>
        {!imgSrc && !imgUrl && (
          <Message
            message="No image available for this location"
            centerMessage={true}
          />
        )}
        {children}
      </div>
    </>
  );
};
