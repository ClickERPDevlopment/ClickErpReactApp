/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbMaterialRequirementReportType } from "../embellishment-budget-sheet-type";

function ReportHeader({ embMaterialReqData }: { embMaterialReqData: EmbMaterialRequirementReportType[] }) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {
          embMaterialReqData[0]?.COMPANY_NAME
        }
      </h1>
      <h4 className="font-bold text-base text-center">
        {
          embMaterialReqData[0]?.COMPANY_ADDRESS
        }
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Embellishment Budget Sheet
      </h3>
    </div>
  );
}

export default ReportHeader;
