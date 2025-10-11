import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { CountryFlag } from "./CountryFlag";
import { dateFormatter } from "../utils/dateFormatter";


export const CitiesItems = ({
  cityName,
  lat,
  lon,
  note = "",
  id,
  emoji,
  imgUrl,
  dateVisited,
}) => {
  const formattedDate = dateFormatter(dateVisited);
  const navigate = useNavigate();
  return (
    <li
      className="block text-white mb-4 cursor-pointer relative"
      onClick={() => navigate(`/cities/${id}`)}
    >
      <div
        className="relative w-full  h-100 rounded-[20px] p-4 overflow-hidden shadow-xl"
        style={{ background: `url(${imgUrl}) center/cover ` }}
      >
        <Button
          gradient={false}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/app/map?lat=${lat}&lon=${lon}`);
          }}
          styles="px-5 py-1 bac 
          absolute right-4 rounded-full text-sm top-5 z-9999 backdrop-blur-sm bg-black/50"
        >
          📍 Map
        </Button>
        <div className="bg-gradient-to-t from-10% from-[#0e0e0e]/75 to-30% to-transparent absolute inset-0 "></div>
        <div className="absolute bottom-5 z-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-2xl  max-w-[300px]">{cityName}</h1>{" "}
            <CountryFlag src={emoji} styles=" w-[20px]" />
          </div>
          <p className="text-sm  max-w-[350px]">{note}</p>
          <span className="text-[11px]">{formattedDate}</span>
        </div>
      </div>
    </li>
  );
};
