/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbMaterialRequirementProductivityType, EmbMaterialRequirementReportType } from "../embellishment-budget-sheet-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";

function Report({
  data,
}: {
  data: { embMaterialReqData: EmbMaterialRequirementReportType[], embMaterialReqProData: EmbMaterialRequirementProductivityType[] };
}) {
  //set table header
  const firstHeader = [
    "Material Group",
    "Materails Name",
    "Required Qty.",
    "MOU",
    "Price (Tk)",
    "Total (Tk)",
  ];

  const totalReqQty = data?.embMaterialReqData.reduce(
    (acc: number, item: EmbMaterialRequirementReportType) => acc + item.REQ_QUANTITY, 0
  );

  const totalAmount = data?.embMaterialReqData.reduce(
    (acc: number, item: EmbMaterialRequirementReportType) => acc + item.AMOUNT_BDT, 0
  );

  const totalReqManPower = data?.embMaterialReqProData.reduce(
    (acc: number, item: EmbMaterialRequirementProductivityType) => acc + item.REQUIRED_MAN_POWER, 0
  );

  const totalManPowerCost = data?.embMaterialReqProData.reduce(
    (acc: number, item: EmbMaterialRequirementProductivityType) => acc + item.REQUIRED_MAN_POWER * item.OVER_HEAD_COST, 0
  );


  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader />
        <div className="flex justify-between mt-2">
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Budget No</td>
                  <td>: {data?.embMaterialReqData[0]?.REQUIREMENT_NO}</td>
                </tr>
                <tr>
                  <td>Buyer</td>
                  <td>: {data?.embMaterialReqData[0]?.BUYER}</td>
                </tr>
                <tr>
                  <td>Style</td>
                  <td>: {data?.embMaterialReqData[0]?.STYLE}</td>
                </tr>
                <tr>
                  <td>PO</td>
                  <td>: {data?.embMaterialReqData[0]?.PO}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td>WO Qty</td>
                  <td>: {data?.embMaterialReqData[0]?.WORK_ORDER_QTY}</td>
                </tr>
                <tr>
                  <td>Total Value (Tk)</td>
                  <td>: {data?.embMaterialReqData[0]?.AMOUNT_BDT}</td>
                </tr>
                <tr>
                  <td>Job Type</td>
                  <td>: {data?.embMaterialReqData[0]?.EMB_TYPE}</td>
                </tr>
                <tr>
                  <td>Supplier</td>
                  <td>: {data?.embMaterialReqData[0]?.SUPPLIER_NAME}</td>
                </tr>
              </tbody>
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
            {data?.embMaterialReqData.map((item) => (
              <tr className="text-center">
                <td className="border border-gray-300 p-1">
                  {item.MATERIAL_GROUP}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.MATERIAL_NAME}
                </td>
                <td className="border border-gray-300 p-1">{item.REQ_QUANTITY.toFixed(2)}</td>
                <td className="border border-gray-300 p-1">{item.UOM}</td>
                <td className="border border-gray-300 p-1">{item.RATE}</td>
                <td className="border border-gray-300 p-1">
                  {item.AMOUNT_BDT.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="text-center font-bold">
              <td colSpan={2} className="border border-gray-300 p-1 text-end">Material Cost</td>
              <td className="border border-gray-300 p-1">
                {totalReqQty.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1">
                {totalAmount.toFixed(2)}
              </td>
            </tr>

            <tr className="text-center font-bold">
              <td colSpan={6} className="border border-gray-300 p-1 text-start">Additional Information</td>
            </tr>
            {data?.embMaterialReqProData.map((item) => (
              <tr className="text-center">
                <td className="border border-gray-300 p-1">
                </td>
                <td className="border border-gray-300 p-1">
                  {item.MANPOWER_TYPE}
                </td>
                <td className="border border-gray-300 p-1">{item.REQUIRED_MAN_POWER.toFixed(2)}</td>
                <td className="border border-gray-300 p-1"></td>
                <td className="border border-gray-300 p-1">{item.OVER_HEAD_COST}</td>
                <td className="border border-gray-300 p-1">
                  {(item.OVER_HEAD_COST * item.REQUIRED_MAN_POWER).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="text-center font-bold">
              <td colSpan={2} className="border border-gray-300 p-1 text-end">Total</td>
              <td className="border border-gray-300 p-1">
                {totalReqManPower.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1">
                {totalManPowerCost.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
