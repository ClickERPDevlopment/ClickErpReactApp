import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportSubgroup({
  data
}: {
  data: OperationBulletinReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalSMV = data.reduce((acc, item) => acc + item.SMV, 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + item.REQMP, 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);
  const totalPlanWS = data.reduce((acc, item) => acc + item.PLANWS, 0);


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{data[0]?.OPERATIONNAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.MACHINENAME}</td>
        <td className="border border-gray-950 p-0.5">{totalSMV}</td>
        <td className="border border-gray-950 p-0.5">{Number(totalSMV * 60)?.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.CAPACITYHR}</td>
        <td className="border border-gray-950 p-0.5">{totalRequiredMP}</td>
        <td className="border border-gray-950 p-0.5">{totalAllottedMP}</td>
        <td className="border border-gray-950 p-0.5">{(totalAllottedMP * data[0]?.CAPACITYHR)?.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{totalPlanWS}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.REMARKS}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
