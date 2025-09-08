import { Link, useNavigate } from "react-router-dom";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import { Button } from "./Button";
export const CitiesItems = ({ cityName, lat, lon, note = "", id, emoji }) => {
  const navigate = useNavigate();
  return (
    <li
      className="block text-white mb-4 cursor-pointer relative"
      onClick={() => navigate(`/cities/${id}?lat=${lat}&lon=${lon}`)}
    >
      <div
        className="relative w-full  h-100 rounded-[20px] p-4 overflow-hidden shadow-xl"
        style={{ background: `url(${img}) center/cover ` }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/map?lat=${lat}&lon=${lon}`);
          }}
          styles="px-5 py-1 bg-black/50 backdrop-blur-sm 
          absolute right-4 rounded-full text-sm top-5 z-9999"
        >
          📍 Map
        </Button>
        <div className="bg-gradient-to-t from-5% from-[#0e0e0e]/75 to-95% to-transparent absolute inset-0"></div>
        <div className="absolute bottom-5">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-2xl  max-w-[300px]">{cityName}</h1>{" "}
            <img src={emoji} alt="country-flag" className=" w-[20px]" />
          </div>
          <p className="text-sm  max-w-[350px]">{note}</p>
        </div>
      </div>
    </li>
  );
};
