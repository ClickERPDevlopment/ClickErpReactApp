import {
  FinishFabricAllocationSummaryReportDetailsType,
  FinishFabricAllocationSummaryReportMasterType,
} from "../finish-fabric-allocation-summary-report-type";

export default function ReportTableRow({
  masterData,
  detailsData,
}: {
  masterData: FinishFabricAllocationSummaryReportMasterType;
  detailsData: FinishFabricAllocationSummaryReportDetailsType[];
}) {
  const totalAllocationQty = detailsData.reduce((acc, item) => {
    return (acc += item.ALLOCATED_QTY);
  }, 0);


  return (
    <>
      <tr>
        <td className="border text-center text-xs">{masterData?.SUPPLIER}</td>
        <td className="border text-center text-xs">
          {masterData.PINO
            ? masterData.WORK_ORDER_NO + "|" + masterData.PINO
            : masterData.WORK_ORDER_NO}
        </td>
        <td className="border text-center text-xs">
          {masterData?.ORDER_REFERENCE}
        </td>
        <td className="border text-center text-xs">{masterData?.FABRIC}</td>
        <td className="border text-center text-xs">
          {masterData?.GMT_COLOR_ID} {masterData?.MTL_COLOR}
        </td>
        <td className="border text-center text-xs">{masterData?.WO_QTY}</td>
        <td className="border text-center text-xs">
          {masterData?.RECEIVE_QTY}
        </td>
        <td className="border text-center text-xs">
          {masterData?.RET_QTY}
        </td>

        {Number(masterData?.RECEIVE_QTY - masterData?.RET_QTY - masterData.WO_QTY) < 0 ? (
          <td className={`border text-center text-xs text-red-500`}>
            {(masterData?.RECEIVE_QTY - masterData?.RET_QTY - masterData.WO_QTY).toFixed(2)}
          </td>
        ) : (
          <td className={`border text-center text-xs`}>
            {(masterData?.RECEIVE_QTY - masterData?.RET_QTY - masterData.WO_QTY).toFixed(2)}
          </td>
        )}

        <td className="border text-center text-xs">
          {totalAllocationQty?.toFixed(2)}
        </td>

        <td className="border text-center text-xs">
          {isNaN(masterData.RECEIVE_QTY - totalAllocationQty)
            ? "0"
            : (masterData.RECEIVE_QTY - totalAllocationQty).toFixed(2)}
        </td>

        <td className="border text-center text-xs">{masterData?.SUPPLIER_RATE_PER_PCS}</td>
        <td className="border text-center text-xs">{(masterData?.SUPPLIER_RATE_PER_PCS * masterData?.WO_QTY).toFixed(2)}</td>
        <td className="border text-center text-xs">{masterData?.UOM}</td>

        <td className="border text-center text-xs">
          {Number(masterData.CONSUMPTION_PER_DZN) == 0
            ? "0"
            : (
              Math.abs(totalAllocationQty - masterData.RECEIVE_QTY) /
              (Number(masterData.CONSUMPTION_PER_DZN) / 12)
            ).toFixed(2)}
        </td>
      </tr>
    </>
  );
}
