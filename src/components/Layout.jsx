import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <main>
      <Outlet />
      <NavBar />
    </main>
  );
};
