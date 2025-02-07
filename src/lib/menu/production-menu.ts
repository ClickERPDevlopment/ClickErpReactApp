import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { MenuType } from "./menu-type";

export const ProductionMenu: MenuType[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Inbox production",
    url: "#",
    icon: Inbox,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Calendar production",
    url: "#",
    icon: Calendar,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Search production",
    url: "#",
    icon: Search,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Settings production",
    url: "#",
    icon: Settings,
    isOpen: false,
    submenu: null,
  },
];
