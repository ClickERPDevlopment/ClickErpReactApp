/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";
import { FinishFabricAllocationSummaryReportMasterType } from "../../finish-fabric-allocation-summary-report-type";
import ReportRow from "./report-row";

function Report({
  data,
  detailsData
}: {
  data: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocatinReportDetailsType[]
}) {

  //set table header
  const firstHeader: string[] = [
    "UOM",
    "RATE",
    "ALLO. BAL",
    "VALUE",
  ];

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: FinishFabricAllocationSummaryReportMasterType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface IGroupedData {
    [key: string]: {
      items: FinishFabricAllocationSummaryReportMasterType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["UOM", "SUPPLIER_RATE_PER_PCS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

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
    <div className="text-sm">
      <div className="p-2">
        <table className="border-collapse border border-gray-300  w-[100%]">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ backgroundColor: "#a7f3d0" }} id="table-header-row" className="bg-teal-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border text-center text-xs">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {uniqueKeysArray?.map((key) => (
              <ReportRow
                data={groupedData[key].items}
                detailsData={detailsData}
              ></ReportRow>
            ))}

            <tr className="text-center font-bold">
              <td colSpan={2} className="border text-center text-xs">Total</td>
              <td className="border text-center text-xs">
                {(totalRcvQty - totaAllocationQty).toFixed(2)}
              </td>
              <td className="border text-center text-xs">
                {totalValue.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
