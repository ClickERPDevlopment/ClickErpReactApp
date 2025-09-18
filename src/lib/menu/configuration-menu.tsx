import { MenuItem } from "@/components/common/sidebar/sidemenu/sidemenu";

export const ConfigurationMenu: MenuItem[] = [
  {
    menutitle: "MAIN",
    active: false,
    selected: false,
    dirchange: false,
  },
  {
    path: "/dashboard",
    title: "Home",
    icon: <i className="side-menu__icon bx bx-home"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },

  // {
  //   icon: <i className="side-menu__icon bx bx-home"></i>,
  //   type: "sub",
  //   Name: "",
  //   active: false,
  //   selected: false,
  //   dirchange: false,
  //   title: "Dashboards",
  //   badge: "",
  //   badgetxt: "12",
  //   class:
  //     "badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2",
  //   children: [
  //     {
  //       path: "/dashboard",
  //       type: "link",
  //       active: false,
  //       selected: false,
  //       dirchange: false,
  //       title: "Home",
  //     },
  //   ],
  // },

  {
    title: "Basic Setup",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "sub",
    selected: false,
    dirchange: false,
    active: false,
    children: [
      {
        path: "/dashboard/configuration/company",
        title: "Company",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/configuration/Country",
        title: "Country",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
  {
    path: "/dashboard/configuration/active-user",
    title: "Active User",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },
  {
    path: "/dashboard/configuration/chat",
    title: "Chat",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },
];
