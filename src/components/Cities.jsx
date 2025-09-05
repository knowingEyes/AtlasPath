
import { useCities } from "../hooks/useCities";
import { CitiesItems } from "./CitiesItems";
import { Message } from "./Message";

export const Cities = () => {
  const { visitedCities } = useCities();
  if (!visitedCities.length) return <Message message="No Visited Area yet" />;
  return (
    <section className="  mt-5">
      <ul className="max-w-[500px] mx-auto pb-10">
        {visitedCities.map(({ city, lat, lon, id, note, emoji }) => (
          <CitiesItems
            key={id}
            cityName={city}
            lat={lat}
            lon={lon}
            note={note}
            id={id}
            emoji={emoji}
          />
        ))}
      </ul>
    </section>
  );
};
//  const b ={  city
// :
// "London"
// city_image
// :
// ""
// country
// :
// "United Kingdom"
// country_code
// :
// "gb"
// dateVisited
// :
// Thu Sep 04 2025 22:16:41 GMT+0100 (West Africa Standard Time) {}
// id
// :
// "1757020597986"
// lat
// :
// "51.51632755391457"
// lon
// :
// "-0.06334304809570314"
// note
// }
// "love this city its so cool"
