import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ScrollToTop from "./components/ui/scrolltotop.tsx";
import React from "react";

//=========================****555
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./app/dashboard/dashboard";
import MerchandisingDashboard from "./app/dashboard/merchandising-dashboard";
import InventoryDashboard from "./app/dashboard/inventory-dashboard";
import ProductionDashboard from "./app/dashboard/production-dashboard";
import TextileDashboard from "./app/dashboard/texttile-dashboard";
import HrPayrollDashboard from "./app/dashboard/hr-payroll-dashboard";
import ConfigurationDashboard from "./app/dashboard/configuration-dashboard";
import Company from "./app/Configuration/Company/company-view";
import Country from "./app/Configuration/Country/country-index";
import CountryCrud from "./app/Configuration/Country/country-crud";

import FinishFabricAllocationReport from "./reports/finish-fabric-allocation-report/finish-fabric-allocation-report";
import AccessoriesWoReport_Carelabel from "./reports/merchandising/work-order/acc-wo-bkl-carelabel-rpt/acc-wo-bkl-carelabel-rpt";
import DailyKnittingUpdateReport from "./reports/Textile/knitting/daily-knitting-update/daily-knitting-update";
import OutSideYIssueGrcvStatusReport from "./reports/store/yarn-store/outside-yissue-grcv-status/outside-yissue-grcv-status";
import GreyBatchStatusReport from "./reports/Textile/Dyeing/grey-batch-status-report/grey-batch-status-report";
import StyleWiseFabricConsumptionReport from "./reports/merchandising/report/style-wise-fabric-consum-report/style-wise-fabric-consum-report";
import YarnBookingReportIndex from "./reports/merchandising/booking/yarn-booking-report/yarn-booking-rpt-index";
import POwiseFabricAndAccessoriesStatusReport from "./reports/merchandising/report/po-wise-fabric-access-status/po-wise-f-a-s-index";
import GeorgeVariousMaterialReport from "./reports/merchandising/work-order/george-various-material-report/george-various-material-index";
import StarcoStickerReport from "./reports/merchandising/work-order/starco-sticker-report/starco-sticker-index";
import StarcoLabelReport from "./reports/merchandising/work-order/starco-label-report/starco-label-index";
import BlockAccessoriesReport from "./reports/merchandising/work-order/block-accessories-report/block-accessories-index";
import GeneralBlockFabricStatusReport from "./reports/merchandising/report/general-block-fabric-status-report/general-block-f-status-rpt-index";
import GeneralBlockFabricStatusView from "./reports/merchandising/report/general-block-fabric-status-report/general-block-f-status-view";
import StyleChangeOver from "./reports/ie/style-change-over/style-change-over";
import BatchWiseApprovalStatusReport from "./reports/Textile/Dyeing/batch-wise-approval-status-report/batch-wise-approval-status-report-index";
import BuyerWiseDyeingMonthlySummaryReportView from "./reports/Textile/Dyeing/buyer-wise-dyeing-monthly-summ/buyer-wise-dyeing-monthly-summ-view";
import BuyerWiseDyeingMonthlySummaryReportIndex from "./reports/Textile/Dyeing/buyer-wise-dyeing-monthly-summ/buyer-wise-dyeing-monthly-summ-rpt-index";
import ShortShipmentReasonStatusReport from "./reports/production/finishing/short-shipment-reason-status/short-shipment-reason-status-index";
import DyeingBuyerWiseGreyStockReport from "./reports/Textile/Dyeing/dyeing-buyer-wise-grey-stock-report/dyeing-buyer-wise-grey-stock-report";
import BuyerWiseGreyFabricReceiveIndex from "./reports/Textile/Dyeing/buyer-wise-grey-fabric-receive/buyer-wise-grey-fabric-receive-index";
import DateWiseFabricRequisitionReceiveReport from "./reports/production/cuttting/date-wise-fabric-requisition-receive/date-wise-fabric-requisition-receive-index";
import BuyerWiseGreyFabricReceiveView from "./reports/Textile/Dyeing/buyer-wise-grey-fabric-receive/buyer-wise-grey-fabric-receive-view";
import FinishFabricStoreRoute from "./routes/store/finish-fabric-store-routes";
import GreyFabricStoreRoute from "./routes/store/grey-fabric-store-routes";
import AuthProvider from "./lib/auth-provider";
import MonthlyYarnCostingReport from "./reports/store/yarn-store/monthly-yarn-costing-report/monthly-yarn-costing-report-index";

import ImportFabricInspectionInfoReport from "./reports/quality/import-fabric-inspection-info/import-fabric-inspection-info-report-index";

import ProcessWiseDyeingFinishProductionReport from "./reports/Textile/Dyeing/process-wise-dyeing-finish-production/process-wise-dyeing-finish-production-index";

import ShipmentDelayReport from "./reports/merchandising/report/shipment-delay-report/shipment-delay-report-index";

import ShipmentDelayReportPDF from "./reports/merchandising/report/shipment-delay-report-pdf/shipment-delay-report-pdf-index";

import AccessoriesReport from "./reports/merchandising/work-order/accessories-report/accessories-index";

import MonthlyOrderVsShipmentStatusReport from "./reports/merchandising/report/monthly-order-vs-shipment-status-report/monthly-order-vs-shipment-status-report-ndex";

import FinishFabricAllocationSummaryReport from "./reports/finish-fabric-allocation-summary-report/finish-fabric-allocation-summary-report";

import GreyFabricChallanReport from "./reports/Textile/knitting/grey-fabric-issue-challan-report/grey-fabric-issue-challan-report-index";

import GreyFabricTransferReport from "./reports/store/grey-store/grey-fabric-transfer-report/grey-fabric-transfer-report-index";

import PrivateRoute from "@/components/PrivateRoute";
import Login from "./app/auth/login/log-in-index";
import NoPage from "./pages/NoPage";
// import Home from "./pages/Home";
import ReportLayout from "./reports/report-layout";
import AccessoriesWoReport from "./reports/merchandising/work-order/acc-wo-bkl-hangtagsticker-rpt/acc-wo-hangtagsticker-rpt";
import SweaterDashboard from "./app/dashboard/sweater-dashboard";
import Gauge from "./app/sweater/gauge/gauge-index";
import McGroup from "./app/sweater/mc-group/mc-group-index";
import GaugeCrud from "./app/sweater/gauge/gauge-crud";
import AppLayout from "./app/app-layout";
import DesktopLayout from "./pages/Desktop-Layout";
import PlanningBoardConfigureIndex from "./app/sweater/planning-board-configure/planning-board-configure-index";
import PlanningBoardConfigureCrud from "./app/sweater/planning-board-configure/planning-board-configure-crud";
import DateWiseMCDistributionIndex from "./app/sweater/date-wise-mc-distribution/date-wise-mc-distribution-index";
import McGroupCrud from "./app/sweater/mc-group/mc-group-crud";
import SwtPlanStripIndex from "./app/sweater/plan-strip/swt-plan-strip-index";
import BalckPage from "./app/blanck-page";
import PartyWiseYanrIssueAndGreyRcvSummaryIndex from "./reports/store/yarn-store/partywise-yarnissue-greyrcv-balance-summary-report/partyw-yarni-greyr-balance-sum-rpt-index";
import StyleWiseAvgEfficiencyReport from "./reports/production/sewing/style-wise-avg-efficiency-report/style-wise-avg-efficiency-report-index";
import FinishFabricReturnCuttingFloorToStoreReport from "./reports/production/finishing/finish-fabric-return-cutting-floor-to-store-report/finish-fabric-return-cutting-floor-to-store-report-index";
import EmblishmentStatusReport from "./reports/merchandising/report/emblishment-status-report/emblishment-status-report-index";
import ReconciliationPendingDoneReport from "./reports/production/finishing/reconciliation-pending-done-report/reconciliation-pending-done-report-index";
import LineLoadingPlanIndex from "./app/sweater/swt-planning/line-loading-plan-report/line-loading-plan-index";
import OnlineDisplayBoard from "./reports/production/sewing/onlne-display-board";
import AccessoriesReceiveReturnChallanGatePassReport from "./reports/store/accessories-store/accessories-receive-return-challan-gatepass-report/accessories-receive-return-challan-gatepass-report-index";
import OnlineDisplayBoardView from "./reports/production/sewing/onlne-display-board/online-display-board-view";
import GarmentsDispatchDetailsReport from "./reports/production/finishing/garments-dispatch-details-report/garments-dispatch-details-report-index";
import AccessoriesReceiveStatusByChallanNoReport from "./reports/store/accessories-store/accessories-receive-status-by-challan-no-report/accessories-receive-status-by-challan-no-report-index";
import Buyer from "./app/merchandising/buyer/buyer-index";
import BuyerCrud from "./app/merchandising/buyer/buyer-crud";
import BuyerGl from "./app/merchandising/buyer/buyer-gl";
import AppConfirmationDialog from "./components/app-confirmation-dialog";
import BrandGroupIndex from "./app/sweater/brand-group/brand-group-index";
import BrandGroupCrud from "./app/sweater/brand-group/brand-group-crud";
import ColorCrud from "./app/merchandising/color/color-crud";
import Color from "./app/merchandising/color/color-index";
import Size from "./app/merchandising/size/size-index";
import SizeCrud from "./app/merchandising/size/size-crud";
import { Toaster } from "@/components/ui/toaster.tsx";
import KnittingProgramReport from "./reports/Textile/knitting/knitting-program-report/knitting-program-report-index.tsx";
import CreateDateWisePoSummaryReport from "./reports/merchandising/report/create-date-wise-po-summary-report/create-date-wise-po-summary-report-index.tsx";
import SubcontractBatchWiseFabricDeliveryReport from "./reports/Textile/Dyeing/subcontract-batch-wise-fabric-delivery-report/subcontract-batch-wise-fabric-delivery-report-index.tsx";
import CompensationClaimIndex from "./app/merchandising/compensation-claim/compensation-claim-index.tsx";
import CompensationClaimCrud from "./app/merchandising/compensation-claim/compensation-claim-crud.tsx";
import AccessoriesIssueReturnChallanReport from "./reports/store/accessories-store/accessories-issue-return-challan-report/accessories-issue-return-challan-report-index.tsx";
import CompensationClaimReport from "./reports/merchandising/report/compensation-claim-report/compensation-claim-report-index.tsx";
import Notifications from "./pages/notifications.tsx";
import GeneralAndOTHoursProductionReport from "./reports/production/sewing/general-and-ot-hours-production-report/general-and-ot-hours-production-report-index.tsx";
import GeneralAndOTHoursProductionLineWiseReport from "./reports/production/sewing/general-and-ot-hours-production-line-wise-report/general-and-ot-hours-production-line-wise-report-index.tsx";
import EmblishmentBudgetSheet from "./reports/embellishment/embellishment-budget-sheet/embellishment-budget-sheet-index.tsx";
import YarnDeliveryChallanGatePassReport from "./reports/store/yarn-store/yarn-delivery-challan-gate-pass-report/yarn-delivery-challan-gate-pass-report-index.tsx";
import OrderWiseKnittingDyeingStatusReportIndex from "./reports/store/yarn-store/order-wise-knit-dyeing-status-report/order-wise-knit-dyeing-status-report-index.tsx";
import FabricBookingReportIndex from "./reports/merchandising/booking/fabric-booking-report/fabric-booking-report-index.tsx";
import AccessoriesReportWithPo from "./reports/merchandising/work-order/accessories-report-with-po/accessories-with-po-index.tsx";
import YarnIssueStatusReportIndex from "./reports/store/yarn-store/yissue-status-report/yarn-issue-status-report-index.tsx";
import SampleProgramReportIndex from "./reports/merchandising/sample-program/report/sample-program-report.-index.tsx";
import MaterialOrderYarnDyeingReport from "./reports/merchandising/report/material-order-yarn-dyeing-report/material-order-yarn-dyeing-report-index.tsx";
import BudgetReport from "./reports/merchandising/report/budget-report/budget-report-index.tsx";
import BudgetReportFormat2 from "./reports/merchandising/report/budget-report -format2/budget-report -format2-index.tsx";
import PartyWiseKnittingProgramReport from "./reports/Textile/knitting/party-wise-knitting-program-report/party-wise-knitting-program-report-index.tsx";
import PrintEmbProductionCrud from "./app/PrintingEmbroidery/print-emb-production/print-emb-production-crud.tsx";
import PrintEmbProductionIndex from "./app/PrintingEmbroidery/print-emb-production/print-emb-production-index.tsx";
import PrintEmbMaterialReceiveIndex from "./app/PrintingEmbroidery/print-emb-material-receive/print-emb-material-receive-index.tsx";
import PrintEmbMaterialReceiveCrud from "./app/PrintingEmbroidery/print-emb-material-receive/print-emb-material-receive-crud.tsx";
import YarnTwistingWorkOrderReport from "./reports/merchandising/work-order/yarn-twisting-wrok-order-rpt/yarn-twisting-wrok-order-rpt-index.tsx";
import YarnIssueForDyeingReportIndex from "./reports/store/yarn-store/yarn-issue-for-dyeing-report/yarn-issue-for-dyeing-report-index.tsx";
import YarnIssueForTwistingReportIndex from "./reports/store/yarn-store/yarn-issue-for-twisting-report/yarn-issue-for-twisting-report-index.tsx";
import FinishGoodValuation from "./app/merchandising/finish-good-valuation/finish-good-valuation-index.tsx";
import FinishGoodValuationCrud from "./app/merchandising/finish-good-valuation/finish-good-valuation-crud.tsx";
import GreyFabricIssueToDyeingChallanIndex from "./reports/store/grey-store/grey-fabric-issue-to-dyeing-challan/grey-fabric-issue-to-dyeing-challan-index.tsx";
import ShowBookingView from "./app/merchandising/booking/show-booking/show-booking-view.tsx";
import InternalProductPlacementSheetReport from "./reports/planning/report/internal-product-placement-sheet-summary-report/internal-product-placement-sheet-report-index.tsx";
import EmbellishmentDailyProductionReport from "./reports/embellishment/embellishment-daily-production-report/embellishment-daily-production-report-index.tsx";
import EmbellishmentDailySummaryProductionReport from "./reports/embellishment/embellishment-daily-summary-production-report/embellishment-daily-summary-production-report-index.tsx";
import InHouseBatchWiseFabricDeliveryReport from "./reports/Textile/Dyeing/in-house-batch-wise-fabric-delivery-report - Copy/in-house-batch-wise-fabric-delivery-report-index.tsx";
import OrderWiseKnittingDyeingStatusReportIndexF2 from "./reports/store/yarn-store/order-wise-knit-dyeing-status-report-f2/order-wise-knit-dyeing-status-report-index-f2.tsx";
import PrintEmbDeliveryIndex from "./app/PrintingEmbroidery/print-emb-delivery/print-emb-delivery-index.tsx";
import PrintEmbDeliveryCrud from "./app/PrintingEmbroidery/print-emb-delivery/print-emb-delivery-crud.tsx";
import EmbellishmentOrderDetailsReport from "./reports/embellishment/embellishment-order-details-report/embellishment-order-details-report-index.tsx";
import EmbellishmentOrderSummaryReport from "./reports/embellishment/embellishment-order-summary-report/embellishment-order-summary-report-index.tsx";
import PrintEmbDashboardIndex from "./app/PrintingEmbroidery/print-emb-dashboard/print-emb-dashboard-inex.tsx";
import EmbellishmentDeliveryReport from "./reports/embellishment/embellishment-delivery-report/embellishment-delivery-report-index.tsx";
import YarnAdditionalBookingReportIndex from "./reports/merchandising/yarn-additional-booking/yarn-additional-booking-report.-index.tsx";
import CompensationReport from "./reports/production/finishing/compensation-report/compensation-report-index.tsx";
import YarnReturnChallanReport from "./reports/store/yarn-store/yarn-return-challan-report/yarn-return-challan-report-index.tsx";
import KnittingProductionReport from "./reports/Textile/knitting/knitting-production-report/knitting-production-report-index.tsx";
import YarnTransferChallanReport from "./reports/store/yarn-store/yarn-transfer-report/yarn-transfer-report-index.tsx";
import YarnTransferReportFormat2 from "./reports/store/yarn-store/yarn-transfer-report-format2/yarn-transfer-report-index.tsx";
import DateWiseKnittingProgramReport from "./reports/Textile/knitting/date-wise-knitting-program-report/date-wise-knitting-program-report-index.tsx";
import SizeWiseOrderSummaryReport from "./reports/merchandising/report/size-wise-order-summary-report/size-wise-order-summary-report-index.tsx";
import DateWiseYarnAndGreyFabricStockReport from "./reports/store/grey-store/date-wise-yarn-and-grey-stock-report/date-wise-yarn-and-grey-stock-report-index.tsx";
import DateWiseGreyFabcirDeliveryToDyeingReport from "./reports/store/grey-store/date-wise-grey-fabric-delivery-to-dyeing-report/date-wise-grey-fabric-delivery-to-dyeing-report-index.tsx";
import OperationBulletinReport from "./reports/ie/operation-bulletin-report/operation-bulletin-report-index.tsx";
import BuyerWiseYarnPossitionReportIndex from "./reports/store/yarn-store/buyer-wise-yarn-possition-report/buyer-wise-yarn-possition-report-index.tsx";
import DateWiseYarnReceiveRegisterReport from "./reports/store/yarn-store/date-wise-yarn-receive-register-report/date-wise-yarn-receive-register-report-index.tsx";
import ThreadConsumptionReport from "./reports/ie/thread-consumption-report/thread-consumption-report-index.tsx";
import SewingProductionStatusReport from "./reports/production/sewing/sewing-production-status-report/sewing-production-status-report-index.tsx";
import DailySewingEfficiencyReport from "./reports/production/sewing/daily-sewing-efficiency-report/daily-sewing-efficiency-report-index.tsx";
import StyleWiseProfitLossReportIndex from "./reports/merchandising/report/style-wise-profit-loss-report/style-wise-profit-loss-report-index.tsx";
import LotWiseYarnStockReport from "./reports/store/yarn-store/lot-wise-yarn-stock-report/lot-wise-yarn-stock-report-index.tsx";
import YarnStockAfterAlloctionReport from "./reports/store/yarn-store/yarn-stock-after-allocation-report/yarn-stock-after-allocation-report-index.tsx";
import AtoZReportIndex from "./reports/merchandising/report/a-to-z-report/a-to-z-report-index.tsx";
import DateWiseYarnAllocationReport from "./reports/store/yarn-store/date-wise-yarn-allocation-report/date-wise-yarn-allocation-report-index.tsx";
import BudgetWiseCostBreakdownIndex from "./reports/merchandising/report/budget-wise-cost-breakdown/budget-wise-cost-breakdown-index.tsx";
import YarnRcvIssueRegisterReport from "./reports/store/yarn-store/yarn-rcv-issue-register-report/yarn-rcv-issue-register-report-index.tsx";
import SupplierWiseEmbStockReport from "./reports/embellishment/supplier-wise-emb-stock-report/supplier-wise-emb-stock-report-index.tsx";
import DateWiseFabricPurchaseReceiveRegisterReport from "./reports/store/finish-store/date-wise-fabric-purchase-receive-register-report/date-wise-fabric-purchase-receive-register-report-index.tsx";

//-------------------------------------------------------------
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <React.Suspense>
              <ScrollToTop />
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="blank-page" element={<BalckPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path={"/"} element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard" element={<AppLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route
                        path="configuration"
                        element={<ConfigurationDashboard />}
                      />
                      <Route
                        path="configuration/company"
                        element={<Company />}
                      />
                      <Route
                        path="configuration/country"
                        element={<Country />}
                      />
                      <Route
                        path="configuration/country/:pageAction/:id"
                        element={<CountryCrud />}
                      />
                      {/* <Route
                    path="merchandising"
                    element={<MerchandisingDashboard />}
                  /> */}

                      <Route path="printing-embroidery">
                        <Route path="print-emb-dabsboard">
                          <Route index element={<PrintEmbDashboardIndex />} />
                        </Route>
                        <Route path="print-emp-production">
                          <Route index element={<PrintEmbProductionIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbProductionCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="print-emb-material-receive">
                          <Route index element={<PrintEmbMaterialReceiveIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbMaterialReceiveCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="print-emb-delivery">
                          <Route index element={<PrintEmbDeliveryIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbDeliveryCrud />}
                          />
                        </Route>
                      </Route>


                      <Route path="merchandising">
                        <Route index element={<MerchandisingDashboard />} />
                        <Route path="buyer">
                          <Route index element={<Buyer />} />
                          <Route
                            path=":pageAction/:id"
                            element={<BuyerCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="color">
                          <Route index element={<Color />} />
                          <Route
                            path=":pageAction/:id"
                            element={<ColorCrud />}
                          />
                        </Route>
                        <Route path="size">
                          <Route index element={<Size />} />
                          <Route
                            path=":pageAction/:id"
                            element={<SizeCrud />}
                          />
                        </Route>
                        <Route path="compensation-claim">
                          <Route index element={<CompensationClaimIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<CompensationClaimCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="finish-good-valuation">
                          <Route index element={<FinishGoodValuation />} />
                          <Route
                            path=":pageAction/:id"
                            element={<FinishGoodValuationCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="booking">
                          <Route index element={<Buyer />} />
                          <Route path="show-booking" element={<ShowBookingView />} />
                        </Route>
                      </Route>
                      <Route path="textile" element={<TextileDashboard />} />
                      <Route
                        path="production"
                        element={<ProductionDashboard />}
                      />
                      <Route
                        path="inventory"
                        element={<InventoryDashboard />}
                      />
                      <Route
                        path="hr-payroll"
                        element={<HrPayrollDashboard />}
                      />
                      <Route path="sweater">
                        <Route index element={<SweaterDashboard />} />
                        <Route path="gauge">
                          <Route index element={<Gauge />} />
                          <Route
                            path=":pageAction/:id"
                            element={<GaugeCrud />}
                          />
                        </Route>
                        <Route path="mc-group">
                          <Route index element={<McGroup />} />
                          <Route
                            path=":pageAction/:id"
                            element={<McGroupCrud />}
                          />
                        </Route>
                        <Route path="brand-group">
                          <Route index element={<BrandGroupIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<BrandGroupCrud />}
                          />
                        </Route>
                        <Route path="date-wise-mc-distribution">
                          <Route
                            index
                            element={<DateWiseMCDistributionIndex />}
                          />
                        </Route>
                        <Route path="planning-board-configure">
                          <Route
                            index
                            element={<PlanningBoardConfigureIndex />}
                          />
                          <Route
                            path=":pageAction/:id"
                            element={<PlanningBoardConfigureCrud />}
                          />
                        </Route>
                        <Route path="plan-strip">
                          <Route index element={<SwtPlanStripIndex />} />
                        </Route>
                        <Route path="swt-planning">
                          {/* <Route index element={<PlanningBoardConfigureIndex />} /> */}
                          <Route
                            path="line-loading-plan"
                            element={<LineLoadingPlanIndex />}
                          />
                        </Route>
                      </Route>
                    </Route>
                  </Route>

                  <Route path="/win" element={<DesktopLayout />}>
                    <Route element={<PrivateRoute />}>
                      <Route path="sweater">
                        <Route index element={<SweaterDashboard />} />
                        <Route path="gauge">
                          <Route index element={<Gauge />} />
                          <Route
                            path=":pageAction/:id"
                            element={<GaugeCrud />}
                          />
                        </Route>
                        <Route path="mc-group">
                          <Route index element={<McGroup />} />
                          <Route
                            path=":pageAction/:id"
                            element={<McGroupCrud />}
                          />
                        </Route>
                        <Route path="brand-group">
                          <Route index element={<BrandGroupIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<BrandGroupCrud />}
                          />
                        </Route>

                        <Route path="planning-board-configure">
                          <Route
                            index
                            element={<PlanningBoardConfigureIndex />}
                          />
                          <Route
                            path=":pageAction/:id"
                            element={<PlanningBoardConfigureCrud />}
                          />
                        </Route>
                        <Route path="date-wise-mc-distribution">
                          <Route
                            index
                            element={<DateWiseMCDistributionIndex />}
                          />
                        </Route>
                        <Route path="plan-strip">
                          <Route index element={<SwtPlanStripIndex />} />
                        </Route>
                      </Route>
                      <Route path="printing-embroidery">
                        <Route path="print-emb-dabsboard">
                          <Route index element={<PrintEmbDashboardIndex />} />
                        </Route>
                        <Route path="print-emp-production">
                          <Route index element={<PrintEmbProductionIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbProductionCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="print-emb-material-receive">
                          <Route index element={<PrintEmbMaterialReceiveIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbMaterialReceiveCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="print-emb-delivery">
                          <Route index element={<PrintEmbDeliveryIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<PrintEmbDeliveryCrud />}
                          />
                        </Route>
                      </Route>
                      <Route path="merchandising">
                        <Route index element={<MerchandisingDashboard />} />
                        <Route path="buyer">
                          <Route index element={<Buyer />} />
                          <Route
                            path=":pageAction/:id"
                            element={<BuyerCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="color">
                          <Route index element={<Color />} />
                          <Route
                            path=":pageAction/:id"
                            element={<ColorCrud />}
                          />
                        </Route>
                        <Route path="size">
                          <Route index element={<Size />} />
                          <Route
                            path=":pageAction/:id"
                            element={<SizeCrud />}
                          />
                        </Route>
                        <Route path="compensation-claim">
                          <Route index element={<CompensationClaimIndex />} />
                          <Route
                            path=":pageAction/:id"
                            element={<CompensationClaimCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                        <Route path="finish-good-valuation">
                          <Route index element={<FinishGoodValuation />} />
                          <Route
                            path=":pageAction/:id"
                            element={<FinishGoodValuationCrud />}
                          />
                          <Route path="gl/:id" element={<BuyerGl />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<NoPage />} />

                <Route path="/report" element={<ReportLayout />}>
                  {/* <Route index element={<Home />} /> */}
                  <Route
                    path="ff-allocation-report"
                    element={<FinishFabricAllocationReport />}
                  />

                  <Route
                    path="ff-allocation-summary-report"
                    element={<FinishFabricAllocationSummaryReport />}
                  />

                  <Route path="production">
                    <Route path="finishing">
                      <Route
                        path="short-shipment-reason-status-report"
                        element={<ShortShipmentReasonStatusReport />}
                      />
                      <Route
                        path="finish-fabric-return-cutting-floor-to-store-report"
                        element={
                          <FinishFabricReturnCuttingFloorToStoreReport />
                        }
                      />
                      <Route
                        path="reconciliation-pending-done-report"
                        element={<ReconciliationPendingDoneReport />}
                      />
                      <Route
                        path="garments-dispatch-details-report"
                        element={<GarmentsDispatchDetailsReport />}
                      />
                      <Route
                        path="compensation-report"
                        element={<CompensationReport />}
                      />
                    </Route>
                    <Route path="cutting">
                      <Route
                        path="date-wise-fabric-requisition-receive-report"
                        element={<DateWiseFabricRequisitionReceiveReport />}
                      />
                    </Route>
                    <Route path="sewing">
                      <Route
                        path="daily-sewing-efficiecy-report"
                        element={<DailySewingEfficiencyReport />}
                      />
                      <Route
                        path="sewing-production-status-report"
                        element={<SewingProductionStatusReport />}
                      />
                      <Route
                        path="style-wise-avg-efficiency-report"
                        element={<StyleWiseAvgEfficiencyReport />}
                      />
                      <Route
                        path="general-and-ot-hours-production-report"
                        element={<GeneralAndOTHoursProductionReport />}
                      />
                      <Route
                        path="general-and-ot-hours-production-line-wise-report"
                        element={<GeneralAndOTHoursProductionLineWiseReport />}
                      />
                      <Route
                        path="online-display-board"
                        element={<OnlineDisplayBoard />}
                      />
                      <Route
                        path="online-display-board-view"
                        element={<OnlineDisplayBoardView />}
                      />
                    </Route>
                  </Route>

                  <Route path="planning">
                    <Route
                      path="internal-product-placement-sheet-summary-report"
                      element={<InternalProductPlacementSheetReport />}
                    />
                  </Route>

                  <Route path="merchandising">
                    <Route
                      path="size-wise-order-summary-report"
                      element={<SizeWiseOrderSummaryReport />}
                    />
                    <Route path="sample-program">
                      <Route
                        path="sample-program-report"
                        element={<SampleProgramReportIndex />}
                      />
                    </Route>
                    <Route
                      path="yarn-additional-booking-report"
                      element={<YarnAdditionalBookingReportIndex />}
                    />
                    <Route path="booking">
                      <Route
                        path="yarn-booking-report"
                        element={<YarnBookingReportIndex />}
                      />
                      <Route
                        path="fabric-booking-report"
                        element={<FabricBookingReportIndex />}
                      />
                    </Route>
                    <Route path="work-order">
                      <Route
                        path="acc-wo-hangtagsticker-rpt"
                        element={<AccessoriesWoReport />}
                      />
                      <Route
                        path="acc-wo-bkl-carelabel-rpt"
                        element={<AccessoriesWoReport_Carelabel />}
                      />
                      <Route
                        path="george-various-material-rpt"
                        element={<GeorgeVariousMaterialReport />}
                      />
                      <Route
                        path="starco-sticker-rpt"
                        element={<StarcoStickerReport />}
                      />
                      <Route
                        path="yarn-twisting-wrok-order-rpt"
                        element={<YarnTwistingWorkOrderReport />}
                      />
                      <Route
                        path="starco-label-rpt"
                        element={<StarcoLabelReport />}
                      />
                      <Route
                        path="block-accessories-rpt"
                        element={<BlockAccessoriesReport />}
                      ></Route>
                      <Route
                        path="accessories-rpt"
                        element={<AccessoriesReport />}
                      ></Route>
                      <Route
                        path="accessories-rpt-with-po"
                        element={<AccessoriesReportWithPo />}
                      ></Route>
                    </Route>
                    <Route
                      path="style-wise-fabric-comsump-report"
                      element={<StyleWiseFabricConsumptionReport />}
                    />
                    <Route
                      path="style-wise-profig-loss-report"
                      element={<StyleWiseProfitLossReportIndex />}
                    />
                    <Route
                      path="a-to-z-report"
                      element={<AtoZReportIndex />}
                    />
                    <Route
                      path="BudgetWiseCostBreakdown"
                      element={<BudgetWiseCostBreakdownIndex />}
                    />
                    <Route
                      path="po-wise-fabric-access-status-report"
                      element={<POwiseFabricAndAccessoriesStatusReport />}
                    />
                    <Route
                      path="general-block-fabric-status-report"
                      element={<GeneralBlockFabricStatusReport />}
                    />
                    <Route
                      path="general-block-fabric-status-view"
                      element={<GeneralBlockFabricStatusView />}
                    />
                    <Route
                      path="shipment-delay-rpt"
                      element={<ShipmentDelayReport />}
                    ></Route>
                    <Route
                      path="shipment-delay-rpt-pdf"
                      element={<ShipmentDelayReportPDF />}
                    ></Route>
                    <Route
                      path="monthly-order-vs-shipment-status-report"
                      element={<MonthlyOrderVsShipmentStatusReport />}
                    ></Route>
                    <Route
                      path="emblishment-status-report"
                      element={<EmblishmentStatusReport />}
                    ></Route>
                    <Route
                      path="create-date-wise-po-summary-report"
                      element={<CreateDateWisePoSummaryReport />}
                    ></Route>
                    <Route
                      path="compensation-claim-report"
                      element={<CompensationClaimReport />}
                    ></Route>
                    <Route
                      path="material-order-yarn-dyeing-report"
                      element={<MaterialOrderYarnDyeingReport />}
                    ></Route>
                    <Route
                      path="budget-report"
                      element={<BudgetReport />}
                    ></Route>
                    <Route
                      path="budget-report-format2"
                      element={<BudgetReportFormat2 />}
                    ></Route>
                  </Route>

                  <Route path="textile">
                    <Route path="knitting">
                      <Route
                        path="date-wise-knitting-program-report"
                        element={<DateWiseKnittingProgramReport />}
                      />
                      <Route
                        path="knitting-production-report"
                        element={<KnittingProductionReport />}
                      />
                      <Route
                        path="daily-knitting-update"
                        element={<DailyKnittingUpdateReport />}
                      />
                      <Route
                        path="grey-fabric-challan-report"
                        element={<GreyFabricChallanReport />}
                      />
                      <Route
                        path="knitting-program-report"
                        element={<KnittingProgramReport />}
                      />
                      <Route
                        path="party-wise-knitting-program-report"
                        element={<PartyWiseKnittingProgramReport />}
                      />
                    </Route>
                    <Route path="dyeing">
                      <Route
                        path="grey-batch-status-report"
                        element={<GreyBatchStatusReport />}
                      />
                      <Route
                        path="dyeing-buyer-wise-grey-stock-report"
                        element={<DyeingBuyerWiseGreyStockReport />}
                      />
                      <Route
                        path="buyer-wise-grey-fabric-receive-view"
                        element={<BuyerWiseGreyFabricReceiveView />}
                      />
                      <Route
                        path="buyer-wise-grey-fabric-receive"
                        element={<BuyerWiseGreyFabricReceiveIndex />}
                      />
                      <Route
                        path="batch-wise-approval-status-report"
                        element={<BatchWiseApprovalStatusReport />}
                      />
                      <Route
                        path="buyer-wise-dyeing-monthly-summ-view"
                        element={<BuyerWiseDyeingMonthlySummaryReportView />}
                      />
                      <Route
                        path="buyer-wise-dyeing-monthly-summ-rpt-index"
                        element={<BuyerWiseDyeingMonthlySummaryReportIndex />}
                      />
                      <Route
                        path="process-wise-dyeing-finish-production-rpt"
                        element={<ProcessWiseDyeingFinishProductionReport />}
                      />
                      <Route
                        path="subcontract-batch-wise-fabric-delivery-report"
                        element={<SubcontractBatchWiseFabricDeliveryReport />}
                      />
                      <Route
                        path="in-house-batch-wise-fabric-delivery-report"
                        element={<InHouseBatchWiseFabricDeliveryReport />}
                      />
                    </Route>
                  </Route>

                  <Route path="store">
                    <Route path="accessories-store">
                      <Route
                        path="accessories-receive-return-challan-gatepass-report"
                        element={
                          <AccessoriesReceiveReturnChallanGatePassReport />
                        }
                      />
                      <Route
                        path="accessories-issue-return-challan-report"
                        element={<AccessoriesIssueReturnChallanReport />}
                      />
                      <Route
                        path="monthly-yarn-costing-report"
                        element={<MonthlyYarnCostingReport />}
                      />
                      <Route
                        path="partywise-yarnissue-greyrcv-balance-summary-report"
                        element={<PartyWiseYanrIssueAndGreyRcvSummaryIndex />}
                      />
                      <Route
                        path="accessories-receive-status-by-challan-no-report"
                        element={<AccessoriesReceiveStatusByChallanNoReport />}
                      />
                    </Route>
                    <Route path="yarn-store">
                      <Route
                        path="yarn-rcv-issue-register-report"
                        element={<YarnRcvIssueRegisterReport />}
                      />
                      <Route
                        path="date-wise-yarn-allocation-report"
                        element={<DateWiseYarnAllocationReport />}
                      />
                      <Route
                        path="lot-wise-yarn-stock-report"
                        element={<LotWiseYarnStockReport />}
                      />
                      <Route
                        path="yarn-stock-after-alloction-report"
                        element={<YarnStockAfterAlloctionReport />}
                      />
                      <Route
                        path="yarn-return-challan-report"
                        element={<YarnReturnChallanReport />}
                      />
                      <Route
                        path="yarn-transfer-challan-report"
                        element={<YarnTransferChallanReport />}
                      />
                      <Route
                        path="yarn-transfer-challan-report-format2"
                        element={<YarnTransferReportFormat2 />}
                      />
                      <Route
                        path="order-wise-knit-dyeing-status-report"
                        element={<OrderWiseKnittingDyeingStatusReportIndex />}
                      />
                      <Route
                        path="order-wise-knit-dyeing-status-report-f2"
                        element={<OrderWiseKnittingDyeingStatusReportIndexF2 />}
                      />
                      <Route
                        path="outside-yissue-grcv-status-report"
                        element={<OutSideYIssueGrcvStatusReport />}
                      />
                      <Route
                        path="yarn-issue-status-report"
                        element={<YarnIssueStatusReportIndex />}
                      />
                      <Route
                        path="Buyer-Wise-Yarn-Possition-Report"
                        element={<BuyerWiseYarnPossitionReportIndex />}
                      />
                      <Route
                        path="yarn-issue-for-dyeing-report"
                        element={<YarnIssueForDyeingReportIndex />}
                      />
                      <Route
                        path="yarn-issue-for-twisting-report"
                        element={<YarnIssueForTwistingReportIndex />}
                      />
                      <Route
                        path="monthly-yarn-costing-report"
                        element={<MonthlyYarnCostingReport />}
                      />
                      <Route
                        path="partywise-yarnissue-greyrcv-balance-summary-report"
                        element={<PartyWiseYanrIssueAndGreyRcvSummaryIndex />}
                      />
                      <Route
                        path="yarn-delivery-challan-gate-pass-report"
                        element={<YarnDeliveryChallanGatePassReport />}
                      />
                      <Route
                        path="date-wise-yarn-receive-register-report"
                        element={<DateWiseYarnReceiveRegisterReport />}
                      />
                    </Route>
                    <Route path="grey-store">
                      {GreyFabricStoreRoute().map((p) => (
                        <Route
                          key={p.path}
                          path={p.path}
                          element={p.component}
                        />
                      ))}
                      <Route
                        path="grey-fabric-transfer-report"
                        element={<GreyFabricTransferReport />}
                      />
                      <Route
                        path="grey-fabric-issue-to-dyeing-challan"
                        element={<GreyFabricIssueToDyeingChallanIndex />}
                      />
                      <Route
                        path="date-wise-yarn-and-grey-fabric-stock-report"
                        element={<DateWiseYarnAndGreyFabricStockReport />}
                      />
                      <Route
                        path="date-wise-grey-fabric-delivery-to-dyeing-report"
                        element={<DateWiseGreyFabcirDeliveryToDyeingReport />}
                      />
                    </Route>
                    <Route path="finish-fabric-store">
                      <Route
                        path="date-wise-fabric-purchase-receive-register-report"
                        element={<DateWiseFabricPurchaseReceiveRegisterReport />}
                      />
                      {FinishFabricStoreRoute().map((p) => (
                        <Route
                          key={p.path}
                          path={p.path}
                          element={p.component}
                        />
                      ))}
                    </Route>
                  </Route>

                  <Route path="embellishment">
                    <Route
                      path="supplier-wise-emb-stock-report"
                      element={<SupplierWiseEmbStockReport />}
                    />
                    <Route
                      path="embellishment-budget-sheet"
                      element={<EmblishmentBudgetSheet />}
                    />
                    <Route
                      path="embellishment-daily-production-report"
                      element={<EmbellishmentDailyProductionReport />}
                    />
                    <Route
                      path="embellishment-daily-summary-production-report"
                      element={<EmbellishmentDailySummaryProductionReport />}
                    />
                    <Route
                      path="embellishment-order-details-report"
                      element={<EmbellishmentOrderDetailsReport />}
                    />

                    <Route
                      path="embellishment-order-summary-report"
                      element={<EmbellishmentOrderSummaryReport />}
                    />

                    <Route
                      path="embellishment-delivery-report"
                      element={<EmbellishmentDeliveryReport />}
                    />
                  </Route>

                  <Route path="ie">
                    <Route
                      path="style-change-over-report"
                      element={<StyleChangeOver />}
                    />
                    <Route
                      path="operation-bulletin-report"
                      element={<OperationBulletinReport />}
                    />
                    <Route
                      path="thread-consumption-report"
                      element={<ThreadConsumptionReport />}
                    />
                  </Route>
                  <Route path="quality">
                    <Route
                      path="import-fabric-inspection-info-report"
                      element={<ImportFabricInspectionInfoReport />}
                    />
                  </Route>
                  <Route path="sweater">
                    <Route path="swt-planning">
                      {/* <Route index element={<PlanningBoardConfigureIndex />} /> */}
                      <Route
                        path="line-loading-plan"
                        element={<LineLoadingPlanIndex />}
                      />
                    </Route>
                  </Route>

                  <Route path="*" element={<NoPage />} />

                  {/* <Route index element={<Crm />} />
                      <Route
                        path={`${import.meta.env.BASE_URL}dashboards/crm`}
                        element={<Crm />}
                      /> */}
                </Route>
              </Routes>
            </React.Suspense>
          </AuthProvider>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster />
        <AppConfirmationDialog />
      </QueryClientProvider>
    </React.Fragment>
  </StrictMode>
);
