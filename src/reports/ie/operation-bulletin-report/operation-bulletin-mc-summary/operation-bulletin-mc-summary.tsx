/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function OperationBulletinMCSummary({
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
    groupedByDate = groupBy(data, ["MACHINENAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "MC/ Name",
    "QTY",
  ];


  return (
    <table className="border-collapse border border-gray-300  w-[100%] mt-3">
      <thead className="sticky top-0 print:static bg-white print:bg-transparent">
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
  );
}

export default OperationBulletinMCSummary;
