/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

function ReportHeader({
  searchParams,
}: {
  searchParams: { toDate: any; fromDate: any, COMPANY_NAME: string, COMPANY_ADDRESS: string, COMPANY_REMARKS: string };
}) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {searchParams?.COMPANY_NAME || "Company Name"}
      </h1>
      <h4 className="font-bold text-base text-center">
        {searchParams?.COMPANY_ADDRESS || "Company Address"}
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Shipment Delay Report
      </h3>
      <h3 className="font-bold text-xl text-center mt-2">
        {moment(searchParams?.fromDate).format("MMM-YY")} to{" "}
        {moment(searchParams?.toDate).format("MMM-YY")}
      </h3>
    </div>
  );
}

export default ReportHeader;
