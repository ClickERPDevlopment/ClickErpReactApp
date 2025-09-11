/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportHeader from "./report-header";
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from "../DateWiseFinishFabricReceiveAndIssueRegisterReport-type";
import moment from "moment";

function Report({
  data,
}: {
  data: DateWiseFinishFabricReceiveAndIssueRegisterReportType[];
}) {
  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              <th className="border border-gray-950 p-1" colSpan={11}>General Info</th>
              <th className="border border-gray-950 p-1" colSpan={3}>Receive Details</th>
              <th className="border border-gray-950 p-1" colSpan={3}>Issue Details</th>
            </tr>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              <th className="border border-gray-950 p-1">Date</th>
              <th className="border border-gray-950 p-1">Challan No</th>
              <th className="border border-gray-950 p-1 text-nowrap">PI No</th>
              <th className="border border-gray-950 p-1 min-w-24">Work Order No</th>
              <th className="border border-gray-950 p-1">Buyer	</th>
              <th className="border border-gray-950 p-1">Style</th>
              <th className="border border-gray-950 p-1">Po</th>
              <th className="border border-gray-950 p-1">Fabrics Type</th>
              <th className="border border-gray-950 p-1">UOM</th>
              <th className="border border-gray-950 p-1">Color</th>
              <th className="border border-gray-950 p-1">TRNS TYPE</th>
              <th className="border border-gray-950 p-1">Received Qty</th>
              <th className="border border-gray-950 p-1">Received Roll Qty</th>
              <th className="border border-gray-950 p-1">Received PCS Qty</th>
              <th className="border border-gray-950 p-1">Issue Qty</th>
              <th className="border border-gray-950 p-1">Issue Roll Qty</th>
              <th className="border border-gray-950 p-1">Issue PCS Qty </th>
            </tr>
          </thead>
          <tbody>

            {data?.map((ele, index) => (
              <tr style={{ fontSize: "12px" }} className="" key={index}>
                <td className="border border-gray-950 p-1 text-nowrap text-center">{moment(ele.ACTION_DATE).format("DD-MMM-YY")}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.CHALLAN_NO}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.PINO}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.WORK_ORDER_NO}</td>
                <td className="border border-gray-950 p-1">{ele.BUYER_NAME}</td>
                <td className="border border-gray-950 p-1">{ele.STYLENO}</td>
                <td className="border border-gray-950 p-1">{ele.PONO}</td>
                <td className="border border-gray-950 p-1">{ele.FABRIC}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.UOM}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.GMT_COLOR}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.DATA_SOURCE}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.RCV_QUANTITY}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.RCV_ROLL_QTY}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.RCV_PICES}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_QUANTITY}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_ROLL_QTY}</td>
                <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_PICES}</td>
              </tr>
            ))}

            <tr style={{ fontSize: "12px" }} className="font-bold ">
              <td colSpan={11} className="border border-gray-950 p-1">Total</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_QUANTITY), 0).toFixed(2)}</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_ROLL_QTY), 0).toFixed(2)}</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_PICES), 0).toFixed(2)}</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_QUANTITY), 0).toFixed(2)}</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_ROLL_QTY), 0).toFixed(2)}</td>
              <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_PICES), 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
