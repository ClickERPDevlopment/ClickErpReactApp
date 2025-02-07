/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-const */
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

  export interface GroupedByEntryDate {
    [key: string]: {
      items: IStyleChangeOver[];
    };
  }

  const groupedByEntryDate: GroupedByEntryDate = {};

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
        <div className="text-sm mt-3">
          <table className="border-collapse border border-gray-300  w-[100%]">
            <thead>
              <tr>
                {firstHeader?.map((item) => (
                  <th className="border border-gray-300 p-1">{item}</th>
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
