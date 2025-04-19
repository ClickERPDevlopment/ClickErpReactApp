/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";

function ReportHeader({
  data,
}: {
  data: IYarnDeliveryChallanGatePassReport[];
}) {

  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {
          data[0]?.COMPANY_NAME
        }
      </h1>
      <h4 className="font-bold text-base text-center">
        {
          data[0]?.ADDRESS
        }
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Yarn Delivery Challan/Gate Pass Report
      </h3>
    </div>
  );
}

export default ReportHeader;
