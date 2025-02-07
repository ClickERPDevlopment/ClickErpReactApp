import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { MenuType } from "./menu-type";

export const TextileMenu: MenuType[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Inbox textile",
    url: "#",
    icon: Inbox,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Calendar textile",
    url: "#",
    icon: Calendar,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Search textile",
    url: "#",
    icon: Search,
    isOpen: false,
    submenu: null,
  },
  {
    title: "Settings textile",
    url: "#",
    icon: Settings,
    isOpen: false,
    submenu: null,
  },
];
