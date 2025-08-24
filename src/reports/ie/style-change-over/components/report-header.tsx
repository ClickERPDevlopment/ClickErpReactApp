import moment from "moment";
import { IStyleChangeOver } from "../style-change-over-type";

function ReportHeader({ data }: { data: IStyleChangeOver[] }) {
  return (
    <div className="">
      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {data && data.length > 0 ? data[0].COMPANY_NAME : "Company Name"}
      </h1>
      <h4 className="font-bold text-base text-center">
        {data && data.length > 0
          ? data[0].COMPANY_ADDRESS : "Company Address"}
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Style Change Over Report
      </h3>
    </div>
  );
}

export default ReportHeader;
