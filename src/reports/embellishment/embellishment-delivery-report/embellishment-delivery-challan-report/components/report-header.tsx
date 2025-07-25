/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";

function ReportHeader({
}: {
  data: EmbellishmentDeliveryReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        Magnum Bd Pvt Ltd
      </h1>
      <h4 className="text-center text-lg">568 & 584, Naojour, Kodda, Jaydebpur, Gazipur.</h4>
      <h3 className="font-bold text-lg text-center">
        Embellishment Delivery Challan
      </h3>
    </div>
  );
}

export default ReportHeader;
