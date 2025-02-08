import { MenuItem } from "@/components/common/sidebar/sidemenu/sidemenu";

export const CommonMenu: MenuItem[] = [
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
];

export const SweaterMenu: MenuItem[] = [
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
        path: "/dashboard/sweater/gauge",
        title: "Gauge",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/sweater/mc-group",
        title: "M/C Group Setup",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/sweater/planning-board-configure",
        title: "Planning Board Config.",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/sweater/brand-group",
        title: "Brand Group",
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },

  {
    path: "/dashboard/sweater/date-wise-mc-distribution",
    title: "Date-wise M/C Dist.",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },
  {
    path: "/dashboard/sweater/plan-strip",
    title: "Plan Strip",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },
  {
    path: "/report/sweater/swt-planning/line-loading-plan?companyId=2&boardId=10&isFromDate=true&fromDate=1-jan-2023&toDate=1-jan-2029&buyerId=0&styleId=0&poId=0&floorId=0&machineGroupId=0",
    title: "Line Loading Plan",
    icon: <i className="bx bx-layer side-menu__icon"></i>,
    type: "link",
    selected: false,
    dirchange: false,
    active: false,
  },
];
