/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { ThreadConsumptionReportType } from "../thread-consumption-report-type";

function Report({
  data,
}: {
  data: ThreadConsumptionReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: ThreadConsumptionReportType[],
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
      items: ThreadConsumptionReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL",
    "Name of Operation",
    "MC Code",
    "SPI",
    "SL (CM)",
    "Total Cons (M)",
  ];

  const totalCons = data.reduce((acc, item) => acc + item.TOTALDETAILSOPERAITONLENGTH + item.WASTAGEVALUE, 0);

  let dataLength = 0;

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="text-gray-950">
      <div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="" style={{ backgroundColor: "#A7F3D0" }}>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.1">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => {
              let prevLength = dataLength;
              dataLength += groupedByDate[key].items.length;
              return <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                uniqueItemNumber={uniqueKeysArray.length}
                dataLength={prevLength}
              ></ReportTable>
            })}

            {
              <tr className="font-bold" style={{ backgroundColor: "#A7F3D0", fontSize: "12px" }}>
                <td colSpan={5} className="border border-gray-950 p-0.1 text-center">Grand Total</td>
                <td className="border border-gray-950 p-0.1 text-center">{Number(totalCons)?.toFixed(2)}</td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
