import OrderWiseFinishFabricDeliveryReport from "@/reports/store/finish-store/order-wise-finish-fabric-delivery-report/order-wise-ff-delivery-report-index";
import DyeingBillChallanWiseSummaryIndex from "@/reports/store/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-index";
import DyeingBillChallanWiseSummaryView from "@/reports/store/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-view";
import FabricReceiveReturnChallanGatePassReport from "@/reports/store/finish-store/fabric-receive-return-challan-gate-pass-report/fabric-receive-return-challan-gate-pass-report-index";

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
    {
      path: "fabric-receive-return-challan-gate-pass-report",
      component: <FabricReceiveReturnChallanGatePassReport />,
    },
  ];
  return routes;
}
