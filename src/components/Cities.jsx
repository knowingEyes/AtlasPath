import { useCities } from "../hooks/useCities";
import { CitiesItems } from "./CitiesItems";
import { Message } from "./Message";

export const Cities = () => {
  const { visitedCities } = useCities();
  if (!visitedCities.length) return <Message message="No Visited Area yet" />;
  return (
    <section className="  mt-5">
      <ul className="max-w-[500px] mx-auto">
        {visitedCities.map(({ city, lat, lon , id}) => (
          <CitiesItems cityName={city} lat={lat} lon={lon} key={id} />
        ))}
      </ul>
    </section>
  );
};
