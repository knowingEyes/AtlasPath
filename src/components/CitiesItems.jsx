import { Link } from "react-router-dom";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
export const CitiesItems = ({ cityName, lat, lon, note = "", id, emoji}) => {
  return (
    <li className="block text-white mb-4">
      <Link to={`/cities/${id}?lat=${lat}&lon=${lon}`}>
        <div
          className="relative w-full  h-100 rounded-[20px] p-3 overflow-hidden"
          style={{ background: `url(${img}) center/cover ` }}
        >
          <div className="bg-gradient-to-t from-5% from-[#0e0e0e]/75 to-95% to-transparent absolute inset-0"></div>
          <div className="absolute bottom-5">
            <h1 className="font-bold text-2xl inline-block">
              {cityName} 
            </h1> <img src={emoji} alt="country-flag" className="inline-block w-[20px] -mt-2 rounded-[]"/>
            <p className="text-sm">{note}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
