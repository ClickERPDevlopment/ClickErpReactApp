import { Outlet } from "react-router";

export default function ReportLayout() {
  return (
    <>
      <div className="bg-white min-h-screen w-auto">
        <div className="flex flex-col justify-center items-center m-0 p-0 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
