/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { BudgetReportResponseType } from "../budget-report-type";

function ReportHeader({
  data,
}: {
  data: BudgetReportResponseType | undefined;
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        data?.Report[0]?.MAIN_COMPANY_NAME && <>
          <h1 className="font-bold text-xl text-center">
            {
              data?.Report[0]?.MAIN_COMPANY_NAME
            }
          </h1>
          <h4 className="font-bold text-sm text-center mb-3">
            {
              data?.Report[0]?.MAIN_COMPANY_ADDRESS
            }
          </h4>
        </>
      }

      <h1 className="font-bold text-sm text-center">
        ({
          data?.Report[0]?.COMPANY_NAME
        })
      </h1>
    </div>
  );
}

export default ReportHeader;
