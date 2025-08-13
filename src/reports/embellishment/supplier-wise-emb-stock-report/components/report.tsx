/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { SupplierWiseEmbStockReportType } from "../supplier-wise-emb-stock-report-type";

function Report({
  data,
}: {
  data: SupplierWiseEmbStockReportType[];
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
    groupedByDate = groupBy(data, ["SUPPLIER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "Buyer",
    "Style No",
    "Style Name",
    "PO No",
    "Order Qty",
  ];

  const middleHeader = [
    "Print",
    "Emb",
    "Print Emb",
    "Wash"
  ];

  const lastHeader = [
    "Remarks",
  ];

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
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            {/* First header row */}
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) => (
                <th
                  key={item}
                  rowSpan={2}
                  className="border border-gray-950 p-0.1"
                >
                  {item}
                </th>
              ))}

              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.1"
              >
                Embellishment Rcv From Cutting
              </th>
              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.1"
              >
                Embellishment Process
              </th>
              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.1"
              >
                Embellishment Stock
              </th>

              {lastHeader?.map((item) => (
                <th
                  key={item}
                  rowSpan={2}
                  className="border border-gray-950 p-0.1"
                >
                  {item}
                </th>
              ))}
            </tr>

            {/* Second header row */}
            <tr style={{ fontSize: "12px" }} className="bg-indigo-100 text-center">
              {middleHeader?.map((item) => (
                <th key={`rcv-${item}`} className="border border-gray-950 p-0.1">
                  {item}
                </th>
              ))}
              {middleHeader?.map((item) => (
                <th key={`proc-${item}`} className="border border-gray-950 p-0.1">
                  {item}
                </th>
              ))}
              {middleHeader?.map((item) => (
                <th key={`stock-${item}`} className="border border-gray-950 p-0.1">
                  {item}
                </th>
              ))}
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

            <tr style={{ fontSize: "12px" }} className="font-bold">
              <td colSpan={4} className="border border-gray-950 p-0.1 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.1 text-center">{orderQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{pRcv.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{eRcv.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{peRcv.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{wRcv.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{pProcess.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{eProcess.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{peProcess.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{wProcess.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{pStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{eStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{peStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1 text-center">{wStock.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.1">{ }</td>
            </tr>

          </tbody>
        </table>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
