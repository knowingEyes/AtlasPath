import { Outlet } from "react-router-dom";
import { SectionNavBar } from "./SectionNavBar";

export const HomePage = () => {
  return (
    <section>
      <SectionNavBar views={["Cities", "Countries"]} />
      <Outlet />
    </section>
  );
};
