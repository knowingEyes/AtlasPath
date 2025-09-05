import { useState } from "react";
import { Button } from "./Button";
import { useCities } from "../hooks/useCities";
import { useQueryString } from "../hooks/useQueryString";
import { useParams } from "react-router-dom";

export const Form = ({ setIsOpen, ...options }) => {
  const { id } = useParams();
  const [lat, lon] = useQueryString();
  const [note, setNote] = useState("");
  const [dateVisited, setdateVisited] = useState(new Date());
  const { handleNewCity, visitedCities } = useCities();
  const { city, country, country_code, emoji } = options || {};
  // console.log(options);
  const newCity = {
    city,
    country_code,
    country,
    id,
    lon,
    lat,
    note,
    dateVisited,
    emoji,
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen((p) => !p);
          handleNewCity(newCity);
        }}
      >
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
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <Button styles="px-5 rounded-md py-1 mt-2">Add</Button>
      </form>
    </>
  );
};
