import { BounceLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/Button";
import { useQueryString } from "../hooks/useQueryString";
import { useState } from "react";
import { BottomSheet } from "../components/BottomSheet";
import { Form } from "../components/Form";
import { useCities } from "../hooks/useCities";
import { Message } from "../components/Message";
import { CountryFlag } from "@/components/CountryFlag";
import { PhotoAttribution } from "../components/PhotoAttribution";

import {
  LOCATIONIQ_BASE_URL,
  locationIqApiToken,
  PEXELS_BASE_URL,
  pexelsApiToken,
  WIKIPEDIA_BASE_URL,
} from "../config/apiconfig";

import { getCountryFlag } from "../utils/getFlag";
import { useTanStackFetch } from "../hooks/useTanStackFetch";
import { toast } from "sonner";

import { DropdownMenuDialog } from "@/components/DropdownMenuDialog";

export const CityDetails = () => {
  const { id } = useParams();
  const [lat, lon] = useQueryString();
  const { visitedCities } = useCities();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch City Details from LocationIQ
  const {
    data: cityInfo,
    isLoading,
    error,
  } = useTanStackFetch(
    `${LOCATIONIQ_BASE_URL}/reverse?key=${locationIqApiToken}&lat=${lat}&lon=${lon}&format=json&`,
    "cityInfo",
    Boolean(lat && lon)
  );

  // Default City details from LocationIQ
  const {
    country: countryName,
    country_code,
    state,
    city_district,
    county,
    region,
    city = state ?? city_district ?? county ?? region,
  } = cityInfo?.address || {};

  // Fetch City summary from Wikipedia
  const { data: aboutCity, isLoading: isAboutLoading } = useTanStackFetch(
    `${WIKIPEDIA_BASE_URL}/page/summary/${city}`,
    "aboutCity",
    Boolean(city)
  );

  // Fetch City Image from Pexels
  const { data: cityImage, isLoading: isImgLoading } = useTanStackFetch(
    `${PEXELS_BASE_URL}/search?query=${city}`,
    "cityImage",
    Boolean(city),
    pexelsApiToken
  );

  //Destructure the cityimage form pexels to get photo url and photo attribution
  const {
    src: { original: imgSrc } = {},
    photographer,
    photographer_url,
  } = cityImage?.photos[1] || {};

  // Read from global State and use as a fallback City image
  const { imgUrl } = visitedCities.find((city) => city.id === id) || {};

  //Check if a city is already visited
  const isVisited = visitedCities.some((city) => id === city.id);

  const countryFlag = getCountryFlag(country_code);

  if (error?.message === "Failed to fetch")
    return (
      <Message
        message="We can't load new cities right now - check your connection and try again."
        type="fullscreen"
      />
    );

  if (isLoading || isImgLoading || isAboutLoading)
    return (
      <Message message="Fetching city details..." type="fullscreen">
        <BounceLoader />
      </Message>
    );

  if (!cityInfo && lat && lon && !error)
    return (
      <div className="h-screen">
        <Message
          message="This location doesn't correspond to a city. Please choose a valid city location"
          type="fullscreen"
        />
      </div>
    );

  return (
    <>
      {!isLoading && !isImgLoading && !isAboutLoading && (
        <section className="h-screen text-white relative max-w-[1024px] mx-auto shadow-xl">
          <CityDetailsHero
            imageToUse={imgSrc || imgUrl}
            cityImage={cityImage}
            isLoading={isImgLoading}
            isVisited={isVisited}
          >
            <PhotoAttribution
              PhotoGrapherName={photographer}
              photoGrapherUrl={photographer_url}
            />
          </CityDetailsHero>

          <BottomSheet>
            {!isOpen && (
              <CityDetailsContent
                isVisited={isVisited}
                countryName={countryName}
                cityName={city}
                aboutCity={aboutCity?.description}
                countryFlag={countryFlag}
                id={id}
                setIsOpen={setIsOpen}
                isLoading={isAboutLoading}
                imgSrc={imgSrc}
              />
            )}
            {isOpen && (
              <Form
                setIsOpen={() => setIsOpen((p) => !p)}
                cityName={city}
                emoji={countryFlag}
                imgUrl={imgSrc}
                country={{
                  country_name: countryName,
                  country_code: country_code,
                }}
                id={id}
                about={aboutCity?.description}
              />
            )}
          </BottomSheet>
        </section>
      )}
    </>
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
  imgSrc,
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

  // Use city summary from global state if available
  const aboutCityToUse = aboutCity || about;

  return (
    <>
      <header className="relative">
        <h1 className="text-2xl  font-bold max-w-[300px] ">
          {cityName ?? visitedCityName}
        </h1>
        <p className="text-sm">
          {countryName ?? visitedCountryName?.country_name}
        </p>
        <CountryFlag
          src={emoji || countryFlag}
          styles="absolute top-2 right-0 rounded-sm w-[40px]"
        />
      </header>

      <div className="mt-5 mb-3 [&_p]:text-left">
        <h2 className=" mb-1">ABOUT</h2>
        {!aboutCityToUse ? (
          <div className="[&>p]:text-sm">
            {" "}
            <Message message="No information available for this location." />
          </div>
        ) : (
          <p className="text-sm text-gray-700">{aboutCityToUse}</p>
        )}
      </div>

      <div>
        <h2 className=" mb-4">HIGHLIGHT</h2>
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
      <p></p>
      <div className="[&>button]:rounded-full [&>button]:w-full [&>button]:text-white [&>p]:text-center [&>p]:text-sm [&>p]:mt-2 fixed w-full left-[50%] translate-x-[-50%] bottom-5 px-5 z-999 max-w-[1024px] ">
        {/*  Show Save visit button only if the city is not visited and has an image*/}
        {!isVisited && imgSrc && (
          <Button onClick={() => setIsOpen(true)} disabled={!imgSrc}>
            Save visit
          </Button>
        )}
        {/*  Show Visited button only if the city is visited */}
        {isVisited && <Button>Visited</Button>}

        {!imgSrc && !isVisited && (
          <Button
            onClick={() =>
              toast.info(
                "This location doesn't have complete details yet. Let's save only cities that we can show beautifully."
              )
            }
          >
            Save visit
          </Button>
        )}
      </div>
    </>
  );
};

const CityDetailsHero = ({ imageToUse, children, isVisited }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-[50%] relative [&_p]:text-white "
      style={{
        background: `${
          imageToUse
            ? `url(${imageToUse}) center/cover`
            : "linear-gradient(to top, #3b82f6, #ef4444)"
        }`,
      }}
    >
      <header className="p-3 pt-10 flex items-center justify-between">
        <Button
          styles="p-3  cursor-pointer rounded-full"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </Button>

        {Boolean(isVisited) && <DropdownMenuDialog />}
      </header>

      {!imageToUse && (
        <Message
          message={"No image available for this location"}
          type="absolute"
        />
      )}

      {children}
    </div>
  );
};
