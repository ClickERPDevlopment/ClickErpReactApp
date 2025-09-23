/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { GreyFabricProcessChallanReportType } from "../grey-fabric-process-challan-report-type";

function ReportHeader({
  data,
}: {
  data: GreyFabricProcessChallanReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        data[0]?.COMPANY_NAME && <>
          <h1 className="font-bold text-xl text-center">
            {
              data[0]?.COMPANY_NAME
            }
          </h1>
          <h4 className="font-bold text-sm text-center mb-2">
            {
              data[0]?.COMPANY_ADDRESS
            }
          </h4>
        </>
      }
      <h3 className="font-bold text-sm text-center">
        <span className="p-1 border bg-gray-300">
          Dyeing Factory: {data[0]?.DYEING_COMPANY}
        </span>
      </h3>
      <h3 className="font-bold text-xl text-center uppercase ">
        Grey Fabric Issue Challan for Process
      </h3>
    </div>
  );
}

export default ReportHeader;
