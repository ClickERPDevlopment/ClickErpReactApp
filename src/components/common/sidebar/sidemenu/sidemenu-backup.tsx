// import { SweaterMenu } from "@/lib/menu/sweater-menu";

export type MenuItem = {
  menutitle?: string;
  icon?: JSX.Element;
  type?: "sub" | "link" | "empty";
  Name?: string;
  active: boolean;
  selected: boolean;
  dirchange: boolean;
  title?: string;
  badge?: string;
  badgetxt?: string;
  class?: string;
  path?: string;
  children?: MenuItem[];
};

// export const MENUITEMS: MenuItem[] = SweaterMenu;

export const MENUITEMS: MenuItem[] = [
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
        path: `${import.meta.env.BASE_URL}dashboards/crm`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "CRM",
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
        path: "/dashboard/sweater/gauge",
        title: "Gauge",
        type: "empty",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/sweater/mc-group",
        title: "M/C Group Setup",
        type: "empty",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        title: "Nested-2",
        type: "sub",
        selected: false,
        dirchange: false,
        active: false,
        children: [
          {
            path: "#",
            title: "Nested-2.1",
            type: "empty",
            active: false,
            selected: false,
            dirchange: false,
          },
          {
            path: "#",
            title: "Nested-2.2",
            type: "empty",
            active: false,
            selected: false,
            dirchange: false,
          },
        ],
      },
    ],
  },
];
