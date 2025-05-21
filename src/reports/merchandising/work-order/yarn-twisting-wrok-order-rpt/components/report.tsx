/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-array-constructor */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { YarnTwistingWorkOrderReportType } from "../yarn-twisting-wrok-order-rpt-type";

function Report({ data }: { data: YarnTwistingWorkOrderReportType[] }) {
  return (
    <div>
      <div className="p-2">
        <ReportHeader masterData={data[0]} />
        <ReportTable data={data} />
        <ReportFooter masterData={null} />
      </div>
    </div>
  );
}

export default Report;
