import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="w-full h-full">
      <div className="w-[17%] fixed  top-0 left-0 h-full">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="w-[83%] ml-[17%] overflow-hidden p-5 rounded">
        <Header toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
