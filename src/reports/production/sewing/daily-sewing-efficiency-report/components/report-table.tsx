/* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from "moment";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data
}: {
  data: DailySewingEfficiencyReportType[];
  firstHeader: string[] | null;
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
    groupedData = groupBy(data, ["LINENAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let totalOperator = 0;
  let totalHelper = 0;
  let totalTarget = 0;
  //let totalWorkHour = 0;
  let totalAvailableMin = 0;

  const totalHourlyTarget = data.reduce((acc, item) => acc + (item.TOTALTARGET / item.ACTUALHOURS), 0)
  const totalQcPass = data.reduce((acc, item) => acc + item.SEWINGOUTPUT, 0)
  const totalEarneMin = data.reduce((acc, item) => acc + item.EARNINGMIN, 0)
  const totalTargetEarnMin = data.reduce((acc, item) => acc + Number(item.SMVSEWING * item.SEWINGOUTPUT), 0)
  const totalSmv = data.reduce((acc, item) => acc + item.SMVSEWING, 0)
  const totalFob = data.reduce((acc, item) => acc + item.TOTALFOB, 0)
  const totalCM = data.reduce((acc, item) => acc + item.TOTALCM, 0)
  const totalWorkHour = data.reduce((acc, item) => acc + item.ACTUALHOURS, 0)



  return (
    <>
      <tr>
        <td colSpan={22} className="border border-gray-950 p-0.5 text-nowrap font-bold">{data[0]?.FLOORNAME}</td>
      </tr>
      {uniqueKeysArray?.map((key, index) => {
        totalOperator += groupedData[key].items[0]?.OPERATOR;
        totalHelper += groupedData[key].items[0]?.HELPER;
        totalTarget += groupedData[key].items[0]?.TOTALTARGET;
        //totalWorkHour += groupedData[key].items[0]?.ACTUALHOURS;
        totalAvailableMin += groupedData[key].items[0]?.AVAILABLEMIN;
        return <>
          <ReportGroup
            key={key}
            data={groupedData[key].items}
            index={index}
          ></ReportGroup>
        </>
      })}


      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={4} className="border border-gray-950 p-0.5 text-nowrap text-center">Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{(totalSmv / data.length).toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOperator}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalHelper}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOperator + totalHelper}</td>
        <td className="border border-gray-950 p-0.5 text-center">{Math.round(totalHourlyTarget)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{Math.round(totalTarget)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{totalQcPass}</td>
        <td className="border border-gray-950 p-0.5 text-center">{((totalTargetEarnMin) * 100 / totalAvailableMin).toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalWorkHour / data.length)?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{(totalEarneMin * 100 / totalAvailableMin)?.toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalFob / totalQcPass)?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalCM * 12 / totalQcPass)?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalFob)?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalCM)?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{ }</td>
        <td className="border border-gray-950 p-0.5 text-center">{(totalTarget * (totalSmv / data.length) * 100 / totalAvailableMin).toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-end">{ }</td>
      </tr>
    </>
  );
}

export default ReportTable;
