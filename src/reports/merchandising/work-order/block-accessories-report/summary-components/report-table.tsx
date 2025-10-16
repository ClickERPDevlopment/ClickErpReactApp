/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: IAccessoriesReportWithPo[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    AMOUNT: 0,
    TOTAL_QTY: 0,
  };

  const grandSizeTotals: Record<string, number> = {};

  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          STYLE: item.STYLENO,
          JOB: item.PO_NO,
          PO: new Set(),
          ORDER: item.PO_NO,
          COLOR: item.GMT_COLOR_NAME,
          MTL_COLOR: item.MTL_COLOR_NAME,
          REF_SWATCH: item.REF_SWATCH,
          MTL_SIZE: item.MTL_SIZE_NAME,
          ITEM_NAME: item.MTL_NAME,
          UOM: item.UOM,
          ITEM_REF: item.DESCRIPTION,
          TOTAL_QTY: 0,
          RATE: item.SUPPLIER_RATE_PER_DZN / 12,
          AMOUNT: 0,
          SIZES: {},
        };
      }

      if (!result[key].SIZES[item.GMT_SIZE_NAME]) {
        result[key].SIZES[item.GMT_SIZE_NAME] = 0;
      }

      const qty = Number(item.WORK_ORDER_QTY);
      const amt = Number(item.SUPPLIER_RATE_PER_PCS * qty);

      result[key].SIZES[item.GMT_SIZE_NAME] += qty;
      result[key].TOTAL_QTY += qty;
      result[key].AMOUNT += amt;
      result[key].PO.add(item.SUB_PO);

      grandTotal.AMOUNT += amt;
      grandTotal.TOTAL_QTY += qty;

      if (item.GMT_SIZE_NAME) {
        grandSizeTotals[item.GMT_SIZE_NAME] =
          (grandSizeTotals[item.GMT_SIZE_NAME] || 0) + qty;
      }

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      STYLE: string;
      JOB: string;
      PO: Set<string>;
      ORDER: string;
      COLOR: string;
      MTL_COLOR: string;
      REF_SWATCH: string;
      MTL_SIZE: string;
      ITEM_NAME: string;
      UOM: string;
      ITEM_REF: string;
      TOTAL_QTY: number;
      RATE: number;
      AMOUNT: number;
      SIZES: { [key: string]: number };
    };
  }

  interface IGrandTotal {
    AMOUNT: number;
    TOTAL_QTY: number;
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "STYLENO",
      "PO_NO",
      "GMT_COLOR_NAME",
      "MTL_COLOR_NAME",
      "REF_SWATCH",
      "MTL_SIZE_NAME",
      "MTL_NAME",
      "UOM",
      "DESCRIPTION",
      "SUPPLIER_RATE_PER_PCS",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let header: string[] = [];
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader) ?? [];
  }

  return (
    <div className="text-sm mt-1">
      <table className="border-collapse border border-gray-950 w-[100%]">
        <thead>
          <tr>
            {header?.map((item) => (
              <th key={item} className="border border-gray-950 p-1">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-950 p-1">
                {groupedData[key].STYLE}
              </td>
              <td className="border text-center border-gray-950 p-1">
                {groupedData[key].JOB}
              </td>
              <td className="border text-center border-gray-950 p-1">
                {[...groupedData[key].PO].join(", ")}
              </td>
              <td className="border border-gray-950 p-1">
                {groupedData[key].COLOR}
              </td>
              <td className="border border-gray-950 p-1">
                {groupedData[key].MTL_COLOR}
              </td>
              <td className="border border-gray-950 p-1">
                {groupedData[key].ITEM_NAME}
              </td>

              {sizeHeader?.map((size) => (
                <td
                  key={size}
                  className="border border-gray-950 p-1 text-center"
                >
                  {groupedData[key].SIZES[size] || ""}
                </td>
              ))}

              <td className="border border-gray-950 p-1 text-center">
                {groupedData[key].TOTAL_QTY}
              </td>
              <td className="border border-gray-950 p-1">
                {groupedData[key].UOM}
              </td>
              <td className="border border-gray-950 p-1 text-center">
                {groupedData[key].RATE.toFixed(6)}
              </td>
              <td className="border border-gray-950 p-1 text-center">
                {Number(groupedData[key].AMOUNT).toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="font-bold" style={{ backgroundColor: "#fbffdd" }}>
            <td
              className="border text-center border-gray-950 p-1 font-bold"
              colSpan={firstHeader?.length ?? 0}
            >
              Grand Total
            </td>

            {sizeHeader?.map((size) => (
              <td
                key={size}
                className="border border-gray-950 p-1 text-center font-bold"
              >
                {grandSizeTotals[size] || ""}
              </td>
            ))}

            <td className="border border-gray-950 p-1 text-center font-bold">
              {grandTotal.TOTAL_QTY}
            </td>
            <td className="border border-gray-950 p-1 text-center"></td>
            <td className="border border-gray-950 p-1 text-center"></td>
            <td className="border border-gray-950 p-1 text-center font-bold">
              {grandTotal.AMOUNT.toFixed(4)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ReportTable;
