import moment from "moment";
import { KnittingProductionReportType } from "../knitting-production-report-type";

function ReportHeader({
  masterData,
  searchParam,
}: {
  masterData: KnittingProductionReportType | null;
  searchParam: { dtChecked: boolean, fromDate: string, toDate: string, factoryId: number };
}) {
  return (
    <div>
      <div className="">
        <p className="font-bold text-xm text-left w-[100%]">
          {moment().format("DD-MMM-YYYY")}
        </p>
        <h1 className="font-bold text-2xl text-center">
          {searchParam.factoryId == 0 ? "Anowara Group" : masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-base text-center mt-2">
          Knitting Pdroduction Report
        </h4>
        <h1 className="font-bold text-base text-center">
          {moment(searchParam.fromDate).format("DD-MMM-YY")} to {moment(searchParam.toDate).format("DD-MMM-YY")}
        </h1>
      </div>
    </div>
  );
}

export default ReportHeader;
