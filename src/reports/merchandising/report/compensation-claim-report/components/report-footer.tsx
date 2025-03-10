import { ICompensationClaimMasterType } from "../compensation-claim-report-type";

function ReportFooter({ data }: { data: ICompensationClaimMasterType | undefined }) {
  return (
    <div className="flex mt-10">
      <table className="w-full">
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span>{data?.CREATED_BY_NAME}</span>
          </td>
          <td className="w-[25%] border-0">
            <span></span>
          </td>
          <td className="w-[25%] border-0">
            <span></span>
          </td>
          <td className="w-[25%] border-0">
            <span></span>
          </td>
          <td className="w-[25%] border-0">
            <span></span>
          </td>
        </tr>
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Prepared By</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Received</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Audit</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Authorized By</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportFooter;
