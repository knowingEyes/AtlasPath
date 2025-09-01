import {  NavLink } from "react-router-dom";

export const SectionNavBar = ({ views = [] }) => {
  return (
    <nav>
      <ul className="flex bg-gray-100 w-max space-x-3 [&_.active]:bg-[#0373f3]">
        <li>
          <NavLink to={views[0]}>{views[0]}</NavLink>
        </li>
        <li>
          <NavLink to={views[1]}>{views[1]}</NavLink>
        </li>
        
      </ul>
    </nav>
  );
};
