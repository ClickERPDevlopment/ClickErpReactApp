/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  index
}: {
  data: PartyWiseKnittingProgramType[];
  firstHeader: string[] | null;
  index: number
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PartyWiseKnittingProgramType[],
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
      items: PartyWiseKnittingProgramType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
          index={index}
        ></ReportSubgroup>
      ))}

    </>
  );
}

export default ReportTable;
