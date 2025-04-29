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
                    </Route>
                    <Route path="cutting">
                      <Route
                        path="date-wise-fabric-requisition-receive-report"
                        element={<DateWiseFabricRequisitionReceiveReport />}
                      />
                    </Route>
                    <Route path="sewing">
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

                  <Route path="merchandising">
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
                  </Route>

                  <Route path="textile">
                    <Route path="knitting">
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
                        path="order-wise-knit-dyeing-status-report"
                        element={<OrderWiseKnittingDyeingStatusReportIndex />}
                      />
                      <Route
                        path="outside-yissue-grcv-status-report"
                        element={<OutSideYIssueGrcvStatusReport />}
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
                    </Route>
                    <Route path="finish-fabric-store">
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
                      path="embellishment-budget-sheet"
                      element={<EmblishmentBudgetSheet />}
                    />
                  </Route>

                  <Route path="ie">
                    <Route
                      path="style-change-over-report"
                      element={<StyleChangeOver />}
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
