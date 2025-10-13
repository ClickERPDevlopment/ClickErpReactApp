import { IDateWiseFabricRequisitionReceive } from "@/reports/production/cuttting/date-wise-fabric-requisition-receive/date-wise-fabric-requisition-receive-type";

function ReportSummary({
  data,
}: {
  data: IDateWiseFabricRequisitionReceive[];
  firstHeader: string[] | null;
}) {
  const totalRequired = data.reduce((acc, item) => {
    return acc + item.TOTAL_REQUIRED;
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
            {totalRequired && totalRequired}
          </td>
          <td className="border border-gray-300 p-1">
            {totalDayReceive && totalDayReceive}
          </td>
          <td className="border border-gray-300 p-1">
            {totalReceive && totalReceive}
          </td>
          <td className="border border-gray-300 p-1">
            {totalBalance && totalBalance}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportSummary;
