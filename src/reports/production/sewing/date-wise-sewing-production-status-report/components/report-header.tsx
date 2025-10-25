import moment from "moment";
import { DateWiseSewingProductionReportDto } from "../date-wise-sewing-production-report-type";

function ReportHeader({
  masterData,
  searchParam,
}: {
  masterData: DateWiseSewingProductionReportDto | null;
  searchParam: {
    fromDate: string;
    toDate: string; 
  };
}) {
  return (
    <div>
      <div className="">
        <h1 className="font-bold text-2xl text-center">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-base text-center">
          Sewing Production Report
        </h4>
        <h1 className="text-sm font-bold text-center">
          {moment(searchParam.fromDate).format("DD-MMM-YY")} to {moment(searchParam.toDate).format("DD-MMM-YY")}
        </h1>
      </div>
    </div>
  );
}

export default ReportHeader;
