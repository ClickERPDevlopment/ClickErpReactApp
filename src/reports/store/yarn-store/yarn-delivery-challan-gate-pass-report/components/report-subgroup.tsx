import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";

function ReportSubgroup({
  data,
}: {
  data: IYarnDeliveryChallanGatePassReport[];
  firstHeader: string[] | null;
}) {

  const totalBagQty = data?.reduce(
    (acc, item) => acc + Number(item.CARTON_QTY),
    0);

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalConeQty = data?.reduce(
    (acc, item) => acc + Number(item.CONE),
    0);

  return (
    <>
      <tr>
        <td className="border border-gray-300 p-1">{data[0]?.YARN}</td>
        <td className="border border-gray-300 p-1">{data[0]?.YARN_BRAND}</td>
        <td className="border border-gray-300 p-1">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-300 p-1">B: {totalBagQty}<br></br>C: {totalConeQty}</td>
        <td className="border border-gray-300 p-1">{totalQuantiy}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
