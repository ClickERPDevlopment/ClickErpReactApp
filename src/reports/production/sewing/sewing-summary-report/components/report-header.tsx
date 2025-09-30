import { SewingSummaryReportType } from "../sewing-summary-report-type";

function ReportHeader({
}: {
  masterData: SewingSummaryReportType | null;
  searchParam: { fromDate: string, toDate: string };
}) {
  return (
    <div>
      <div className="">
        {/* <p className="font-bold text-xm text-left w-[100%]">
          {moment().format("DD-MMM-YYYY")}
        </p> */}
        <h2 className="font-bold text-xl text-center mt-1">
          Fame Group
        </h2>
        <h4 className="font-bold text-sm text-center mt-1">
          Sewing Summary Report (Daily & Monthly)
        </h4>
      </div>
    </div>
  );
}

export default ReportHeader;
