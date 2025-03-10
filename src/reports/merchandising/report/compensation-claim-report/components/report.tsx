/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { ICompensationClaimMasterType } from "../compensation-claim-report-type";

function Report({
  data,
}: {
  data: ICompensationClaimMasterType | undefined;
}) {
  //set table header
  const firstHeader = [
    "SL",
    "Material Name",
    "Damage Qty",
    "UOM",
    "Claim Amount",
    "Damage Details",
    "Action Taken",
  ];

  const secondHeader = [
    "SL",
    "Buyer",
    "Style",
    "PO",
  ];

  const totalDamageQty = data?.ClaimDetails?.reduce((acc, item) => acc + item.QUANTITY_DAMAGED, 0);
  const totalClaimAmount = data?.ClaimDetails?.reduce((acc, item) => acc + item.CLAIM_AMOUNT, 0);

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
        />
        <div className="flex justify-between gap-3">
          <div>
            <table>
              <tr>
                <td className="font-bold">Claim ID: </td>
                <td>
                  {data?.CLAIM_ID}
                </td>
              </tr>
              <tr>
                <td className="font-bold">To: </td>
                <td>
                </td>
              </tr>
              <tr>
                <td className="font-bold">Supplier Name: </td>
                <td>
                  {data?.RELATED_SUPPLIER_NAME}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Compensation Type: </td>
                <td>
                  {data?.COMPENSATION_TYPE}
                </td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr>
                <td className="font-bold">Reported By: </td>
                <td>
                  {data?.REPORTED_BY}
                </td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr>
                <td className="font-bold">Claim Date: </td>
                <td>
                  {moment(data?.CLAIM_DATE).format("DD-MMM-YY")}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.ClaimDetails.map((item, index) => (
              <tr className="text-center">
                <td className="border border-gray-300">
                  {index + 1}
                </td>
                <td className="border border-gray-300">
                  {item.MATERIAL_NAME}
                </td>
                <td className="border border-gray-300">
                  {item.QUANTITY_DAMAGED}
                </td>
                <td className="border border-gray-300">{item.UOM}</td>
                <td className="border border-gray-300">{item.CLAIM_AMOUNT}</td>
                <td className="border border-gray-300">{item.DAMAGE_DETAILS}</td>
                <td className="border border-gray-300">
                  {item.ACTION_TAKEN}
                </td>
              </tr>
            ))}
            <tr className="font-bold text-center">
              <td colSpan={2} className="border border-gray-300">
                Total
              </td>
              <td className="border border-gray-300">{totalDamageQty}</td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">{totalClaimAmount}</td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
            </tr>
          </tbody>
        </table>

        {/* order details */}
        <table className="border-collapse border border-gray-300  w-[50%] mt-5">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {secondHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.RelatedOrders?.map((item, index) => (
              <tr className="text-center">
                <td className="border border-gray-300">
                  {index + 1}
                </td>
                <td className="border border-gray-300">
                  {item.BUYER_NAME}
                </td>
                <td className="border border-gray-300">
                  {item.STYLE_NAME}
                </td>
                <td className="border border-gray-300">{item.PO_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <p>Additional Note: {data?.ADDITIONAL_NOTES}</p>
        </div>
        <div className="p-5"></div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
