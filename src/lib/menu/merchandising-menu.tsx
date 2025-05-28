import { MenuItem } from "@/components/common/sidebar/sidemenu/sidemenu";

export const MerchandisingMenu: MenuItem[] = [
  {
    menutitle: "MAIN",
    active: false,
    selected: false,
    dirchange: false,
  },

  {
    icon: <i className="side-menu__icon bx bx-home"></i>,
    type: "sub",
    Name: "",
    active: false,
    selected: false,
    dirchange: false,
    title: "Dashboards",
    badge: "",
    badgetxt: "12",
    class:
      "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
    children: [
      {
        path: "/dashboard",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Home",
      },
    ],
  },

  {
    menutitle: "WEB APPS",
    active: false,
    selected: false,
    dirchange: false,
  },

  {
    title: "Basic Setup",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "sub",
    selected: false,
    dirchange: false,
    active: false,
    children: [
      {
        path: "/dashboard/merchandising/buyer",
        title: "Buyer",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/merchandising/color",
        title: "Color",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/merchandising/size",
        title: "Size",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
  {
    path: "/dashboard/merchandising/booking/show-booking",
    title: "Booking Show",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },

];
