import { FinishFabricAllocationSummaryReportMasterType } from "../../finish-fabric-allocation-summary-report-type";

function ReportRow({
  data
}: {
  data: FinishFabricAllocationSummaryReportMasterType[];
}) {

  const totalQty = data.reduce((acc, item) => acc + item.WO_QTY, 0)
  const totalValue = data.reduce((acc, item) => acc + (item.WO_QTY * item.SUPPLIER_RATE_PER_PCS), 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border text-center text-xs">{data[0]?.UOM}</td>
        <td className="border text-center text-xs">{data[0]?.SUPPLIER_RATE_PER_PCS}</td>
        <td className="border text-center text-xs">{totalQty.toFixed(2)}</td>
        <td className="border text-center text-xs">{totalValue.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportRow;
