/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupplierWiseEmbStockReportType } from "../embellishment-send-receive-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportGroup({
  data,
  firstHeader,
}: {
  data: SupplierWiseEmbStockReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SupplierWiseEmbStockReportType[],
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
      items: SupplierWiseEmbStockReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER", "STYLENO", "PONO", "COLORNAME"]);
  }


  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const pRcv = data?.reduce((acc, item) => acc + item.P_RECEIVEQTY, 0)
  const eRcv = data?.reduce((acc, item) => acc + item.E_RECEIVEQTY, 0)
  const peRcv = data?.reduce((acc, item) => acc + item.PE_RECEIVEQTY, 0)
  const wRcv = data?.reduce((acc, item) => acc + item.W_RECEIVEQTY, 0)

  const pProcess = data?.reduce((acc, item) => acc + item.P_PROCESS_QTY, 0)
  const eProcess = data?.reduce((acc, item) => acc + item.E_PROCESS_QTY, 0)
  const peProcess = data?.reduce((acc, item) => acc + item.PE_PROCESS_QTY, 0)
  const wProcess = data?.reduce((acc, item) => acc + item.W_PROCESS_QTY, 0)

  const pStock = data?.reduce((acc, item) => acc + item.P_STOCK, 0)
  const eStock = data?.reduce((acc, item) => acc + item.E_STOCK, 0)
  const peStock = data?.reduce((acc, item) => acc + item.PE_STOCK, 0)
  const wStock = data?.reduce((acc, item) => acc + item.W_STOCK, 0)

  const orderQty = data?.reduce((acc, item) => acc + item.ORDQTY, 0)


  return (
    <>
      {uniqueKeysArray?.map((key, index) => {
        const data = groupedByDate[key].items;
        return <>
          <ReportSubgroup
            key={key}
            data={data}
            index={index}
            firstHeader={firstHeader}
          ></ReportSubgroup>
        </>
      })}
      <tr style={{ fontSize: "13px" }} className="font-bold">
        <td colSpan={4} className="border border-gray-950 p-0.1 text-center">PO Wise Subtotal</td>
        <td className="border border-gray-950 p-0.1 text-center">{orderQty}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pRcv}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eRcv}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#aacde2" }}>{peRcv}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e6e88d" }}>{wRcv}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pProcess}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eProcess}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#aacde2" }}>{peProcess}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e6e88d" }}>{wProcess}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pStock}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eStock}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#aacde2" }}>{peStock}</td>
        <td className="border border-gray-950 p-0.1 text-center" style={{ backgroundColor: "#e6e88d" }}>{wStock}</td>
      </tr>
    </>
  );
}

export default ReportGroup;
