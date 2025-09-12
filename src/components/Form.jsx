import { useState } from "react";
import { Button } from "./Button";
import { useCities } from "../hooks/useCities";
import { useQueryString } from "../hooks/useQueryString";
import DatePicker from "react-datepicker";
import { CountryFlag } from "./CountryFlag";

export const Form = ({ setIsOpen, ...options }) => {
  const [lat, lon] = useQueryString();
  const [note, setNote] = useState("");
  const [dateVisited, setdateVisited] = useState(new Date());
  const { handleNewCity } = useCities();
  const { cityName, country, id, about, emoji, imgUrl } = options || {};
  
  const newCity = {
    cityName,
    country,
    id,
    lon,
    lat,
    note,
    dateVisited,
    emoji,
    imgUrl,
    about,
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsOpen((p) => !p);
        handleNewCity(newCity);
      }}
    >
      <div className="relative">
        <input
          type="text"
          className="bg-gray-100  block w-full mb-2 rounded-md p-3 font-semibold"
          disabled
          value={cityName}
        />
        <CountryFlag
          src={emoji}
          styles="w-7 absolute top-[35%] right-2 object-cover"
        />
      </div>
      <label htmlFor="added" className="block text-sm">
        Visited
      </label>{" "}
      <DatePicker
        className="bg-gray-100 block rounded-md p-3 my-2  font-semibold "
        id="added"
        selected={dateVisited}
        onChange={(date) => setdateVisited(date)}
      />{" "}
      <label
        htmlFor="note"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Leave a note
      </label>
      <textarea
      minLength={30}
        id="note"
        rows="4"
        className="block p-2.5 w-full text-[16px] text-gray-900 bg-gray-100 rounded-lg border border-gray-300
         focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400
          dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        placeholder="Leave a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      ></textarea>
      <Button styles="px-5 rounded-md py-1 mt-4">Add</Button>
    </form>
  );
};
