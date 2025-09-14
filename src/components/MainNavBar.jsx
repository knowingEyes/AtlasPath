import {
  FaCompass,
  HomeIcon,
  MapIcon,
ChartBarIcon
} from "../assets/icons/icons";
import { NavLink } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full text-white p-4 z-[9999]">
      <ul className="flex [&>li]:flex [&>li]:flex-col [&>li]:items-center justify-between  rounded-[10px] bg-[#121212] px-6 py-4 [&_a]:block [&_a]:p-1
       [&_a]:rounded-full [&_.active]:bg-white/15 [&_span]:text-xs [&_a]:active:scale-[1.1] [&_a]:transition-transform">
        <li>
          <NavLink to="homepage">
            <HomeIcon className="h-5" />
          </NavLink>
          <span>Home</span>
        </li>
        <li>
          <NavLink to="map"  className="">
            <MapIcon className="h-5 w-5" />
          </NavLink>
          <span>Map</span>
        </li>
        <li>
          <NavLink to="discover">
            <FaCompass className="h-[20.8px] w-5" />
          </NavLink>
          <span>Explore</span>
        </li>
        <li>
          <NavLink to="stats">
            <ChartBarIcon className="h-5 w-5"/>
          </NavLink>
          <span>Stats</span>
        </li>
      </ul>
    </nav>
  );
};
