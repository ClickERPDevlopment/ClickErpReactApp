/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";

function ReportHeader({
  data
}: {
  data: EmbellishmentDeliveryReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {
          data[0]?.COMPANY_NAME
        }
      </h1>
      <h4 className="text-center text-lg">
        {
          data[0]?.COMPANY_ADDRESS
        }
      </h4>
      <h3 className="font-bold text-lg text-center">
        Embellishment Delivery Gate Pass
      </h3>
    </div>
  );
}

export default ReportHeader;
