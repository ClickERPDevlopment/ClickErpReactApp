import { Outlet } from "react-router";

export default function ReportLayout() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center m-0 p-0 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
