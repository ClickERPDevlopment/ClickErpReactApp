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

  const totalBagQty = data?.reduce(
    (acc, item) => acc + Number(item.CARTON_QTY),
    0);

  const totalConeQty = data?.reduce(
    (acc, item) => acc + Number(item.CONE),
    0);

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
      <tr>
        <td colSpan={5} className="border border-gray-950 font-bold p-0.5">Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalQuantiy}</td>
        <td className="border border-gray-950 p-0.5 font-bold">B: {totalBagQty} C: {totalConeQty}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
      </tr>
    </>
  );
}

export default ReportTable;
