import moment from "moment";

function ReportHeader() {
  return (
    <div className="">
      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        International Classic Composite Ltd.
      </h1>
      <h4 className="font-bold text-base text-center">
        568 & 584, Naojour, Kodda, Jaydevpur, Gazipur.,
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Style Change Over Report
      </h3>
    </div>
  );
}

export default ReportHeader;
