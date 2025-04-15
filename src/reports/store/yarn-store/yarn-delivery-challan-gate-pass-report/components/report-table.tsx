/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";

function ReportTable({
  data,
  firstHeader,
}: {
  data: IYarnDeliveryChallanGatePassReport[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IYarnDeliveryChallanGatePassReport[],
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
      items: IYarnDeliveryChallanGatePassReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["YARN", "YARN_LOT_NUMBER", "YARN_BRAND"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr>
        <td colSpan={4} className="border border-gray-300 p-1 font-bold">Total</td>
        <td className="border border-gray-300 p-1 font-bold">{totalQuantiy}</td>
      </tr>
    </>
  );
}

export default ReportTable;
