/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";
import moment from "moment";

function Report({
  data,
}: {
  data: IYarnDeliveryChallanGatePassReport[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IYarnDeliveryChallanGatePassReport[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: IYarnDeliveryChallanGatePassReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["FABRIC", "GSM"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "YARN",
    "BRAND",
    "YARN LOT",
    "BAG & CONE QTY",
    "QTY",
  ];

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3">
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Challan No</td>
                  <td>: {data[0]?.CHALLAN_NO}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>: {moment(data[0]?.CHALLAN_DATE).format("DD-MM-YY")}</td>
                </tr>
                <tr>
                  <td>Order/Job No</td>
                  <td>: {data[0]?.PO_NO}</td>
                </tr>
                <tr>
                  <td>Style</td>
                  <td>: {data[0]?.STYLE}</td>
                </tr>
                <tr>
                  <td>Buyer</td>
                  <td>: {data[0]?.BUYER}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td>To</td>
                  <td>: {data[0]?.KNITTING_HOUSE}<br></br>{data[0]?.KNITTING_HOUSE_ADDRESS}</td>
                </tr>
                <tr>
                  <td>Isssue Type</td>
                  <td>: {data[0]?.ISSUE_TYPE}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-300 p-1">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="font-bold">
              <td colSpan={5} className="border border-gray-300 p-1">Fabric:{data[0]?.FABRIC}
                <br></br>GSM: {data[0]?.GSM}</td>
            </tr>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
