import {
  FaCompass,
  HomeIcon,
  MapIcon,
DocumentTextIcon
} from "../assets/icons/icons";
import { NavLink } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full">
      <ul className="flex [&>li]:block justify-between px-2">
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
