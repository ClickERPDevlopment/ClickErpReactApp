import { DateWiseFabricPurchaseReceiveRegisterReportType } from "../date-wise-fabric-purchase-receive-register-report-type";

function ReportTable({
  data
}: {
  data: DateWiseFabricPurchaseReceiveRegisterReportType[];
}) {

  const challanQty = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const value = data?.reduce(
    (acc, item) => acc + (Number(item.QUANTITY) * Number(item.RATE)),
    0);

  return (
    <>
      <tr style={{ fontSize: "12px" }}>
        <td className="border border-gray-950 p-0.1">{data[0]?.UOM}</td>
        <td className="border border-gray-950 p-0.1">{challanQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{value.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportTable;
