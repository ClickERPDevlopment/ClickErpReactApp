import { EmbellishmentPIReportType } from "../embellishment-pi-report-type";

export default function ReportFooter({ }: { data: EmbellishmentPIReportType[] }) {
  return (
    <div className="w-full mt-8">
      <table className="w-full text-center border-collapse">
        <tfoot>
          <tr>
            <td className="pt-6 text-start">
              <span className="border-t border-gray-500 px-4 font-medium">
                Authorized Signature
              </span>
            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
          </tr>
        </tfoot>
      </table>
      <div className="w-full mt-5 border-t border-gray-950 p-1">
        <p className="text-sm text-left">
          <span className="font-bold">Head Office:</span> House 73, Road 17/A , Block -E, Banani, Dhaka - 1213, Bangladesh. <span className="font-bold">Tel:</span> ‪+880 2 222280840‬ , ‪+880 2 222280826‬ , ‪+880 2 222262720‬
        </p>
        <p className="text-sm text-left">
          <span className="font-bold">Factory: </span> Vill - Naojur, P.O.-Kodda Bazar, P.S.-Joydebpur, Dist-Gazipur. <span className="font-bold">Tel: </span>9262356-7 , 9262368-9, Fax : 9263692, <span className="font-bold">Mob: </span>01730084101
        </p>
      </div>
    </div>
  );
}
