import { Outlet } from "react-router-dom";

import SideNav from "../components/SideNav/SideNav";

const BaseLayout = () => (
  <div className="flex h-screen overflow-hidden">
    <SideNav />
    <Outlet />
  </div>
);

export default BaseLayout;
