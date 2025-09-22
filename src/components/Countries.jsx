import { useEffect, useState } from "react";
import { useCities } from "../hooks/useCities";
import { CountriesItems } from "./CountriesItems";
import { Message } from "./Message";
import { PEXELS_BASE_URL, pexelsApiToken } from "../config/apiconfig";
import { getCountrFlag } from "../utils/getFlag";

export const Countries = () => {
  const { visitedCities, countriesVisited } = useCities();
  const [countriesImages, setCountriesImages] = useState(() => {
    const savedItem = localStorage.getItem("visitedCountriesImages");
    return JSON.parse(savedItem) || [];
  });
  useEffect(() => {
    if (!countriesImages.length) return;
    localStorage.setItem(
      "visitedCountriesImages",
      JSON.stringify(countriesImages)
    );
  }, [countriesImages]);
  useEffect(() => {
    async function getCountries() {
      if (!visitedCities.length) return;
      const res = await Promise.all(
        countriesVisited.map(({country}) =>
          fetch(`${PEXELS_BASE_URL}/search?query=${country}`, {
            headers: {
              Authorization: pexelsApiToken,
            },
          })
        )
      );
      const data = await Promise.all(res.map((res) => res.json()));

      const imgSrcAndAtrribute = data.reduce((acc, { photos = {} }, index) => {
        const countriesCodes = countriesVisited.map(({code})=> code)
        const flag = getCountrFlag(countriesCodes[index]);
        acc = [
          ...acc,
          {
            img: photos[0].src.original,
            photographer_url: photos[0].photographer_url,
            photographer: photos[0].photographer,
            flag,
          },
        ];
        return acc;
      }, []);
      setCountriesImages(imgSrcAndAtrribute);
    }
    getCountries();
  }, [visitedCities, countriesVisited]);
  if (!visitedCities.length)
    return (
      <Message
        message="No countries to display. Start exploring!"
        centerMessage={true}
      />
    );
  return (
    <section>
      <ul className="pb-25 max-w-[500px] mx-auto">
        {countriesImages.map(({ img, photographer_url, photographer, flag }) => (
          <CountriesItems
            img={img}
            photographerurl={photographer_url}
            photographer={photographer}
            flag={flag}
          />
        ))}
      </ul>
    </section>
  );
};
