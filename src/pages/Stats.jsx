 import { Bar } from "react-chartjs-2";
import { useCities } from "../hooks/useCities";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Message } from "../components/Message";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

export const Stats = () => {
  const { visitedCities, countriesVisited } = useCities();

  /*This reduce returns an object of visited cities for each visited countries.
   It uses the country reoccurence to get the city count.*/
  const cityCountPerCountry = visitedCities.reduce((acc, { country }) => {
    acc[country.country_name] = (acc[country.country_name] || 0) + 1;
    return acc;
  }, {});

  const mostVisistedCityCount = visitedCities.reduce((acc, { cityName }) => {
    acc[cityName] = (acc[cityName] || 0) + 1;
    return acc;
  }, {});

  const mostVisitedCity = Object.entries(mostVisistedCityCount).reduce(
    (acc, [city, max]) => {
      return max > acc.max ? { city, max } : acc;
    },
    { city: null, max: 0 }
  );

  // Stats Data
  const data = {
    labels: countriesVisited.map(({ country }) => country),
    datasets: [
      {
        label: "Cities visited per country",
        data: Object.values(cityCountPerCountry),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = c.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#121212");
          gradient.addColorStop(1, "#3a3a3a");
          return gradient;
        },
        borderRadius: 10,
      },
    ],
  };
  if(!visitedCities.length) return <Message
          message="Visit a city to see your stats."
          type="fullscreen"
        />
  return (
    <section className="h-max p-4 flex flex-col max-w-[1024px] mx-auto">
          <h1 className="text-lg text-center font-semibold m-3">
            Most visited cities per country
          </h1>
          <Bar className="max-h-70"
            data={data}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  grid: {
                    display: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
          <div
            className="flex justify-evenly mt-5 [&_h4]:text-[1.15rem] [&_h4]:font-bold 
      [&>div]:flex [&>div]:flex-col [&>div]:items-center "
          >
            <div>
              <h4>Total visits</h4>
              <p className="text-2xl">
                <strong>{visitedCities.length}</strong>
              </p>
            </div>
            <div>
              <h4>Most visited city</h4>
              {mostVisitedCity.max > 1 ? (
                <p className="text-2xl">
                  <strong>{mostVisitedCity.city}</strong>
                </p>
              ) : (
                <div className="[&_p]:text-xs">
                  <Message message="Visit a city at least twice to view this stat."></Message>
                </div>
              )}
            </div>
          </div>
        
    </section>
  );
};
