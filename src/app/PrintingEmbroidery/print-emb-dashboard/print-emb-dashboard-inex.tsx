import AppPageContainer from "@/components/app-page-container";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import MonthlyOrderSummaryChartView from "./components/monthly-order-summary-chart-view";

function PrintEmbDashboardIndex() {

  useEffect(() => {
  }, []);


  return (
    <div className="p-5">
      <AppPageContainer>
        <MonthlyOrderSummaryChartView />
      </AppPageContainer>
    </div>
  );
}

export default PrintEmbDashboardIndex;
