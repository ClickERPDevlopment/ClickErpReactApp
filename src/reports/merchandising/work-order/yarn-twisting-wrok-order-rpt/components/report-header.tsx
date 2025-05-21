import moment from "moment";
import { YarnTwistingWorkOrderReportType } from "../yarn-twisting-wrok-order-rpt-type";

function ReportHeader({
  masterData,
}: {
  masterData: YarnTwistingWorkOrderReportType | null;
}) {
  return (
    <div>
      <div className="">
        <h1 className="font-bold text-lg text-center">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-sm text-center">
          {masterData?.COMPANY_ADDRESS}
        </h4>
        <h1 className="font-bold text-lg text-center mt-5">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-base text-center mt-2">
          YARN TWISTING WORK ORDER
        </h4>
      </div>
      <table className="border border-gray-900 w-[100%] mt-2">
        <tr className="text-left text-xs">
          <th className="border border-gray-900 px-1">Company</th>
          <th className="border border-gray-900 px-1">Supplier</th>
        </tr>
        <tr className="text-xs">
          <td className="border border-gray-900 p-0">
            <table className="w-[100%] m-0">
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Name: </td>
                <td className="px-1 ">{masterData?.COMPANY_NAME}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">
                  Factory Address:{" "}
                </td>
                <td className="px-1 "> {masterData?.COMPANY_ADDRESS}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Work Order: </td>
                <td className="px-1 "> {masterData?.WORK_ORDER_NO}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">
                  Contact Person Name:{" "}
                </td>
                <td className="px-1">{masterData?.STORE_PERSONNEL}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Mobile: </td>
                <td className="px-1"> {masterData?.MOBILE_NO}</td>
              </tr>
              <tr>
                <td className="px-1 border-r border-gray-900">Email: </td>
                <td className="px-1"> {masterData?.COMPANY_EMAIL}</td>
              </tr>
            </table>
          </td>
          <td className="border border-gray-900 p-0">
            <table className="w-[100%] m-0">
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Name: </td>
                <td className="px-1">{masterData?.SUPPLIER_NAME}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Address: </td>
                <td className="px-1"> {masterData?.SUPPLIER_ADDRESS}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">
                  Delivery Date:{" "}
                </td>
                <td className="px-1">
                  {masterData?.DELIVERY_DATE
                    ? moment(masterData?.DELIVERY_DATE).format("D MMM YY")
                    : ""}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">
                  Contact Person Name:{" "}
                </td>
                <td className="px-1">{masterData?.ATTENTION}</td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-1 border-r border-gray-900">Mobile: </td>
                <td className="px-1"> {masterData?.SUPPLIER_MOBILE_NO}</td>
              </tr>
              <tr>
                <td className="px-1 border-r border-gray-900">Email: </td>
                <td className="px-1">{masterData?.SUPPLIER_EMAIL}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportHeader;
