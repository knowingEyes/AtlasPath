import { Outlet } from "react-router-dom";
import { SectionNavBar } from "../components/SectionNavBar";

export const Discover = () => {
  return (
    <section className="pt-8">
      <SectionNavBar views={["Gallery", "Blog"]} />
      <Outlet />
    </section>
  );
};
