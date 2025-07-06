import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";
import { FinishFabricAllocationSummaryReportMasterType } from "../../finish-fabric-allocation-summary-report-type";

function ReportRow({
  data,
  detailsData
}: {
  data: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocatinReportDetailsType[];
}) {

  const totalAllocatedQty = detailsData.reduce((acc, item) => {
    const isMatch =
      item.BLOCK_WORK_ORDER_ID === data[0]?.WO_ID &&
      item.FABRIC_ID === data[0]?.FABRIC_ID &&
      item.STOCK_FABRIC_COLOR_ID === data[0]?.GMT_COLOR_ID &&
      item.ORDER_REFERENCE === data[0]?.ORDER_REFERENCE;

    return acc + (isMatch ? item.ALLOCATED_QTY : 0);
  }, 0);

  const totalRcvQty = data.reduce((acc, item) => acc + item.RECEIVE_QTY, 0);

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border text-center text-xs">{data[0]?.UOM}</td>
        <td className="border text-center text-xs">{data[0]?.SUPPLIER_RATE_PER_PCS}</td>
        <td className="border text-center text-xs">{(totalRcvQty - totalAllocatedQty).toFixed(2)}</td>
        <td className="border text-center text-xs">{((totalRcvQty - totalAllocatedQty) * data[0]?.SUPPLIER_RATE_PER_PCS).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportRow;
