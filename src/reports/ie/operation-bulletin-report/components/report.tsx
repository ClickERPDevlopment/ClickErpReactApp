/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function Report({
  data,
}: {
  data: OperationBulletinReportType[];
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
    groupedByDate = groupBy(data, ["SECTIONNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Name of Operation",
    "Machine Name",
    "SMV",
    "Second",
    "Capacity/Hr",
    "Req. MP",
    "All. MP",
    "Capacity",
    "Planned WS",
    "Remarks",
  ];

  const totalSMV = data.reduce((acc, item) => acc + item.SMV, 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + item.REQMP, 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);
  const totalPlanWS = data.reduce((acc, item) => acc + Number(item.PLANWS), 0);

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="text-gray-950">
      <div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="" style={{ backgroundColor: "#A7F3D0" }}>
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
                uniqueItemNumber={uniqueKeysArray.length}
              ></ReportTable>
            ))}

            {
              uniqueKeysArray.length > 1 && <tr className="font-bold" style={{ backgroundColor: "#A7F3D0" }}>
                <td colSpan={2} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
                <td className="border border-gray-950 p-0.5">{Number(totalSMV)?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5">{Number(totalSMV * 60)?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5"></td>
                <td className="border border-gray-950 p-0.5">{totalRequiredMP?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5">{totalAllottedMP?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5">{(totalAllottedMP * data[0]?.CAPACITYHR)?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5">{totalPlanWS?.toFixed(3)}</td>
                <td className="border border-gray-950 p-0.5"></td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
