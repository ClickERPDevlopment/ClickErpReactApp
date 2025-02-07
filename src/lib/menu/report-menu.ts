export const merchandisingReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Accessories Report",
    path: "/report/merchandising/work-order/acc-wo-hangtagsticker-rpt?id=320&currency=$&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },
  {
    menu: "Acc Care Lable Report",
    path: "/report/merchandising/work-order/acc-wo-bkl-carelabel-rpt?id=360&currency=dollar&cmbReportFormat=HangtagSticker",
    isCurrent: false,
  },
  {
    menu: "Style-wise Fabric Consumption Report",
    path: "/report/merchandising/style-wise-fabric-comsump-report?dtFrom=01/Sep/24&dtTo=01/Sep/24&buyerId=2&styleId=0",
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
    path: "/report/merchandising/work-order/george-various-material-rpt?id=360&currency=dollar&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },

  {
    menu: "Starco Sticker Report",
    path: "/report/merchandising/work-order/starco-sticker-rpt?id=360&currency=dollar&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },

  {
    menu: "Starco Label Report",
    path: "/report/merchandising/work-order/starco-label-rpt?id=360&currency=dollar&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },

  {
    menu: "Block Accessories",
    path: "/report/merchandising/work-order/block-accessories-rpt?id=360&currency=dollar&cmbReportFormat=BKL(HangtagSticker)",
    isCurrent: false,
  },
  {
    menu: "General Block Fabric Status Report",
    path: "/report/merchandising/general-block-fabric-status-report?buyerId=0&styleId=0&fabricId=0&woId=0",
    isCurrent: false,
  },
  {
    menu: "General Block Fabric Status Report View",
    path: "/report/merchandising/general-block-fabric-status-view",
    isCurrent: false,
  },
];

export const storeReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Finish Fabric Allocation Reports",
    path: "/report/ff-allocation-report?buyerId=0&woId=0&fabricId=0&orderRef=",
    isCurrent: false,
  },
  {
    menu: "Finish Fabric Allocation Summary Reports",
    path: "/report/ff-allocation-summary-report?buyerId=0&woId=0&fabricId=0&orderRef=",
    isCurrent: false,
  },
  {
    menu: "Outside Yarn Issue And Grey Rcv Status",
    path: "/report/store/yarn-store/outside-yissue-grcv-status-report?fromDate=01-Jun-2024&toDate=30-Jun-2024&isDateWise=True&buyerId=5&styleId=0&poId=0&partyId=0&yarnChallan=&isBalanceZeroNotShow=True",
    isCurrent: false,
  },
  {
    menu: "Order Wise Finish Fabric Delivery Report",
    path: "/report/store/finish-fabric-store/order-wise-finish-fabric-delivery-report?buyerId=2&styleId=0&poId=0&colorId=0&seasonId=0",
    isCurrent: false,
  },
  {
    menu: "Monthly Knitting Production Sum Outside View",
    path: "/report/store/grey-store/monthly-knit-pro-sum-outside-view?fromDate=2-Feb-2024&toDate=2-Sep-2024&partyId=0",
    isCurrent: false,
  },
  {
    menu: "Monthly Knitting Production Sum Outside Report",
    path: "/report/store/grey-store/monthly-knit-pro-sum-outside-report?fromDate=2-Feb-2024&toDate=2-Sep-2024&partyId=0",
    isCurrent: false,
  },
  {
    menu: "Knitting Bill Challan-wise Summary View",
    path: "/report/store/grey-store/knitting-bill-challan-wise-summary-view",
    isCurrent: false,
  },
  {
    menu: "Dyeing Bill Challan-Wise Summary View",
    path: "/report/store/finish-fabric-store/dyeing-bill-challan-wise-summary-view",
    isCurrent: false,
  },
  {
    menu: "Monthly Yarn Costing Report",
    path: "/report/store/yarn-store/monthly-yarn-costing-report",
    isCurrent: false,
  },
  {
    menu: "Party-wise yarn issue and grey receive summary",
    path: "/report/store/yarn-store/partywise-yarnissue-greyrcv-balance-summary-report?companyId=1&partyId=388&dtopmfrom=29-Dec-24&isDtopmfrom=False&dtissuefrom=29-Dec-24&isDtissuefrom=False&dtissueto=29-Dec-24&dtopmto=29-Dec-24&isShowOnlyBalanceAvailable=True",
    isCurrent: false,
  },
];

export const textileReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Daily Knitting Update",
    path: "/report/textile/knitting/daily-knitting-update?fromDate=01-Jul-2024&toDate=9-Jul-2024&isDateWise=True&buyerId=2&poId=0&partyIds=&isBalanceZeroNotShow=True",
    isCurrent: false,
  },
  {
    menu: "Grey Batch Status",
    path: "/report/textile/dyeing/grey-batch-status-report?fromDate=01-Jul-2023&toDate=9-Jul-2024&isDateWise=True&buyerId=2&styleId=0&poId=4206&partyId=0&isBalanceZeroNotShow=True&seasonId=0&colorId=0&isGreyStock=false&isReprocessStock=false",
    isCurrent: false,
  },
  {
    menu: "Batch Wise Approval Report",
    path: "report/textile/dyeing/batch-wise-approval-status-report?buyerId=0&styleId=0&batchId=0&fromDate=01-Jan-23%202:30:41%20PM&toDate=17-Oct-24%202:30:41%20PM&isApproval=False&isNotApproval=False",
    isCurrent: false,
  },
  {
    menu: "Batch Wise Dyeing Monthly Summary View",
    path: "report/textile/dyeing/buyer-wise-dyeing-monthly-summ-view",
    isCurrent: false,
  },
  {
    menu: "Batch Wise Dyeing Monthly Summary Report",
    path: "report/textile/dyeing/buyer-wise-dyeing-monthly-summ-rpt-index?fromDate=01-Jan-23&toDate=17-Oct-24&buyerId=2",
    isCurrent: false,
  },
  {
    menu: "Dyeing Buyer Wise Grey Stock Report",
    path: "report/textile/dyeing/dyeing-buyer-wise-grey-stock-report",
    isCurrent: false,
  },
  {
    menu: "Buyer Wise Grey Fabric Receive Report",
    path: "report/textile/dyeing/buyer-wise-grey-fabric-receive",
    isCurrent: false,
  },
  {
    menu: "Buyer Wise Grey Fabric Receive Report View",
    path: "report/textile/dyeing/buyer-wise-grey-fabric-receive-view",
    isCurrent: false,
  },
];

export const IEReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Style Change Over Report",
    path: "report/ie/style-change-over-report",
    isCurrent: false,
  },
];

export const ProductionReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Short Shipment Reason Status Report",
    path: "report/production/finishing/short-shipment-reason-status-report",
    isCurrent: false,
  },
  {
    menu: "Date Wise Fabric Requisition Receive Report",
    path: "report/production/cutting/date-wise-fabric-requisition-receive-report",
    isCurrent: false,
  },
];

export const QualityReportMenu: {
  menu: string;
  path: string;
  isCurrent: boolean;
}[] = [
  {
    menu: "Import Fabric Inspection Summary Report",
    path: "report/quality/import-fabric-inspection-info-report?buyerId=&workorderId=&challanId=&isBlockFabric=&fromDate=11-Oct-2024&toDate=10-Nov-2024",
    isCurrent: false,
  },
];
