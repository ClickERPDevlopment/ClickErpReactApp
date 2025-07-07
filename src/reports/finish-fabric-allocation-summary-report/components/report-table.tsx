/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FinishFabricAllocationSummaryReportDetailsType,
  FinishFabricAllocationSummaryReportMasterType,
} from "../finish-fabric-allocation-summary-report-type";
import ReportTableRow from "./report-table-row";

export default function ReportTable({
  masterData,
  detailsData,
}: {
  masterData: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocationSummaryReportDetailsType[];
}) {
  const columns = [
    { name: "SUPPLIER", classes: "min-w-[150px]" },
    { name: "WO NO", classes: "min-w-[150px]" },
    { name: "ORDER REF", classes: "min-w-[100px]" },
    { name: "ITEM NAME", classes: "min-w-[200px]" },
    { name: "MATERIAL COLOR", classes: "" },
    { name: "WO QTY", classes: "" },
    { name: "RCV QTY", classes: "" },
    { name: "RET QTY", classes: "" },
    { name: "RCV BAL", classes: "" },
    { name: "ALLO. QTY", classes: "" },
    { name: "ALLO. BAL", classes: "" },
    { name: "RATE", classes: "" },
    { name: "VALUE", classes: "" },
    { name: "UOM", classes: "" },
    { name: "PCS BAL", classes: "" },
  ];

  const totalWoQty = masterData.reduce((acc, item) => {
    return (acc += item.WO_QTY);
  }, 0);

  const totalRcvQty = masterData.reduce((acc, item) => {
    return (acc += item.RECEIVE_QTY);
  }, 0);

  const totalRetQty = masterData.reduce((acc, item) => {
    return (acc += item.RET_QTY);
  }, 0);


  let totaAllocationQty = 0;
  let totalValue = 0;


  return (
    <>
      <table className="w-[100%]">
        <thead className="">
          <tr id="table-header-row" className="bg-teal-200">
            {columns.map((c) => (
              <th
                key={Math.random()}
                className={"border p-1 text-xs  " + c.classes}
              >
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-body">
          {masterData.map((mData) => {
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

            return (
              <ReportTableRow
                key={Math.random()}
                masterData={mData}
                detailsData={filteredData}
              />
            );
          })}

          <tr>
            <td
              className="border text-center text-xs font-semibold"
              colSpan={5}
            >
              Total
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalWoQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalRcvQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalRetQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {(totalRcvQty - totalRetQty - totalWoQty).toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totaAllocationQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {(totalRcvQty - totaAllocationQty).toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold"></td>
            <td className="border text-center text-xs font-semibold">
              {totalValue.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold"></td>
            <td className="border text-center text-xs font-semibold"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
