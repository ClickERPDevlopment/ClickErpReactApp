import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportSubgroup({
  data,
  index
}: {
  data: OperationBulletinReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalSMV = data.reduce((acc, item) => acc + item.SMV, 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + Number(item.REQMP), 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + Number(item.ALLOTTEDMP), 0);
  const totalPlanWS = data.reduce((acc, item) => acc + Number(item.PLANWS), 0);


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.1">{index + 1}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.OPERATIONNAME}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.MACHINENAME}</td>
        <td className="border border-gray-950 p-0.1">{totalSMV.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{Math.round(Number(totalSMV * 60))}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.CAPACITYHR}</td>
        <td className="border border-gray-950 p-0.1">{totalRequiredMP.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{totalAllottedMP.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{Math.round(totalAllottedMP * data[0]?.CAPACITYHR)}</td>
        <td className="border border-gray-950 p-0.1">{totalPlanWS.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.REMARKS}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
