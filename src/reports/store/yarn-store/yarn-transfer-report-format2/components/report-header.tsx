/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { YarnTransferReportType } from "../yarn-transfer-report-type";

function ReportHeader({
  data,
}: {
  data: YarnTransferReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        data[0]?.MAIN_COMPANY && <>
          <h1 className="font-bold text-xl text-center">
            {
              data[0]?.MAIN_COMPANY
            }
          </h1>
          <h4 className="font-bold text-sm text-center mb-3">
            {
              data[0]?.MAIN_COMPANY_ADDRESS
            }
          </h4>
        </>
      }

      <h1 className="font-bold text-sm text-center">
        ({
          data[0]?.COMPANY_NAME
        })
      </h1>
      <h3 className="font-bold text-lg text-center">
        Yarn Transfer Challan
      </h3>
    </div>
  );
}

export default ReportHeader;
