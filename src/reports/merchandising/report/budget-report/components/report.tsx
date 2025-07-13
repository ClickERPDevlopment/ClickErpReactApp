/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { BudgetReportResponseType, BudgetReportType } from "../budget-report-type";
import useAppClient from "@/hooks/use-AppClient";


function Report({
  data,
}: {
  data: BudgetReportResponseType | undefined;
}) {

  const client = useAppClient();
  const uniqueKeys: Set<string> = new Set();


  function groupBy(
    data: BudgetReportType[],
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
      items: BudgetReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data?.Report, ["DS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "PARTICULARS",
    "MTL",
    "QTY",
    "UOM",
    "PRICE($)",
    "TOTAL($)",
  ];

  const totalBudgetValue = data?.Report?.reduce(
    (acc, item) => acc + Number(item.BUDGET_TOTAL_VALUE),
    0
  );


  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3 gap-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Budget No.</td>
                  <td className="align-top">: {data?.Report[0]?.BUDGET_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Budget For</td>
                  <td className="align-top">: {data?.Report[0]?.BUYER}</td>
                </tr>
                <tr>
                  <td className="align-top">Style</td>
                  <td className="align-top">: {data?.Report[0]?.STYLENO}</td>
                </tr>
                <tr>
                  <td className="align-top">Item</td>
                  <td className="align-top">: {data?.Report[0]?.ITEM}</td>
                </tr>
                <tr>
                  <td className="align-top">PO</td>
                  <td className="align-top">: {data?.Report[0]?.COMBINE_PONO}</td>
                </tr>
                <tr>
                  <td className="align-top">FOB</td>
                  <td className="align-top">: {data?.FOB}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">SMV</td>
                  <td className="align-top">: {data?.SMV}</td>
                </tr>
                {client.currentClient == client.EURO ?
                  <>
                    <tr>
                      <td className="align-top">Required CM (SMV x 0.07)</td>
                      <td className="align-top">: {data?.RequiredCM}</td>
                    </tr>
                  </> : ''
                }
                <tr>
                  <td className="align-top">Qty(Pcs)</td>
                  <td className="align-top">: {data?.Report[0]?.PO_QTY.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Total FOB Value($)</td>
                  <td className="align-top">: {data?.Report[0]?.TOTAL_FOB_VALUE.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Buying Commission($)</td>
                  <td className="align-top">: {((data?.Report[0]?.TOTAL_FOB_VALUE ?? 0) - (data?.Report[0]?.BALANCE_VALUE ?? 0)).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Balance($)</td>
                  <td className="align-top">: {data?.Report[0]?.BALANCE_VALUE.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}

          </tbody>
        </table>
        <div className="flex justify-between">
          <div></div>
          <table className="font-bold align-top">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">TOTAL EXPENDITURES($)</td>
                <td className="align-top">: {totalBudgetValue?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="align-top">BUDGETED MARKUP($)</td>
                <td className="align-top">: {((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)).toFixed((2))}</td>
              </tr>
              <tr>
                <td className="align-top">MARKUP %</td>
                <td className="align-top">: {((((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)) / (data?.Report[0]?.TOTAL_FOB_VALUE ?? 0)) * 100).toFixed((2))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <ReportFooter data={data?.Report ?? []}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
