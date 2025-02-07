export const menu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  //   { menu: "Home", path: "/", isCurrent: true },
  {
    menu: "Finish Fabric Allocation Reports",
    path: "/report/ff-allocation-report?buyerId=0&fabricId=0&orderRef=",
    isCurrent: false,
  },
  {
    menu: "Accessories Report",
    path: "/report/merchandising/work-order/acc-wo-hangtagsticker-rpt?id=320&currency=$&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },
  {
    menu: "Acc Care Lable Report",
    path: "/report/merchandising/work-order/acc-wo-bkl-carelabel-rpt?id=339&currency=dollar&cmbReportFormat",
    isCurrent: false,
  },
  {
    menu: "Daily Knitting Update",
    path: "/report/textile/knitting/daily-knitting-update?fromDate=01-Jul-2024&toDate=9-Jul-2024&isDateWise=True&buyerId=2&poId=0&partyIds=&isBalanceZeroNotShow=True",
    isCurrent: false,
  },
  {
    menu: "Outside Yarn Issue And Grey Rcv Status",
    path: "/report/store/yarn-store/outside-yissue-grcv-status-report?fromDate=01-Jun-2024&toDate=30-Jun-2024&isDateWise=True&buyerId=5&styleId=0&poId=0&partyId=0&yarnChallan=&isBalanceZeroNotShow=True",
    isCurrent: false,
  },
  {
    menu: "Grey Batch Status",
    path: "/report/textile/dyeing/grey-batch-status-report?fromDate=01-Jul-2024&toDate=9-Jul-2024&isDateWise=True&buyerId=2&styleId=0&poId=4206&partyId=0&isBalanceZeroNotShow=True&seasonId=0",
    isCurrent: false,
  },
  {
    menu: "Style-wise Fabric Consumption Report",
    path: "/report/merchandising/style-wise-fabric-comsump-report?dtFrom=01/Sep/24&dtTo=01/Sep/24&buyerId=2&styleId=0",
    isCurrent: false,
  },
  {
    menu: "Order Wise Finish Fabric Delivery Report",
    path: "/report/store/finish-fabric-store/order-wise-finish-fabric-delivery-report?buyerId=2&styleId=0&poId=0&colorId=0&seasonId=0",
    isCurrent: false,
  },
  {
    menu: "Yarn Booking Report",
    path: "/report/merchandising/booking/yarn-booking-report?buyerId=5&poId=6633&poNo=23-7382-1-25&styleId=1680",
    isCurrent: false,
  },
  {
    menu: "PO wise fabric and accessories status",
    path: "/report/merchandising/po-wise-fabric-access-status-report?dtPlacementFrom=01-Jul-2024&dtPlacementTo=30-Sep-2024&buyerId=4&styleId=0&poId=0",
    isCurrent: false,
  },

  {
    menu: "George Various Material Report",
    path: "/report/merchandising/work-order/george-various-material-rpt?id=339&currency=dollar&cmbReportFormat",
    isCurrent: false,
  },

  {
    menu: "Starco Sticker Report",
    path: "/report/merchandising/work-order/starco-sticker-rpt?id=339&currency=dollar&cmbReportFormat",
    isCurrent: false,
  },

  {
    menu: "Starco Label Report",
    path: "/report/merchandising/work-order/starco-label-rpt?id=339&currency=dollar&cmbReportFormat",
    isCurrent: false,
  },

  {
    menu: "Block Accessories",
    path: "/report/merchandising/work-order/block-accessories-rpt?id=339&currency=dollar&cmbReportFormat",
    isCurrent: false,
  },
  {
    menu: "General Block Fabric Status Report",
    path: "/report/merchandising/general-block-fabric-status-report?buyerId=4&styleId=0&fabricId=0&woId=0",
    isCurrent: false,
  },
];
