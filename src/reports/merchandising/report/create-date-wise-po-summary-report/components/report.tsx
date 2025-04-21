/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { ICreateDateWisePoSummaryReport } from "../create-date-wise-po-summary-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { useRef, useState } from "react";
import useApiUrl from "@/hooks/use-ApiUrl";

function Report({
  data,
  searchParams,
}: {
  data: ICreateDateWisePoSummaryReport[];
  searchParams: { toDate: any; fromDate: any };
}) {

  const api = useApiUrl();
  const [hoveredStyleId, setHoveredStyleId] = useState<number | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState<{ top: number; left: number } | null>(null);
  const cellRef = useRef<HTMLTableCellElement | null>(null);

  const fetchImage = async (id: number) => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setStyleImage(url);
        console.log("Image URL:", url);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  //set table header
  const firstHeader = [
    "SL No",
    "Prefix",
    "Buyer",
    "Style",
    "Po",
    "Item Type",
    "Order Qty",
    "Shipdate",
    "Placement Month",
    "CM($) per pcs",
    "CM($) per Dzn",
    "Total CM($)",
    "FOB($) per pcs",
    "Total FOB($)",
    "Create By",
    "Create Date",
  ];

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0);

  return (
    <div className="px-10 text-sm">
      {hoveredStyleId && imagePosition && (
        <div
          className="absolute z-50 bg-white shadow-lg p-2 rounded-md"
          style={{
            top: `${imagePosition.top}px`,
            left: `${imagePosition.left}px`,
          }}
        >
          <img
            src={styleImage || ""}
            alt="Style Image"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="text-center">
                <td className="border border-gray-300">
                  {index + 1}
                </td>
                <td className="border border-gray-300">
                  {item.COMPANY_PREFIX}
                </td>
                <td className="border border-gray-300">
                  {item.BUYER_NAME}
                </td>
                <td className="border border-gray-300 cursor-pointer"
                  ref={cellRef}
                  onMouseEnter={(e) => {
                    const rect = (e.currentTarget as HTMLTableCellElement).getBoundingClientRect();
                    setImagePosition({
                      top: rect.bottom + window.scrollY,
                      left: rect.left + window.scrollX,
                    });
                    setHoveredStyleId(item.STYLE_ID);
                    fetchImage(item.STYLE_ID);
                  }}
                  onMouseLeave={() => {
                    setHoveredStyleId(null);
                    setImagePosition(null);
                  }}
                >
                  {item.STYLE_NO}
                </td>
                <td className="border border-gray-300">{item.PO_NO}</td>
                <td className="border border-gray-300">{item.ITEM_TYPE}</td>
                <td className="border border-gray-300">
                  {item.QTY}
                </td>
                {moment(item.SHIP_DATE).format("DD-MMM-YY") !== "01-Jan-01" ?
                  <td className="border border-gray-300">
                    {moment(item.SHIP_DATE).format("DD-MMM-YY")}
                  </td> : <td className="border border-gray-300"></td>
                }
                <td className="border border-gray-300">{moment(item.ORDERPLACEMENTMONTH).format("MMM-YY")}</td>
                <td className="border border-gray-300">
                  {item.CM.toFixed(3)}
                </td>
                <td className="border border-gray-300">
                  {(item.CM * 12).toFixed(3)}
                </td>
                <td className="border border-gray-300">{(item.CM * item.QTY).toFixed(3)}</td>
                <td className="border border-gray-300">
                  {item.FOB.toFixed(3)}
                </td>
                <td className="border border-gray-300">
                  {(item.FOB * item.QTY).toFixed(3)}
                </td>
                <td className="border border-gray-300">{item.CREATEBY}</td>
                <td className="border border-gray-300 text-nowrap">{moment(item.CREATEDATE).format("DD-MMM-YY")}</td>
              </tr>
            ))}
            <tr className="font-bold text-center">
              <td colSpan={6} className="border border-gray-300">
                Total
              </td>
              <td className="border border-gray-300">{totalQty}</td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
            </tr>
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
