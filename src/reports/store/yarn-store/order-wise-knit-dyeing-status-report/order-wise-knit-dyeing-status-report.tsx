import moment from "moment";
import { OrderWiseKnttingDeyingStatusReportType } from "./order-wise-knit-dyeing-status-report-type";

export default function OrderWiseKnittingDyeingStatusReport({ data }: { data: OrderWiseKnttingDeyingStatusReportType[] }) {
  return (
    <>
      <h5 className="font-bold text-2xl print:text-center">Order Wise Knitting And Dyeing Status</h5>

      <div className='table-wrapper'>
        <table className='table table-bordered'>
          <thead className=''>
            <tr className="border ">
              <th className="min-w-12 ">SL</th>
              <th className="min-w-24 ">OPM</th>
              <th className="min-w-28 ">Buyer</th>
              <th className="min-w-28 ">PO/ Job No</th>
              <th className="min-w-28 ">Buyer PO</th>
              <th className="min-w-28 ">Fabric Source</th>
              <th className="min-w-28 ">Style</th>
              <th className="min-w-24 ">Item</th>
              <th className="min-w-24 ">Color</th>
              <th className="min-w-64 " >Fabric</th>
              <th className="min-w-28 " >Booking Date</th>
              <th className="min-w-24 ">GMT Order Qty</th>
              <th className="min-w-28 ">Fin Order Qty (A)</th>
              <th className="min-w-16 ">UOM</th>
              <th className="min-w-24 ">Req Yarn (B)</th>
              <th className="min-w-24 ">Yarn Issue (C)</th>
              <th className="min-w-24 ">Issue Bal (C-B)</th>
              <th className="min-w-24 ">Req Grey (D)</th>
              <th className="min-w-24 ">KNT Qty (E)</th>
              <th className="min-w-24 ">KNT Bal (E-D)</th>
              <th className="min-w-24 ">Grey Rcv Qty (F)</th>
              <th className="min-w-24 ">Grey Bal (F-D)</th>
              <th className="min-w-24 ">Grey Issue Qty (G)</th>
              <th className="min-w-24 ">Issue Bal (G-D)</th>
              <th className="min-w-24 ">Dyeing Qty (H)</th>
              <th className="min-w-24 ">Dyeing Bal (H-G)</th>
              <th className="min-w-24 ">Fin Qty GW (I)</th>
              <th className="min-w-24 ">Fin Qty FW (J)</th>
              <th className="min-w-24 ">Fin Bal (J-A)</th>
              <th className="min-w-24 ">Grey Bal (I-H)</th>
              <th className="min-w-24 ">Wastage% (J-I)</th>
              <th className="min-w-24 ">Fin Rcv Qty (K)</th>
              <th className="min-w-24 ">Rcv Bal (K-A)</th>
              <th className="min-w-24 ">Issue to Cut (L)</th>
              <th className="min-w-24 ">Cut Bal (L-A)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) =>
              <tr className={`border ${i % 2 == 0 ? "bg-white" : " bg-gray-300"} hover:bg-emerald-200`} key={i}>
                <td>{i + 1}</td>
                <td >{moment(d.OPM).format('d-MMM-yy')}</td>
                <td className="text-left pl-1">{d.BUYER_NAME}</td>
                <td className="text-left pl-1 underline text-sky-600 hover:underline">
                  <a href={`/report/merchandising/booking/fabric-booking-report?po=${d.PONO}&styleNo=${d.STYLENO}`} target="_blank" rel="noopener noreferrer">
                    {d.PONO}
                  </a>
                </td>
                <td className="text-left pl-1">{d.BUYER_PO}</td>
                <td className="text-left pl-1">{d.FABRIC_SOURCE}</td>
                <td className="text-left pl-1">{d.STYLENO}</td>
                <td className="text-left pl-1">{d.ITEMTYPE}</td>
                <td className="text-left pl-1">{d.COLORNAME}</td>
                <td className="text-left pl-1">{d.FABRIC}</td>
                <td>{moment(d.BOOKING_DATE).format('d-MMM-yy')}</td>
                <td>{d.PO_QTY}</td>
                <td>{d.ORDER_QTY_FIN}</td>
                <td>{d.UOM}</td>
                <td>{d.REQ_YARN_QTY}</td>
                <td>{d.YARN_ISSUE_QTY}</td>
                <td>{d.YARN_ISSUE_BAL}</td>
                <td>{d.REQ_GREY_QTY}</td>
                <td>{d.KNT_QTY}</td>
                <td>{d.KNT_BAL}</td>
                <td>{d.GREY_RCV_QTY}</td>
                <td>{d.GREY_RCV_BAL}</td>
                <td>{d.GREY_ISSUE_QTY}</td>
                <td>{d.GREY_ISSUE_BAL}</td>
                <td>{d.DYEING_QTY}</td>
                <td>{d.DYEING_BAL}</td>
                <td>{d.FIN_QTY_GW}</td>
                <td>{d.FIN_QTY_FW}</td>
                <td>{d.FIN_FW_BAL}</td>
                <td>{d.FIN_GW_BAL}</td>
                <td>{d.WASTAGE}</td>
                <td>{d.FIN_RCV_QTY}</td>
                <td>{d.FIN_RCV_BAL}</td>
                <td>{d.ISSUE_TO_CUT}</td>
                <td>{d.ISSUE_TO_CUT_BAL}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>

  )
}
