import { Link } from "react-router-dom";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
export const CitiesItems = ({ cityName, lat, lon }) => {
  return (
    <li className="block text-white mb-4">
      <Link to={`/cities/${1233456}?lat=${lat}&lon=${lon}`}>
        <div
          className="relative w-full  h-100 bg-amber-400 rounded-[20px] p-3 overflow-hidden"
          style={{ background: `url(${img}) center/cover ` }}
        >
          <div className="bg-gradient-to-t from-5% from-[#0e0e0e]/75 to-95% to-transparent absolute inset-0"></div>
          <div className="absolute bottom-5">
            <h1 className="font-bold text-2xl ">{cityName}</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
