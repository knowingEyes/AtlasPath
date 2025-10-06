import { useEffect } from "react";
import { useCities } from "../hooks/useCities";
import { CountriesItems } from "../components/CountriesItems";
import { Message } from "../components/Message";
import { PEXELS_BASE_URL, pexelsApiToken } from "../config/apiconfig";
import { getCountrFlag } from "../utils/getFlag";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useFetch } from "../hooks/useFetch";
import { getAttrribution } from "../utils/getAttribution";

export const Countries = () => {
  const { visitedCities, countriesVisited } = useCities();
  const [countriesImages, setCountriesImages] = useLocalStorageState(
    [],
    "contriesImages"
  );
  const countries = countriesVisited.map(({ country }) => country);

  //Countries images data from pexels api
  const { data } = useFetch(
    visitedCities.length && PEXELS_BASE_URL,
    pexelsApiToken,
    "promise",
    countries
  );

  /*Create an object of data that includes the photographer
   url and name using the fetched countries images data */
  useEffect(() => {
    if (!data) return;
    const imgSrcAndAtrribute = data.reduce((acc, photos, index) => {
      const countriesCodes = countriesVisited.map(({ code }) => code); // Countries code.
      const flag = getCountrFlag(countriesCodes[index]); // Get countries flags using the countries code and index of the countries.

      //create the countries object
      acc = getAttrribution(acc, photos, 1, flag);
      
      return acc;
    }, []);

    if (!imgSrcAndAtrribute) return;

    setCountriesImages(imgSrcAndAtrribute);
  }, [data, countriesVisited]);

  if (!visitedCities.length)
    return (
      <Message
        message="No countries to display. Start exploring!"
        type="absolute"
      />
    );
  return (
    <section>
      <ul className="pb-25 max-w-[500px] mx-auto">
        {countriesImages.map(
          ({ img, photographer_url, photographer, flag }) => (
            <CountriesItems
              img={img}
              photographerurl={photographer_url}
              photographer={photographer}
              flag={flag}
              key={flag}
            />
          )
        )}
      </ul>
    </section>
  );
};
