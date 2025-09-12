
import { useCities } from "../hooks/useCities";
import { CitiesItems } from "./CitiesItems";
import { Message } from "./Message";

export const Cities = () => {
  const { visitedCities } = useCities();
  if (!visitedCities.length) return <Message message="No Visited Area yet" />;
  return (
    <section className="  mt-5">
      <ul className="max-w-[500px] mx-auto pb-10">
        {visitedCities.map(({ cityName, lat, lon, id, note, emoji, imgUrl, dateVisited }) => (
          <CitiesItems
            key={id}
            cityName={cityName}
            lat={lat}
            lon={lon}
            note={note}
            id={id}
            emoji={emoji}
            imgUrl={imgUrl}
            dateVisited={dateVisited}
          />
        ))}
      </ul>
    </section>
  );
};
