import { useCities } from "../hooks/useCities";
import { CitiesItems } from "../components/CitiesItems";
import { Message } from "../components/Message";

export const Cities = () => {
  const { visitedCities } = useCities();
  if (!visitedCities.length)
    return (
      <Message
        message="No cities to display. Start exploring!"
        type="absolute"
      />
    );
  return (
    <section>
      <ul className="max-w-lg mx-auto pb-25">
        {visitedCities.map(
          ({ cityName, lat, lon, id, note, emoji, imgUrl, dateVisited }) => (
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
          )
        )}
      </ul>
    </section>
  );
};
