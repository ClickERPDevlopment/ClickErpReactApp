import React from "react";
import { Link } from "react-router";

export type ModuleType = {
  name: string;
  icon: string;
  page: string;
};

const module: ModuleType[] = [
  {
    name: "Configuration",
    icon: "https://cdn-icons-png.flaticon.com/512/6407/6407116.png",
    page: "/dashboard/configuration",
  },
  {
    name: "Merchandising",
    icon: "https://cdn-icons-png.flaticon.com/512/6001/6001131.png",
    page: "/dashboard/merchandising",
  },
  {
    name: "Textile",
    icon: "https://cdn-icons-png.freepik.com/256/9459/9459236.png?semt=ais_hybrid",
    page: "/dashboard/textile",
  },
  {
    name: "Production",
    icon: "https://cdn-icons-png.flaticon.com/512/2255/2255135.png",
    page: "/dashboard/production",
  },
  {
    name: "Inventory",
    icon: "https://cdn-icons-png.freepik.com/512/10434/10434315.png",
    page: "/dashboard/inventory",
  },
  {
    name: "HR Payroll",
    icon: "https://img.favpng.com/15/3/20/time-and-attendance-payroll-human-resource-management-human-resources-business-png-favpng-K6stDvS1r1buKGeVSBxLWxgTV.jpg",
    page: "/dashboard/hr-payroll",
  },
  {
    name: "Sweater",
    icon: "/modules/sweater.png",
    page: "/dashboard/sweater",
  },
];

export function ModuleCard({ module }: { module: ModuleType }) {
  return (
    <Link
      to={module.page}
      className="flex flex-col justify-center items-center cursor-pointer p-2 w-32 border border-slate-50
                 rounded-lg  hover:border hover:border-slate-300"
    >
      <img src={module.icon} alt="Module Icon" width={60} height={60} />
      <h1>{module.name}</h1>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-10 p-3 sm:p-10">
      {module.map((element) => (
        <ModuleCard key={element.name} module={element} />
      ))}
    </div>
  );
}
