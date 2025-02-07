import React from "react";

import { Outlet } from "react-router";

const DesktopLayout = () => {
  return (
    <div className="p-5">
      <Outlet />
    </div>
  );
};

export default DesktopLayout;
