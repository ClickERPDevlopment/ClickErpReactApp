/* eslint-disable @typescript-eslint/no-explicit-any */
import { iaccWorkOrder } from "../../components/iaccWorkOrder";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: iaccWorkOrder[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    AMOUNT: 0,
    TOTAL_QTY: 0,
  };

  function groupBy(data: iaccWorkOrder[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          STYLE: item.STYLENO,
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

      result[key].SIZES[item.GMT_SIZE_NAME] += Number(item.WORK_ORDER_QTY);
      result[key].TOTAL_QTY += Number(item.WORK_ORDER_QTY);
      result[key].AMOUNT += Number(item.TOTAL_SUP_AMOUNT);

      grandTotal.AMOUNT += Number(item.TOTAL_SUP_AMOUNT);
      grandTotal.TOTAL_QTY += Number(item.WORK_ORDER_QTY);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      STYLE: string;
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

  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }

  return (
    <div className="text-sm mt-3">
      <div className="flex items-center font-semibold">
        <p>BUYER: {data[0]?.BUYER_NAME}</p>
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            {header?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key].STYLE}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].COLOR}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].MTL_COLOR}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].REF_SWATCH}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].MTL_SIZE}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].ITEM_NAME}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].UOM}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].ITEM_REF}
              </td>

              {sizeHeader?.map((size) => {
                return (
                  <td className="border border-gray-300 p-1 text-center">
                    {groupedData[key].SIZES[size]}
                  </td>
                );
              })}

              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].TOTAL_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].RATE.toFixed(4)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {Number(groupedData[key].AMOUNT).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td
            className="border text-center border-gray-300 p-1 font-bold"
            colSpan={firstHeader?.length}
          >
            Grand Total
          </td>
          {sizeHeader?.map(() => {
            return <td className="border border-gray-300 p-1 text-center"></td>;
          })}

          <td className="border border-gray-300 p-1 text-center">
            {grandTotal.TOTAL_QTY.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center">
            {grandTotal.AMOUNT.toFixed(2)}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportTable;
