import {
  FaCompass,
  HomeIcon,
  MapIcon,
DocumentTextIcon
} from "../assets/icons/icons";
import { NavLink } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full text-white p-4 z-[9999]">
      <ul className="flex [&>li]:block justify-between  rounded-[10px] bg-[#0e0e0e] px-6 py-4 ">
        <li>
          <NavLink to="homepage">
            <HomeIcon className="h-5 w-5" />
          </NavLink>
        </li>
        <li>
          <NavLink to="map">
            <MapIcon className="h-5 w-5" />
          </NavLink>
        </li>
        <li>
          <NavLink to="discover">
            <FaCompass className="h-[18.8px] w-5" />
          </NavLink>
        </li>
        <li>
          <NavLink to="journal">
            <DocumentTextIcon className="h-5 w-5"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
