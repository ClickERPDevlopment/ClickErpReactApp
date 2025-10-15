/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { ToWords } from 'to-words';

import { MaterialReceiveReportType } from "../material-receive-report-type";

function Report({
  data,
}: {
  data: MaterialReceiveReportType[];
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: MaterialReceiveReportType[],
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
      items: MaterialReceiveReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL NO.",
    "PO No",
    "Item Name",
    "Model/Lot",
    "Brand",
    "Origin",
    "Location",
    "Rcv Qty",
    "Additional Qty",
    "UOM",
    "Unit Price",
    "Amount"
  ];

  const toWords = new ToWords({
    localeCode: 'en-BD',
    converterOptions: {
      currency: true,
      currencyOptions: {
        name: 'Taka',
        plural: 'Taka',
        symbol: '৳',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paisa',
          symbol: 'p',
        },
      },
    },
  });



  const totalAmount = data.reduce((acc, item) => acc + (item.RECEIVE_QTY * item.ACTUAL_PRICE), 0)


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">MRR No</td>
                  <td className="align-top">: {data[0]?.MRR_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Received Store</td>
                  <td className="align-top">: {data[0]?.STORE_NAME}</td>
                </tr>
                <tr>
                  <td className="align-top">Challan No</td>
                  <td className="align-top">: {data[0]?.BILL_NUMBER}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">LC No</td>
                  <td className="align-top">: {data[0]?.LC_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Supplier</td>
                  <td className="align-top">: {data[0]?.SUPPLIER_NAME}</td>
                </tr>
                <tr>
                  <td className="align-top">Challan Date</td>
                  <td className="align-top">
                    : {data[0]?.CHALLAN_DATE ? moment(data[0].CHALLAN_DATE).format("DD-MM-YY") : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Receive Date</td>
                  <td className="align-top">: {moment(data[0]?.RECEIVE_DATE).format("DD-MM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Currecny</td>
                  <td className="align-top">: {data[0]?.CURRENCYCODE}</td>
                </tr>
                <tr>
                  <td className="align-top">Gate Entry No</td>
                  <td className="align-top">: {data[0]?.GATE_ENTRY_NO}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
          </tbody>
        </table>

        <div>
          <p style={{ fontSize: "12px" }} className="font-bold mt-2">In Words: {toWords.convert(totalAmount)}</p>
          <p style={{ fontSize: "12px" }} className="font-bold mt-2">Remarks: {data[0]?.REMARKS}</p>
        </div>

        <div className="mt-[144px]"></div>

        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
