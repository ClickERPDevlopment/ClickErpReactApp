import { Home, Inbox, Settings } from "lucide-react";
import { MenuType } from "./menu-type";

export const ConfigurationMenu: MenuType[] = [
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
        title: "Company",
        url: "/dashboard/configuration/company",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Country",
        url: "/dashboard/configuration/country",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Floor",
        url: "/dashboard/configuration/floor",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Line",
        url: "/dashboard/configuration/line",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
    ],
  },
  {
    title: "Basic Setup-2",
    url: "#",
    icon: Settings,
    isOpen: false,
    submenu: [
      {
        title: "Floor",
        url: "/dashboard/configuration/floor",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
      {
        title: "Line",
        url: "/dashboard/configuration/line",
        icon: Inbox,
        isOpen: false,
        submenu: null,
      },
    ],
  },
];
