import { Outlet } from "react-router-dom";
import { SectionNavBar } from "./SectionNavBar";

export const HomePage = () => {
  return (
    <section className="p-5 h-screen">
      <SectionNavBar views={["Cities", "Countries"]} />
      <Outlet />
    </section>
  );
};
