/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { CompensationReportType } from "../compensation-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: CompensationReportType[];
  searchParamsObj: { fromDate: string; toDate: string; }

}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: CompensationReportType[],
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
      items: CompensationReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Date",
    "Compensation No.",
    "OPM",
    "Buyer",
    "PO",
    "Item Type",
    "Qty.",
    "UOM",
    "Rate",
    "Amount",
    "Local Sale",
    "Net Comp. Amount",
    "Party",
  ];

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.RATE * item.QTY, 0);
  const totalSale = data.reduce((acc, item) => acc + item.LOCAL_EARNING_AMT, 0);
  const totalNetCompSale = data.reduce((acc, item) => acc + ((item.QTY * item.RATE) - item.LOCAL_EARNING_AMT), 0);


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParamsObj={searchParamsObj}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="bg-lime-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td className="border border-gray-950 p-0.5 text-center" colSpan={6}>Total</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalAmount}</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalSale.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalNetCompSale.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-10">
          {/* <ReportFooter></ReportFooter> */}
        </div>

      </div>
    </div>
  );
}

export default Report;
