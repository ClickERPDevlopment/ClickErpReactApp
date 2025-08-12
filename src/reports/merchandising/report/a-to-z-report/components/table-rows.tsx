import { cn } from '@/lib/utils'
import { IAtoZReport } from './IAtoZReport'
import moment from 'moment'
type props = {
    data: IAtoZReport[]
}
export default function TableRows({ data }: props) {
    return (
        data?.map((x, i) => (
            <tr className={cn("border-t border-gray-500",
                i % 2 ? 'bg-emerald-50' : ''
            )} key={i}>
                <td className="text-balance text-center p-1">
                    <span className="hidden">{x.BUYER_ID}</span>
                    {x.BUYER}
                </td>
                <td className=" text-balance text-center p-1">
                    <span className="hidden">{x.PO_ID}</span>
                    {x.PONO}
                </td>
                <td className="text-balance text-center p-1">
                    <span className="hidden">{x.STYLE_ID}</span>
                    {x.STYLENO}
                </td>
                <td className="text-balance text-center p-1">
                    {x.PO_QTY}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.CONSUMPTION_RELEASE_DATE && moment(x.CONSUMPTION_RELEASE_DATE).format("DD-MMM-YYYY")}
                </td>
                <td className="text-balance text-center p-1">
                    {x.YARN_BOOKING_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.ALLOCATED_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.ALLOCATED_BALANCE}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.YARN_ALLOCATION_CLOSE_DATE && moment(x.YARN_ALLOCATION_CLOSE_DATE).format("DD-MMM-YYYY")}
                </td>
                <td className="text-balance text-center p-1">
                    {x.YARN_ISSUE_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.YARN_ISSUE_BALANCE}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.YARN_ISSUE_LAST_DTATE && moment(x.YARN_ISSUE_LAST_DTATE).format("DD-MMM-YYYY")}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.KNITTING_START_DT && moment(x.KNITTING_START_DT).format("DD-MMM-YYYY")}
                </td>
                <td className="text-balance text-center p-1">
                    {x.GREY_RCV_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.KNITTING_BAL}
                </td>
                <td className="text-balance text-center p-1">
                    {x.KNITTING_WIP}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.KNITTING_CLOSE_DT && moment(x.KNITTING_CLOSE_DT).format("DD-MMM-YYYY")}
                </td>
                <td className="text-balance text-center p-1">
                    {x.DYEING_GREY_RCV_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.BATCH_QTY_KG}
                </td>
                <td className="text-balance text-center p-1">
                    {x.READY_FOR_BATCH}
                </td>
                <td className="text-balance text-center p-1">
                    {x.DYEING_QTY_KG}
                </td>
                <td className="text-balance text-center p-1">
                    {x.FINISHING_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.FINISHING_DELIVER_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.RFT}
                </td>
                <td className="text-balance text-center p-1">
                    {x.FINISH_REQ_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.FINISHING_FABRIC_RCV_QTY}
                </td>
                <td className="text-balance text-center p-1">
                    {x.FF_RCV_BALANCE}
                </td>
                <td className="text-nowrap text-center p-1">
                    {x.FIN_FABRICS_DEL_LAST_DATE && moment(x.FIN_FABRICS_DEL_LAST_DATE).format("DD-MMM-YYYY")}
                </td>
            </tr>
        ))
    )
}
