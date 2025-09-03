/* eslint-disable @typescript-eslint/no-explicit-any */
import { SewingInputChallanReportType } from "../sewing-input-challan-report-type";

function ReportHeader({
  data,
  reportName
}: {
  data: SewingInputChallanReportType[];
  reportName: string
}) {

  return (
    <div className="w-[100%]">
      <h1 className="font-bold text-xl text-center">
        {
          data[0]?.COMPANYNAME
        }
      </h1>
      <h4 className="font-bold text-sm text-center">
        {
          data[0]?.COMPANYADDRESS
        }
      </h4>
      <h3 className="font-bold text-lg text-center mb-2">
        {reportName}
      </h3>
    </div>
  );
}

export default ReportHeader;
