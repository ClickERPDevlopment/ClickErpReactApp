/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { ICreateDateWisePoSummaryReport } from "../create-date-wise-po-summary-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";

function Report({
  data,
  searchParams,
}: {
  data: ICreateDateWisePoSummaryReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = [
    "SL No",
    "Prefix",
    "Buyer",
    "Style",
    "Po",
    "Item Type",
    "Order Qty",
    "Shipdate",
    "Placement Month",
    "CM($) per pcs",
    "CM($) per Dzn",
    "Total CM($)",
    "FOB($) per pcs",
    "Total FOB($)",
    "Create By",
    "Create Date",
  ];

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0);

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="text-center">
                <td className="border border-gray-300">
                  {index + 1}
                </td>
                <td className="border border-gray-300">
                  {item.COMPANY_PREFIX}
                </td>
                <td className="border border-gray-300">
                  {item.BUYER_NAME}
                </td>
                <td className="border border-gray-300">{item.STYLE_NO}</td>
                <td className="border border-gray-300">{item.PO_NO}</td>
                <td className="border border-gray-300">{item.ITEM_TYPE}</td>
                <td className="border border-gray-300">
                  {item.QTY}
                </td>
                {moment(item.SHIP_DATE).format("DD-MMM-YY") !== "01-Jan-01" ?
                  <td className="border border-gray-300">
                    {moment(item.SHIP_DATE).format("DD-MMM-YY")}
                  </td> : <td className="border border-gray-300"></td>
                }
                <td className="border border-gray-300">{moment(item.ORDERPLACEMENTMONTH).format("MMM-YY")}</td>
                <td className="border border-gray-300">
                  {item.CM.toFixed(3)}
                </td>
                <td className="border border-gray-300">
                  {(item.CM * 12).toFixed(3)}
                </td>
                <td className="border border-gray-300">{(item.CM * item.QTY).toFixed(3)}</td>
                <td className="border border-gray-300">
                  {item.FOB.toFixed(3)}
                </td>
                <td className="border border-gray-300">
                  {(item.FOB * item.QTY).toFixed(3)}
                </td>
                <td className="border border-gray-300">{item.CREATEBY}</td>
                <td className="border border-gray-300 text-nowrap">{moment(item.CREATEDATE).format("DD-MMM-YY")}</td>
              </tr>
            ))}
            <tr className="font-bold text-center">
              <td colSpan={6} className="border border-gray-300">
                Total
              </td>
              <td className="border border-gray-300">{totalQty}</td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
