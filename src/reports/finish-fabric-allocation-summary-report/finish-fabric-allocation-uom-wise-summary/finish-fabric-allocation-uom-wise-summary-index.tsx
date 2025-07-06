import { useEffect, useMemo } from "react";
import Report from "./components/report";
import { FinishFabricAllocationSummaryReportMasterType } from "../finish-fabric-allocation-summary-report-type";
import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";

function FinishFabricAllocationUomWiseSummaryReport({ data, detailsData }: { data: FinishFabricAllocationSummaryReportMasterType[], detailsData: FinishFabricAllocatinReportDetailsType[] }) {
  // Effects
  useEffect(() => {
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.UOM.localeCompare(b.UOM));
  }, [data]);

  return (
    <div>
      <Report
        data={sortedData}
        detailsData={detailsData}
      />
    </div>
  );
}

export default FinishFabricAllocationUomWiseSummaryReport;
