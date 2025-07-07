import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";
import { FinishFabricAllocationSummaryReportMasterType } from "../../finish-fabric-allocation-summary-report-type";

function ReportRow({
  data,
  detailsData
}: {
  data: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocatinReportDetailsType[];
}) {

  const totalRcvQty = data.reduce((acc, item) => acc + item.RECEIVE_QTY, 0)

  let totaAllocationQty = 0;
  let totalValue = 0;

  data.map((mData) => {
    const filteredData = detailsData.filter(
      (dData) =>
        dData.BLOCK_WORK_ORDER_ID === mData.WO_ID &&
        dData.FABRIC_ID === mData.FABRIC_ID &&
        dData.STOCK_FABRIC_COLOR_ID === mData.GMT_COLOR_ID &&
        dData.ORDER_REFERENCE === mData.ORDER_REFERENCE
    );

    totaAllocationQty += filteredData.reduce((acc, item) => {
      return (acc += item.ALLOCATED_QTY);
    }, 0);

    const allocationQty = filteredData.reduce((acc, item) => {
      return (acc += item.ALLOCATED_QTY);
    }, 0);

    totalValue += (mData.RECEIVE_QTY - allocationQty) * mData.SUPPLIER_RATE_PER_PCS;

  })

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border text-center text-xs">{data[0]?.UOM}</td>
        <td className="border text-center text-xs">{data[0]?.SUPPLIER_RATE_PER_PCS}</td>
        <td className="border text-center text-xs">{(totalRcvQty - totaAllocationQty).toFixed(2)}</td>
        <td className="border text-center text-xs">{(totalValue).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportRow;
