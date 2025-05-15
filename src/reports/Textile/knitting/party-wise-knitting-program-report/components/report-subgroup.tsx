import moment from "moment";
import { PartyWiseKnittingProgramType } from "../party-wise-knitting-program-report-type";

function ReportSubgroup({
  data,
  index
}: {
  data: PartyWiseKnittingProgramType[];
  firstHeader: string[] | null;
  index: number
}) {


  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );

  const totalQtyPcs = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_PICES),
    0
  );

  return (
    <>
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT} X {data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FABRIC}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FABRIC_TYPE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.MC_DIA} X {data[0]?.GAUGE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FINISH_DIA}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.GSM}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLORNAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STITCH_LENGTH}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LYCRA_CM}</td>
        <td className="border border-gray-950 p-0.5">{totalQtyKg}</td>
        <td className="border border-gray-950 p-0.5">{totalQtyPcs}</td>
        <td className="border border-gray-950 p-0.5">{moment(data[0]?.START_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{moment(data[0]?.END_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.REMARKS}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
