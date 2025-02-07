import { Home, Inbox, Settings } from "lucide-react";
import { MenuType } from "./menu-type";

export const SweaterMenu: MenuType[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Basic Setup",
    url: "#",
    icon: Settings,
    isOpen: false,
    submenu: [
      {
        title: "Gauge",
        url: "/dashboard/sweater/gauge",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "M/C Group Setup",
        url: "/dashboard/sweater/mc-group",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Planning Board Configure",
        url: "/dashboard/sweater/planning-board-configure",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Brand Group",
        url: "/dashboard/sweater/brand-group",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
    ],
  },
  {
    title: "Date-wise m/c distribution",
    url: "/dashboard/sweater/date-wise-mc-distribution",
    icon: Inbox,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Plan Strip",
    url: "/dashboard/sweater/plan-strip",
    icon: Inbox,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Line Loading Plan",
    url: "/report/sweater/swt-planning/line-loading-plan?companyId=2&boardId=10&isFromDate=true&fromDate=1-jan-2023&toDate=1-jan-2029&buyerId=0&styleId=0&poId=0&floorId=0&machineGroupId=0",
    icon: Inbox,
    isOpen: false,
    submenu: null,
  },
  // {
  //   title: "Basic Setup-2",
  //   url: "#",
  //   icon: Settings,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       title: "Floor",
  //       url: "/dashboard/configuration/floor",
  //       icon: Inbox,
  //       isOpen: false,
  //       submenu: null,
  //     },
  //     {
  //       title: "Line",
  //       url: "/dashboard/configuration/line",
  //       icon: Inbox,
  //       isOpen: false,
  //       submenu: null,
  //     },
  //   ],
  // },
];
