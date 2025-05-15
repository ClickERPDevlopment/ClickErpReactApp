/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";
import { CollarCuffQuantitySummaryReportType } from "../collar-cuff-quantity-summary-report-type";

function Report({
  data,
  collarCuffQtySummary
}: {
  data: PartyWiseKnittingProgramType[];
  collarCuffQtySummary: CollarCuffQuantitySummaryReportType[]
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PartyWiseKnittingProgramType[],
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
      items: PartyWiseKnittingProgramType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["PONO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "FABRIC_TYPE", "MC_DIA", "GAUGE", "FINISH_DIA", "GSM", "COLORNAME", "STITCH_LENGTH", "LYCRA_CM", "START_DATE", "END_DATE", "REMARKS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL",
    "P. No.",
    "Buyer",
    "Style",
    "Yarn",
    "Lot x Brand",
    "Fabrication",
    "Full/ Half Feeder",
    "McDia x GG",
    "Finish Dia X Type",
    "GSM",
    "Color",
    "SL",
    "LYCRA CM",
    "Qty(Kgs)",
    "Qty(Pcs)",
    "Start Date",
    "End Date",
    "Remarks",
  ];

  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );

  const totalQtyPcs = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_PICES),
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
                  <td className="align-top">Factory Name.</td>
                  <td className="align-top">: {data[0]?.KNIT_HOUSE}</td>
                </tr>
                <tr>
                  <td className="align-top">Address</td>
                  <td className="align-top">: {data[0]?.KNIT_HOUSE_ADDRESS}</td>
                </tr>
                <tr>
                  <td className="align-top">Att</td>
                  <td className="align-top">: </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Program Date</td>
                  <td className="align-top">: {moment(data[0]?.KNITTING_PROG_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Job Number</td>
                  <td className="align-top">: {data[0]?.PONO}</td>
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
            {uniqueKeysArray?.map((key, index) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                index={index}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "12px" }} className="">
              <td colSpan={14} className="border border-gray-950 p-0.5">Total</td>
              <td className="border border-gray-950 p-0.5">{totalQtyKg}</td>
              <td className="border border-gray-950 p-0.5">{totalQtyPcs}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5">
          <table className="border-collapse border border-gray-300  w-[100%] mt-3">
            <thead className="print:bg-transparent">
            </thead>
            <tbody>
              {
                collarCuffQtySummary.map(item => <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
                  <tr className="border border-gray-950 p-0.5">{item.FABRIC}</tr>
                  <tr className="border border-gray-950 p-0.5">{item.PCS_QTY}</tr>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
