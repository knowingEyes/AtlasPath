import { Outlet } from "react-router-dom";
import { SectionNavBar } from "../components/SectionNavBar";
import AppHeader from "../components/AppHeader";

export const HomePage = () => {
  return (
    <section className="p-5 h-screen">
      <AppHeader />
      <SectionNavBar views={["Cities", "Countries"]} />
      <Outlet />
    </section>
  );
};
