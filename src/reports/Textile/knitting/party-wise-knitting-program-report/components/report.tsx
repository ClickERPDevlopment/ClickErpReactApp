/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";
import { CollarCuffQuantitySummaryReportType } from "../collar-cuff-quantity-summary-report-type";
import ReportSummary from "./report-summary";
import ColorSizeBreakdown from "./color-size-breakdown";

function Report({
  data,
  collarCuffQtySummary
}: {
  data: PartyWiseKnittingProgramType[];
  collarCuffQtySummary: CollarCuffQuantitySummaryReportType[]
}) {

  let uniqueKeys: Set<string> = new Set();
  let dtlsUniqueKeys: Set<string> = new Set();
  let summaryUniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PartyWiseKnittingProgramType[],
    keys: string[]
  ) {

    uniqueKeys.clear();

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
      items: PartyWiseKnittingProgramType[];
    };
  }

  let groupedData: IGroupedData = {};
  let summaryData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["KNITTING_PROGRAM_NO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "FABRIC_TYPE", "MC_DIA", "GAUGE", "FINISH_DIA", "GSM", "COLORNAME", "STITCH_LENGTH", "LYCRA_CM", "START_DATE", "END_DATE", "REMARKS"]);
    dtlsUniqueKeys = new Set(uniqueKeys)


    summaryData = groupBy(data, ["BRAND_NAME", "YARN_LOT", "YARN",]);
    summaryUniqueKeys = new Set(uniqueKeys)

  }

  const dtlsUniqueKeysArray: string[] = Array.from(dtlsUniqueKeys);
  const summaryUniqueKeysArray: string[] = Array.from(summaryUniqueKeys);


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
    "Stitch L.",
    "Lycra cm",
    "Qty(Kgs)",
    "Qty(Pcs)",
    "Start Date",
    "End Date",
    "Remarks",
  ];

  const summaryHeader = [
    "SL",
    "Brand",
    "Yarn Lot",
    "Yarn",
    "Quantity",
  ];


  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );

  const totalQtyPcs = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_PICES),
    0
  );

  let fabricParts: string[] = [];

  let fabricPartWiseData: Record<string, PartyWiseKnittingProgramType[]> = {};

  if (data) {
    fabricParts = Array.from(new Set(data.map(item => item.FABRIC)));

    fabricPartWiseData = fabricParts.reduce((acc, part) => {
      acc[part] = data.filter(item => item.FABRIC === part);
      return acc;
    }, {} as Record<string, PartyWiseKnittingProgramType[]>);
  }

  console.log(fabricPartWiseData)

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}
      className="px-11 text-gray-950">
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
            <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {dtlsUniqueKeysArray?.map((key, index) => (
              <ReportTable
                key={key}
                data={groupedData[key]?.items}
                firstHeader={firstHeader}
                index={index}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "11px" }} className="font-bold">
              <td colSpan={14} className="border border-gray-950 p-0.5">Total</td>
              <td className="border border-gray-950 p-0.5">{totalQtyKg.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{totalQtyPcs.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5">
          <div className="flex justify-between">
            <div>
              <p style={{ fontSize: "11px" }} className="font-bold text-center">Summary</p>
              <table className="border-collapse border border-gray-300  w-[100%]">
                <thead className="print:bg-transparent">
                  <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
                    {summaryHeader?.map((item) =>
                      <th className="border border-gray-950 p-0.5">{item}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {summaryUniqueKeysArray?.map((key, index) => (
                    <ReportSummary
                      key={key}
                      data={summaryData[key]?.items}
                      index={index}
                    ></ReportSummary>
                  ))}

                  <tr style={{ fontSize: "12px" }} className="font-bold">
                    <td colSpan={4} className="border border-gray-950 p-0.5">Total</td>
                    <td className="border border-gray-950 p-0.5">{totalQtyKg.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div>
              <p style={{ fontSize: "11px" }} className="font-bold text-center">
                Collar Cuff Quantity Summary
              </p>
              <table className="border-collapse border border-gray-300  w-[100%]">
                <thead className="print:bg-transparent">
                  <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
                    <th className="border border-gray-950 p-0.5">Fabric</th>
                    <th className="border border-gray-950 p-0.5">PCs Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    collarCuffQtySummary.map(item =>
                      <tr className="border border-gray-950 p-0.5" style={{ fontSize: "11px" }}>
                        <td className="border border-gray-950 p-0.5">{item.FABRIC}</td>
                        <td className="border border-gray-950 p-0.5">{item.PCS_QTY}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-3">
            {
              fabricParts.map(part => {
                const partData = data.filter(item => item.FABRIC === part);
                return (
                  <div className="w-[50%]">
                    <ColorSizeBreakdown
                      key={part}
                      data={partData}
                      fabricPart={part}
                    /></div>
                );
              })
            }
          </div>
        </div>
        <div className="mt-3">
          <p style={{ fontSize: "11px" }}>
            <span className="font-bold">MUST IN ROLL MARK: </span>
            1) MC.NO, 2)Order No, 3) Booking No, 4) Prog SI No, 5) Buyer Name, 6) Color, 7) F/Dia, 8) F/GSM, 9) Y/Count, 10) Lot, 11) F.Type, 12) Brand, 13) Stitch Lengh, 14) Date & shift, 15) Operator Name.
          </p>

          <p style={{ fontSize: "11px" }} className="mt-2">
            <span className="font-bold">NOT ALLOWED: </span>
            Barre, # Sinker Mark/Needle Mark, #Hole/Loop/Press off, #Drop stitch/Pin Hole, #Oill Spot, #Foreign Fiber.
          </p>

          <p style={{ fontSize: "11px" }} className="mt-2">
            <span className="font-bold">N.B: </span>
            If any kind of problem is found in fabrics knitting then must inform to Knitting Department. Without any approval fabrics will not be knitted.
            Marking on each roll of fabrics must be indicated & clearly visible with permanent color. Loose yarn must return after knitting for order close.
          </p>

          <p style={{ fontSize: "11px" }} className="mt-2">
            <span className="font-bold">Knitting Advice: </span>
            {data[0]?.KNITTING_ADVICE}
          </p>

        </div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
