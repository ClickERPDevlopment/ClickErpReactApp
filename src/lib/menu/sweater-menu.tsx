import { MenuItem } from "@/components/common/sidebar/sidemenu/sidemenu";

export const SweaterMenu: MenuItem[] = [
  // {
  //   title: "Home",
  //   url: "/dashboard",
  //   icon: Home,
  //   isOpen: false,
  //   submenu: null,
  // },
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
        path: "/dashboard/sweater/planning-board-configure",
        title: "Planning Board Configure",
        type: "empty",
        active: false,
        selected: false,
        dirchange: false,
      },
      {
        path: "/dashboard/sweater/brand-group",
        title: "Brand Group",
        type: "empty",
        active: false,
        selected: false,
        dirchange: false,
      },
    ],
  },
  // {
  //   menutitle: "Date-wise m/c distribution",
  //   active: false,
  //   selected: false,
  //   dirchange: false,
  // },

  // {
  //   title: "Date-wise m/c distribution",
  //   url: "/dashboard/sweater/date-wise-mc-distribution",
  //   icon: Inbox,
  //   isOpen: false,
  //   submenu: null,
  // },
  // {
  //   title: "Plan Strip",
  //   url: "/dashboard/sweater/plan-strip",
  //   icon: Inbox,
  //   isOpen: false,
  //   submenu: null,
  // },
  // {
  //   title: "Line Loading Plan",
  //   url: "/report/sweater/swt-planning/line-loading-plan?companyId=2&boardId=10&isFromDate=true&fromDate=1-jan-2023&toDate=1-jan-2029&buyerId=0&styleId=0&poId=0&floorId=0&machineGroupId=0",
  //   icon: Inbox,
  //   isOpen: false,
  //   submenu: null,
  // },
];
