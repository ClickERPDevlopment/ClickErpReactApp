/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStyleChangeOver } from "../style-change-over-type";
import ReportHeader from "./report-header";
import ReportRow from "./report-row";

function Report({ data }: { data: IStyleChangeOver[] }) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IStyleChangeOver[], keys: string[]) {
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

  interface GroupedByEntryDate {
    [key: string]: {
      items: IStyleChangeOver[];
    };
  }

  let groupedByEntryDate: GroupedByEntryDate = {};

  if (data) {
    groupedByEntryDate = groupBy(data, ["ENTRY_DATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "DATE",
    "LINE NO",
    "BUYER",
    "STYLE",
    "PO",
    "SMV",
    "START TIME",
    "FINISH TIME",
    "TOTAL TIME",
    "PRODUCT TYPE",
    "OP",
    "HP",
    "IR",
    "TOTAL MP",
    "REASON",
    "TECHNICIAN NAME",
  ];

  return (
    <div className="container">
      <div className=" p-2">
        <ReportHeader />
        <div className="mt-3">
          <table className="border-collapse border border-gray-300  w-[100%]">
            <thead>
              <tr className="text-sm">
                {firstHeader?.map((item) => (
                  <th className="border border-gray-300 p-0.5">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueKeysArray?.map((key) => (
                <ReportRow
                  key={key}
                  data={groupedByEntryDate[key].items}
                ></ReportRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
