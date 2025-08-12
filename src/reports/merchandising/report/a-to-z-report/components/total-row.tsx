import { cn } from "@/lib/utils";
import { IAtoZReport } from "./IAtoZReport";

type props = {
  data: IAtoZReport[],
  title: string
}

export default function TotalRow({ data, title }: props) {

  return (
    <tr className={cn("border-t border-gray-500",)}>
      <td className="text-balance text-center p-1" colSpan={3}>
        {title}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.PO_QTY), 0)}
      </td>
      <td className="text-nowrap text-center p-1">

      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.YARN_BOOKING_QTY), 0)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.ALLOCATED_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.ALLOCATED_BALANCE), 0)?.toFixed(2)}
      </td>
      <td className="text-nowrap text-center p-1">

      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.YARN_ISSUE_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.YARN_ISSUE_BALANCE), 0)?.toFixed(2)}
      </td>
      <td className="text-nowrap text-center p-1">

      </td>
      <td className="text-nowrap text-center p-1">

      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.GREY_RCV_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.KNITTING_BAL), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.KNITTING_WIP), 0)?.toFixed(2)}
      </td>
      <td className="text-nowrap text-center p-1">

      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.DYEING_GREY_RCV_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.BATCH_QTY_KG), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.READY_FOR_BATCH), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.DYEING_QTY_KG), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.FINISHING_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.FINISHING_DELIVER_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.RFT), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.FINISH_REQ_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.FINISHING_FABRIC_RCV_QTY), 0)?.toFixed(2)}
      </td>
      <td className="text-balance text-center p-1">
        {data?.reduce((p, c) => p + Number(c.FF_RCV_BALANCE), 0)?.toFixed(2)}
      </td>
      <td className="text-nowrap text-center p-1"></td>
    </tr>
  );
}
