import { useEffect, useMemo } from "react";
import Report from "./components/report";
import { FinishFabricAllocationSummaryReportMasterType } from "../finish-fabric-allocation-summary-report-type";

function FinishFabricAllocationUomWiseSummaryReport({ data }: { data: FinishFabricAllocationSummaryReportMasterType[] }) {
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
      />
    </div>
  );
}

export default FinishFabricAllocationUomWiseSummaryReport;
