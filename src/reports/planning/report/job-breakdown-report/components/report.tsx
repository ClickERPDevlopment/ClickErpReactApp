/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { JobBreakdownReportType } from "../job-breakdown-report-type";

function Report({
  data,
}: {
  data: JobBreakdownReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: JobBreakdownReportType[],
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
      items: JobBreakdownReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);
  const sizeHeader: string[] = Array.from(new Set(data?.map((item) => item.SIZENAME)));


  //set table header
  const firstHeader = [
    "Style No",
    "Po No",
    "Color",
    "Ship Date",
  ];

  const header = firstHeader.concat(sizeHeader);

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950 w-full">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center">
              {header?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
              <th className="border border-gray-950 p-0.5">Total</th>
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                sizeHeader={sizeHeader}
              ></ReportTable>
            ))}
          </tbody>
        </table>
        <div className="mt-[144px]"></div>
        <div>
          {/* <ReportFooter></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
