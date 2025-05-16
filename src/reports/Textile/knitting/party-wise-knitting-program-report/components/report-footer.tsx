import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";

function ReportFooter({ data }: { data: PartyWiseKnittingProgramType[] }) {
  return (
    <div className="flex mt-10">
      <table className="w-full">
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span>{data[0]?.PREPARED_BY}</span>
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
          <td className="w-[25%] border-0 text-nowrap">
            <span className="border-t border-gray-950 px-5 pb-1">Prepared By</span>
          </td>
          <td className="w-[25%] border-0 text-nowrap">
            <span className="border-t border-gray-950 px-5 pb-1">Receiver's Signature</span>
          </td>
          <td className="w-[25%] border-0 text-nowrap">
            <span className="border-t border-gray-950 px-5 pb-1">Knitting Incharge</span>
          </td>
          <td className="w-[25%] border-0 text-nowrap">
            <span className="border-t border-gray-950 px-5 pb-1">Approved By</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportFooter;
