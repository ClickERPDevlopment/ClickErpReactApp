/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbellishmentOrderDetailsReportType } from "../embellishment-order-details-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  firstHeader,
}: {
  data: EmbellishmentOrderDetailsReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentOrderDetailsReportType[],
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
      items: EmbellishmentOrderDetailsReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["WORK_ORDER_NO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);



  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportGroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportGroup>
      ))}

      
    </>
  );
}

export default ReportTable;
