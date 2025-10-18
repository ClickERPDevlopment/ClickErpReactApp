/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";
import SummaryReport from "../summary-components/report";

function Report({
  data,
  searchParams,
}: {
  data: IAccessoriesReportWithPo[];
  searchParams: { currency: string };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
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

  interface GroupedByBuyer {
    [key: string]: {
      items: IAccessoriesReportWithPo[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["SUB_PO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "STYLE NO.",
    "JOB",
    "PO",
    "COLOR",
    "MTL COLOR",
    "ITEM NAME",
  ];
  const secondHeader = ["TTL QTY", "UOM", "RATE", "AMOUNT"];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
  });

  const sizeHeader = Array.from(uniqueSizes);

  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }


  const totalQty = data.reduce((acc, item) => acc + item.WORK_ORDER_QTY, 0)

  const totalAmount = data.reduce((acc, item) => acc + (item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY), 0);


  return (
    <div style={{ fontFamily: "" }}>
      <div className="p-2">
        <ReportHeader
          searchParams={{ currency: searchParams.currency }}
          masterData={data[0]}
        />
        <div className="text-sm mt-3">
          <div className="flex items-center font-semibold justify-between">
            <p>BUYER: {data[0]?.BUYER_NAME}</p>
            <p className="text-right"><span className="font-bold">Currency:</span> {data[0]?.CURRENCY}</p>
          </div>
          <table className="border-collapse border border-gray-950  w-[100%]">
            <thead>
              <tr>
                {header?.map((item) => (
                  <th className="border border-gray-950 p-1">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueKeysArray?.map((key) => (
                <ReportTable
                  key={key}
                  data={groupedByBuyer[key].items}
                  firstHeader={firstHeader}
                  sizeHeader={sizeHeader}
                  secondHeader={secondHeader}
                ></ReportTable>
              ))}
              <tr className="font-bold" style={{ backgroundColor: "#fbffdd" }}>
                <td
                  className="border text-center border-gray-950 p-1 font-bold"
                  colSpan={firstHeader?.length}
                >
                  Grand Total
                </td>
                {sizeHeader?.map(() => {
                  return <td className="border border-gray-950 p-1 text-center"></td>;
                })}

                <td className="border border-gray-950 p-1 text-center">
                  {totalQty}
                </td>
                <td className="border border-gray-950 p-1 text-center"></td>
                <td className="border border-gray-950 p-1 text-center"></td>
                <td className="border border-gray-950 p-1 text-center">
                  {totalAmount.toFixed(4)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <p><span className="font-bold">Note:</span> Please mention the Work Order Number in the Delivery Challan and PI.</p>
        </div>
        <div className="mt-1">
          <p><span className="font-bold">Remarks:</span> {data[0]?.REMARKS}</p>
        </div>
        <div className="mt-1">
          <p><span className="font-bold">Sub:</span> {data[0]?.WO_SUBJECT}</p>
        </div>
        <div>
          <div>
            <p className="text-center font-bold mb-0 p-0 mt-2" style={{ fontSize: "15px" }}>Color Wise Summary</p>
          </div>
          <SummaryReport data={data}></SummaryReport>
        </div>
        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
