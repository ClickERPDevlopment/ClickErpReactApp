import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportFooter({ }: { data: OperationBulletinReportType[] }) {
  return (
    <div style={{ fontSize: "11px", marginTop: "60px" }} className="flex font-bold justify-between ">
      <table className="w-full text-center">
        <thead></thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Line Chief</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Maintenance</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>IE</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>AGM/GM</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Planning</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
