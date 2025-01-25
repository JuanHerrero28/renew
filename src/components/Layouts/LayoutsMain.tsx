import { Outlet } from "react-router-dom";
import { NavBar } from "../ui/NavBar/NavBar";

export const LayoutsMain = () => {
  return (
    <div>
      <NavBar/>
      <Outlet />
    </div>
  );
};
