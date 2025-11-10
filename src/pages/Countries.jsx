import { useCities } from "../hooks/useCities";
import { CountriesItems } from "../components/CountriesItems";
import { Message } from "../components/Message";
import { pexelsApiToken } from "../config/apiconfig";
import { getCountryFlag } from "../utils/getFlag";
import { usePromiseFetch } from "../hooks/usePromiseFetch";
import { getAttribution } from "../utils/getAttribution";

export const Countries = () => {
  const { visitedCities, countriesVisited } = useCities();

  const countries = countriesVisited.map(({ country }) => country);

  // Countries images data from pexels api
  const { data } = usePromiseFetch(pexelsApiToken, "countries", countries);

  // Create countries images with attribution info and flags
  const countriesImages = data?.reduce((acc, photos, index) => {
    const countriesCodes = countriesVisited.map(({ code }) => code); // Countries code.
    const flag = getCountryFlag(countriesCodes[index]); // Get countries flags using the countries code and index of the countries.

    // Create the countries object
    acc = getAttribution(acc, photos, 1, { flag, name: 0 });

    return acc;
  }, []);

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
        {countriesImages?.map(
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
