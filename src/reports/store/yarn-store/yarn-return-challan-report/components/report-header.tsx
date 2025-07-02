/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { YarnReturnChallanReportType } from "../yarn-challan-report-type";

function ReportHeader({
  data
}: {
  data: YarnReturnChallanReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-3xl text-center">
        {
          data[0]?.COMPANY_NAME
        }
      </h1>
      <h4 className="text-center text-lg">Address: {data[0]?.COMPANY_ADDRESS}</h4>
      <h4 className="text-center text-lg">Telephone: {data[0]?.COM_CONTACT}</h4>
      <h3 className="font-bold text-xl text-center mt-2">
        <span className="">Yarn Return Challan</span>
      </h3>
    </div>
  );
}

export default ReportHeader;
