import moment from "moment";
import { YarnRcvIssueRegisterReportType } from "../yarn-rcv-issue-register-report-index-type";

function ReportSubgroup({
  data,
  totalRcvKg,
  totalRcvCtn
}: {
  data: YarnRcvIssueRegisterReportType[];
  firstHeader: string[] | null;
  index: number;
  totalRcvKg: number;
  totalRcvCtn: number;
}) {
  const rcvCtn = data?.reduce((acc, item) => acc + item.RECEIVE_CTN, 0)
  const rcvKg = data?.reduce((acc, item) => acc + item.RECEIVE_KG, 0)
  const issueCtn = data?.reduce((acc, item) => acc + item.ISSUE_CTN, 0)
  const issueKg = data?.reduce((acc, item) => acc + item.ISSUE_KG, 0)


  // let CHECK_COLUMN2 = "";
  // let CHECK_COLUMN = "";
  // let blncCtn = 0;
  // let blncKg = 0;

  // data?.forEach(item => {
  //   // Balance CTN logic
  //   if (CHECK_COLUMN2 === item.CHECK_COLUMN) {
  //     blncCtn += item.RECEIVE_CTN - item.ISSUE_CTN;
  //   } else {
  //     blncCtn = (item.RECEIVE_CTN - item.ISSUE_CTN) + item.TOTAL_BALANCE_CTN;
  //   }
  //   if (CHECK_COLUMN2 !== item.CHECK_COLUMN) {
  //     CHECK_COLUMN2 = item.CHECK_COLUMN;
  //   }

  //   // Balance KG logic
  //   if (CHECK_COLUMN === item.CHECK_COLUMN) {
  //     blncKg += item.RECEIVE_KG - item.ISSUE_KG;
  //   } else {
  //     blncKg = (item.RECEIVE_KG - item.ISSUE_KG) + item.TOTAL_BALANCE;
  //   }
  //   if (CHECK_COLUMN !== item.CHECK_COLUMN) {
  //     CHECK_COLUMN = item.CHECK_COLUMN;
  //   }
  // });


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.1">{data[0]?.LC_NO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.BRAND}</td>
        <td className="border border-gray-950 p-0.1 text-nowrap">{moment(data[0]?.YARN_RECEIVED_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.PO_NO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.CHALLAN_NO}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.KNITTING_HOUSE}</td>
        <td className="border border-gray-950 p-0.1 text-nowrap">{data[0]?.IMPORT_TYPE}</td>
        <td className="border border-gray-950 p-0.1">{rcvCtn.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{data[0]?.PER_CTN_QTY}</td>
        <td className="border border-gray-950 p-0.1">{rcvKg.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{issueCtn.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{issueKg.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{(totalRcvCtn - issueCtn).toFixed(2)}</td>
        <td className="border border-gray-950 p-0.1">{(totalRcvKg - issueKg).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
