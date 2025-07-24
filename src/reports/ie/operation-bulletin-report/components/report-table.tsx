/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinReportType } from "../operation-bulletin-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  uniqueItemNumber,
}: {
  data: OperationBulletinReportType[];
  firstHeader: string[] | null;
  uniqueItemNumber?: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: OperationBulletinReportType[],
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
      items: OperationBulletinReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["OPERATIONNAME", "MACHINENAME", "CAPACITYHR", "REMARKS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalSMV = data.reduce((acc, item) => acc + Number(item.SMV), 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + item.REQMP, 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);
  const totalPlanWS = data.reduce((acc, item) => acc + Number(item.PLANWS), 0);

  return (
    <>
      {uniqueItemNumber && uniqueItemNumber > 1 && (
        <tr className="font-bold">
          <td colSpan={10} className="border border-gray-950 p-0.5 text-center">{data[0]?.SECTIONNAME}</td>
        </tr>
      )}

      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr className="font-bold">
        <td colSpan={2} className="border border-gray-950 p-0.5 text-center">Total</td>
        <td className="border border-gray-950 p-0.5">{totalSMV.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{Number(totalSMV * 60)?.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5">{totalRequiredMP.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{totalAllottedMP.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{(totalAllottedMP * data[0]?.CAPACITYHR)?.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{totalPlanWS.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5"></td>
      </tr>
    </>
  );
}

export default ReportTable;
