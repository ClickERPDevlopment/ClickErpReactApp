import { IAccessoriesReport } from "../accessories-report-type";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: IAccessoriesReport[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }

  const totalWoQty = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY);
  }, 0);

  const totalAmount = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY * item.SUPPLIER_RATE_PER_PCS);
  }, 0);

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
          {data.map((item) => (
            <tr>
              <td className="border border-gray-300 p-1 text-center ">
                {item.STYLENO}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.PO_NO}
              </td>
              <td className="border border-gray-300 p-1 text-center text-nowrap">
                {item.MTL_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.GMT_COLOR_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.MTL_COLOR_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.GMT_SIZE_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.MTL_SIZE_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.GMT_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.WORK_ORDER_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.UOM}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.CURRENCY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.SUPPLIER_RATE_PER_PCS}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {(item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.DESCRIPTION}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.MTL_DESCRIPTION_2}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.MTL_COLOR_NAME_2}
              </td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center">
            {totalWoQty}
          </td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center">
            {totalAmount.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
          <td className="border border-gray-300 p-1 text-center"></td>
        </tr>
      </table>
    </div>
  );
}

export default ReportTable;
