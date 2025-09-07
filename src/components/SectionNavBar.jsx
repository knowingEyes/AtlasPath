import { NavLink } from "react-router-dom";

export const SectionNavBar = ({ views = [] }) => {
  return (
    <nav>
      <ul
        className="flex bg-gray-100 w-max  [&_.active]:bg-[#0373f3] font-semibold
       rounded-xl [&_a]:rounded-xl  [&_.active]:text-white [&_a]:text-sm mx-auto [&_a]:block
       [&_a]:text-center [&_a]:w-20 [&_a]:px-2 [&_a]:transition-all [&_a]:duration-350 [&_a]:ease-in-out [&>li]:p-1"
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
