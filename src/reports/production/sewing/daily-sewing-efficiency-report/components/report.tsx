/* eslint-disable @typescript-eslint/no-explicit-any */
// import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";
import ReportTable from "./report-table";

function Report({
  data,
  searchParamsObj
}: {
  data: DailySewingEfficiencyReportType[];
  searchParamsObj: { fromDate: string; toDate: string; companyId: number }

}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DailySewingEfficiencyReportType[],
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
      items: DailySewingEfficiencyReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["FLOORNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "LINE",
    "BUYER",
    "STYLE",
    "ITEM",
    "SMV",
    "O/P",
    "H/P",
    "TOTAL M/P",
    "HOURLY TARGET",
    "TARGET",
    "QC PASS",
    "PERFORMANCE",
    "W/H",
    "EFFICIENCY %",
    "FOB PER PCS ($)",
    "CM PER DZN ($)",
    "EARNED FOB ($)",
    "EARNED CM ($)",
    "COST",
    "TGT. EFF. %",
    "REMARKS",
  ];


  let grandTotalOperator = 0;
  let grandTotalHelper = 0;
  let grandTotalTarget = 0;
  //let grandTotalWorkHour = 0;
  let grandTotalAvailableMin = 0;

  for (const floorKey in groupedData) {
    const floorItems = groupedData[floorKey].items;

    const seenLines = new Set<string>();

    for (const item of floorItems) {
      const lineName = item.LINENAME;

      if (!seenLines.has(lineName)) {
        seenLines.add(lineName);
        grandTotalOperator += item.OPERATOR ?? 0;
        grandTotalHelper += item.HELPER ?? 0;
        grandTotalTarget += item.TOTALTARGET ?? 0;
        //grandTotalWorkHour += item.ACTUALHOURS ?? 0;
        grandTotalAvailableMin += item.AVAILABLEMIN ?? 0;
      }
    }
  }

  const totalHourlyTarget = data.reduce((acc, item) => acc + (item.TOTALTARGET / item.ACTUALHOURS), 0)
  const totalQcPass = data.reduce((acc, item) => acc + item.SEWINGOUTPUT, 0)
  const totalEarneMin = data.reduce((acc, item) => acc + item.EARNINGMIN, 0)
  const totalTargetEarnMin = data.reduce((acc, item) => acc + Number(item.SMVSEWING * item.SEWINGOUTPUT), 0)
  const totalSmv = data.reduce((acc, item) => acc + item.SMVSEWING, 0)
  const totalFob = data.reduce((acc, item) => acc + item.TOTALFOB, 0)
  const totalCM = data.reduce((acc, item) => acc + item.TOTALCM, 0)
  const grandTotalWorkHour = data.reduce((acc, item) => acc + item.ACTUALHOURS, 0)

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParamsObj={searchParamsObj}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => {

              return <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>

            })}
            <tr style={{ fontSize: "14px", backgroundColor: "#c4f2dc" }} className="font-bold">
              <td colSpan={4} className="border border-gray-950 p-0.5 text-nowrap text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{(totalSmv / data.length).toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{grandTotalOperator}</td>
              <td className="border border-gray-950 p-0.5 text-center">{grandTotalHelper}</td>
              <td className="border border-gray-950 p-0.5 text-center">{grandTotalOperator + grandTotalHelper}</td>
              <td className="border border-gray-950 p-0.5 text-center">{Math.round(totalHourlyTarget)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{Math.round(grandTotalTarget)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalQcPass}</td>
              <td className="border border-gray-950 p-0.5 text-center">{((totalTargetEarnMin) * 100 / grandTotalAvailableMin).toFixed(2)} %</td>
              <td className="border border-gray-950 p-0.5 text-end">{(grandTotalWorkHour / data.length)?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{(totalEarneMin * 100 / grandTotalAvailableMin)?.toFixed(2)} %</td>
              <td className="border border-gray-950 p-0.5 text-end">{(totalFob / totalQcPass)?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{(totalCM * 12 / totalQcPass)?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{(totalFob)?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{(totalCM)?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-end">{ }</td>
              <td className="border border-gray-950 p-0.5 text-center">{(grandTotalTarget * (totalSmv / data.length) * 100 / grandTotalAvailableMin).toFixed(2)} %</td>
              <td className="border border-gray-950 p-0.5 text-end">{ }</td>
            </tr>

          </tbody>
        </table>

        <div className="pt-10">
        </div>

      </div>
    </div>
  );
}

export default Report;
