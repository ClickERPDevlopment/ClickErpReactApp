import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { MenuType } from "./menu-type";

export const MerchandisingMenu: MenuType[] = [
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
        title: "Buyer",
        url: "/dashboard/merchandising/buyer",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Color",
        url: "/dashboard/merchandising/color",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Size",
        url: "/dashboard/merchandising/size",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
    ],
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
