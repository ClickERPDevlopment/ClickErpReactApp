import { ThreadConsumptionReportType } from "../thread-consumption-report-type";

function ReportSubgroup({
  data,
  index
}: {
  data: ThreadConsumptionReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalCons = data.reduce((acc, item) => acc + item.TOTALDETAILSOPERAITONLENGTH + item.WASTAGEVALUE, 0);



  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.1">{index + 1}</td>
        <td className="border border-gray-950 p-0.1 font-bold">{data[0]?.OPERATIONNAME}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.MACHINECODE}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.SPINO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.SEAMLENGTH}</td>
        <td className="border border-gray-950 p-0.1 text-center font-bold">{totalCons.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
