/* eslint-disable @typescript-eslint/no-unused-vars */
import { Item } from "@radix-ui/react-dropdown-menu";
import moment from "moment";

function ReportSummary({
  data,
  firstHeader,
}: {
  data: IDateWiseFabricRequisitionReceive[];
  firstHeader: string[] | null;
}) {
  const totalRequired = data.reduce((acc, item) => {
    return acc + item.TOTAL_REQUIRED;
  }, 0);

  const totalRedy = data.reduce((acc, item) => {
    return acc + item.READY_QTY;
  }, 0);

  const totalDayRequisition = data.reduce((acc, item) => {
    return acc + item.DAY_REQUISITION;
  }, 0);

  const totalDayReceive = data.reduce((acc, item) => {
    return acc + item.DAY_RECEIVE;
  }, 0);

  const totalReceive = data.reduce((acc, item) => {
    return acc + item.TOTAL_RECEIVE;
  }, 0);

  const totalBalance = data.reduce((acc, item) => {
    return acc + (item.TOTAL_RECEIVE - item.TOTAL_REQUIRED);
  }, 0);

  return (
    <>
      {
        <tr className="text-center">
          <td className="border border-gray-300 p-1 font-bold">
            {data[0].BUYER_NAME}
          </td>
          <td className="border border-gray-300 p-1">
            {totalRequired && totalRequired.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalDayReceive && totalDayReceive.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalReceive && totalReceive.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalBalance && totalBalance.toFixed(2)}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportSummary;
