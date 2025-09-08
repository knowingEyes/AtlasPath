import { NavLink } from "react-router-dom";

export const SectionNavBar = ({ views = [] }) => {
  return (
    <nav>
      <ul
        className="flex bg-gray-100 w-max  [&_.active]:bg-[#333] font-semibold
       rounded-md [&_a]:rounded-md  [&_.active]:text-white [&_a]:text-sm mx-auto [&_a]:block
       text-center [&_a]:w-25 [&_a]:bg-gray-200  [&_a]:py-[3px] [&_a]:transition-all [&_a]:duration-300 [&_a]:ease-in-out [&>li]:p-1"
      >
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
