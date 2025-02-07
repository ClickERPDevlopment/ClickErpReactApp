import OrderWiseFinishFabricDeliveryReport from "src/reports/store/finish-store/order-wise-finish-fabric-delivery-report/order-wise-ff-delivery-report-index";
import DyeingBillChallanWiseSummaryIndex from "src/reports/store/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-index";
import DyeingBillChallanWiseSummaryView from "src/reports/store/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-view";

export default function FinishFabricStoreRoute(): {
  path: string;
  component: React.ReactElement;
}[] {
  const routes = [
    {
      path: "order-wise-finish-fabric-delivery-report",
      component: <OrderWiseFinishFabricDeliveryReport />,
    },
    {
      path: "dyeing-bill-challan-wise-summary-view",
      component: <DyeingBillChallanWiseSummaryView />,
    },
    {
      path: "dyeing-bill-challan-wise-summary-index",
      component: <DyeingBillChallanWiseSummaryIndex />,
    },
  ];
  return routes;
}
