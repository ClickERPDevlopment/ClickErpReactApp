/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
// import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { LotWiseYarnStockReportType } from "../yarn-stock-after-allocation-report-type";


function Report({
  data,
  searchParams
}: {
  data: LotWiseYarnStockReportType[];
  searchParams: { dtDate: string, chOnlyWhiteLot: boolean }
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: LotWiseYarnStockReportType[],
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

  interface GroupedByDate {
    [key: string]: {
      items: LotWiseYarnStockReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["YARN"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL NO.",
    "LC NO/WO NO",
    "LC DATE",
    "FIRST RCV",
    "LAST RCV",
    "TYPE",
    "BRAND",
    "YARN LOT",
    "Y. RCVD QTY",
    "Y. ALLO QTY",
    "AL. STOCK",
    "ISSUE QTY",
    "STOCK",
    "YARN ADJ.",
  ];

  const totalYarnRcvQty = data.reduce((acc, item) => acc + item.YARN_RECEIVED_QNT, 0)
  const totalYarnAllocationQty = data.reduce((acc, item) => acc + item.YARN_ALLOCATION_QNT, 0)
  const totalYarnIssueQty = data.reduce((acc, item) => acc + item.YARN_ISSUE_QNT, 0)
  const totalStock = data.reduce((acc, item) => acc + item.BALANCE_QUANTITY, 0)
  const totalYarnAdj = data.reduce((acc, item) => acc + item.YARN_ADJUSTMENT_QTY, 0)
  const totalAllocationStock = data.reduce((acc, item) => acc + item.AFTER_ALLO_STOCK, 0)



  let groupLength = 0;


  function exportToExcel() {
    const tableElement = document.querySelector("#report-div");
    if (!tableElement) return;

    const ws = XLSX.utils.table_to_sheet(tableElement);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    XLSX.writeFile(wb, "Report.xlsx");
  }

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="text-end mt-2 print:hidden">
        <Button
          size="sm"
          className="ms-auto  px-3 py-0.1 text-sm bg-lime-900"
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </div>
      <div className="p-2" id="report-div">
        <ReportHeader
          data={data}
          searchParams={searchParams}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "14px", backgroundColor: "#b5fcdb" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => {
              let prevLength = groupLength;
              groupLength += groupedByDate[key].items.length;
              return <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                groupLength={prevLength}
              ></ReportTable>
            })}
            <tr style={{ fontSize: "14px", backgroundColor: "#b5fcdb" }} className="font-bold">
              <td colSpan={8} className="border border-gray-950 p-0.5">Grand Total</td>
              <td className="border border-gray-950 p-0.5">{totalYarnRcvQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalYarnAllocationQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalAllocationStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalYarnIssueQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalYarnAdj.toFixed(2)}</td>
            </tr>
          </tbody>
          <tfoot className="border-t border-gray-950 p-0.5"></tfoot>
        </table>

        <div className="mt-[144px]"></div>

        <div>
          {/* <ReportFooter></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
