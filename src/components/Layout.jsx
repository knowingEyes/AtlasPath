import { Outlet } from "react-router-dom";
import { MainNavBar } from "./MainNavBar";

export const Layout = () => {
  return (
    <main>
      <Outlet />
      <MainNavBar />
    </main>
  );
};
