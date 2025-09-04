import { useState } from "react";
import { Button } from "./Button";
import { useLocation } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import { useQueryString } from "../hooks/useQueryString";

export const Form = ({ setIsOpen, cityInfo }) => {
  const [lat, lon] = useQueryString();
  const [note, setNote] = useState("");
  const [dateVisited, setdateVisited] = useState(new Date());
  const { handleNewCity, visitedCities } = useCities();
  const {
    address: { city, country, country_code },
  } = cityInfo;
  const newCity = {
    city,
    id: new Date().getTime(),
    lon,
    lat,
    country,
    country_code,
    city_image: "",
    note,
    dateVisited,
  };
  // console.log(visitedCities)
  return (
    <>
      <form>
        <input
          type="text"
          className="bg-gray-100 ring-1 block w-full mb-2 rounded-sm p-1"
          disabled
          value={city}
        />
        <label
          htmlFor="note"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Leave a note
        </label>
        <textarea
          id="note"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <Button
          styles="px-5 rounded-md py-1 mt-2"
          onClick={(e) => {
            setIsOpen((p) => !p);
            e.preventDefault();
            handleNewCity(newCity);
          }}
        >
          Add
        </Button>
      </form>
    </>
  );
};
