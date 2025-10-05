import { GalleryItems } from "../components/GalleryItems";
import { PEXELS_BASE_URL, pexelsApiToken } from "../config/apiconfig";
import { useFetch } from "../hooks/useFetch";
import { getAttrribution } from "../utils/getAttribution";

const cities = [
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Rome",
  "Berlin",
  "Barcelona",
  "Amsterdam",
  "Dubai",
  "Tokyo",
  "Hong Kong",
  "Singapore",
  "Sydney",
  "Cape Town",
  "Cairo",
  "Rio de Janeiro",
  "Mexico City",
  "Toronto",
  "Istanbul",
  "Bangkok",
];

export const Gallery = () => {
  const { data } = useFetch(PEXELS_BASE_URL, pexelsApiToken, "promise", cities);

  if (!data) return;

  // create the image atttribution object
  const imgSrcAndAtrribute = data.reduce(
    (acc, photos) => (acc = getAttrribution(acc, photos, 5)),
    []
  );

  return (
    <section className="max-w-[1024px] mx-auto">
      <ul className={`grid min-[1024px]:grid-cols-3 grid-cols-2 gap-3`}>
        {imgSrcAndAtrribute.map(
          ({ img, photographer_url, photographer }, i) => (
            <GalleryItems
              key={i}
              cityName={cities[i]}
              imgUrl={img[0]}
              photoGrapherUrl={photographer_url}
              photoGrapher={photographer}
            />
          )
        )}
      </ul>
    </section>
  );
};
