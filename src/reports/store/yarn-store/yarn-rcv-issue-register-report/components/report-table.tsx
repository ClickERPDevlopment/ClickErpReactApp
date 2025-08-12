/* eslint-disable @typescript-eslint/no-explicit-any */
import { YarnRcvIssueRegisterReportType } from "../yarn-rcv-issue-register-report-index-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: YarnRcvIssueRegisterReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnRcvIssueRegisterReportType[],
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
      items: YarnRcvIssueRegisterReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["LC_NO", "YARN", "BRAND", "YARN_RECEIVED_DATE", "BUYER", "PO_NO", "CHALLAN_NO", "LC_NO", "KNITTING_HOUSE", "IMPORT_TYPE", "PER_CTN_QTY"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
    </>
  );
}

export default ReportTable;
