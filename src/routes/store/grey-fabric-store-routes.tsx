import React from "react";

import KnittingBillChallanWiseSummaryReportIndex from "src/reports/store/grey-store/knitting-bill-challan-wise-summary/knitting-bill-challan-wise-summary-index";
import KnittingBillChallanWiseSummaryView from "src/reports/store/grey-store/knitting-bill-challan-wise-summary/knitting-bill-challan-wise-summary-view";
import MonthlyKnitProSumOutsideReport from "src/reports/store/grey-store/monthly-knit-pro-sum-outside/monthly-knit-pro-sum-outside-report";
import MonthlyKnitProSumOutsideView from "src/reports/store/grey-store/monthly-knit-pro-sum-outside/monthly-knit-pro-sum-outside-view";

export default function GreyFabricStoreRoute(): {
  path: string;
  component: React.ReactElement;
}[] {
  const routes = [
    {
      path: "monthly-knit-pro-sum-outside-view",
      component: <MonthlyKnitProSumOutsideView />,
    },
    {
      path: "monthly-knit-pro-sum-outside-report",
      component: <MonthlyKnitProSumOutsideReport />,
    },
    {
      path: "knitting-bill-challan-wise-summary-index",
      component: <KnittingBillChallanWiseSummaryReportIndex />,
    },
    {
      path: "knitting-bill-challan-wise-summary-view",
      component: <KnittingBillChallanWiseSummaryView />,
    },
  ];
  return routes;
}

// {/* <Route
//   path="monthly-knit-pro-sum-outside-view"
//   element={<MonthlyKnitProSumOutsideView />}
// />
// <Route
//   path="monthly-knit-pro-sum-outside-report"
//   element={<MonthlyKnitProSumOutsideReport />}
// />
// <Route
//   path="knitting-bill-challan-wise-summary-index"
//   element={<KnittingBillChallanWiseSummaryReportIndex />}
// /> */}
