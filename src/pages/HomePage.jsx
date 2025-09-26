import { Outlet } from "react-router-dom";
import { SectionNavBar } from "../components/SectionNavBar";

export const HomePage = () => {
  return (
    <section className="p-5 h-screen">
      <header className="my-5 ">
        <p className="text-gray-600 text-sm">Looking for inspiration?</p>
        <h1 className="text-2xl font-semibold">Start exploring!</h1>
      </header>
      <SectionNavBar views={["Cities", "Countries"]} />
      <Outlet />
    </section>
  );
};
