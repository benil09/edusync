import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.jsx";

const Layout = () => {
  return (
    <div className="flex">
      <SideNav /> {/* Sidebar available on every page */}
      <div className="flex-1">
        <Outlet /> {/* Child routes will render here */}
      </div>
    </div>
  );
};

export default Layout;
