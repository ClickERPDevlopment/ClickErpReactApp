import { IAtoZReport } from "./IAtoZReport";
import { cn } from "@/lib/utils";

type props = {
  data: IAtoZReport[],
  children?: React.ReactNode
}

export default function PoGroupSection({ data, children }: props) {
  return (
    <>
      {children}
      {data?.map((x, i) => (
        <tr className={cn("border-t border-gray-500",
          i % 2 ? 'bg-emerald-50' : ''
        )} key={i}>
          <td className="text-balance  text-center p-1">
            <span className="hidden">{x.BUYER_ID}</span>
            {x.BUYER}
          </td>
          <td className="text-balance text-center p-1">
            <span className="hidden">{x.STYLE_ID}</span>
            {x.STYLENO}
          </td>
          <td className=" text-balance  text-center p-1">
            {/* <span className="hidden">{x.JOB_PO_ID}</span> */}
            {x.PONO}
          </td>
          {/* <td className=" text-balance  text-center p-1">{x.ORDER_QTY}</td>
          <td className=" text-balance  text-center p-1">{x.SHIP_QTY}</td> */}
          {/* <td className=" text-balance  text-center p-1">
            <FabricCostDialog text={x.FABRIC_COST.toFixed(2)} poId={x.JOB_PO_ID} styleId={x.STYLE_ID} />
          </td>
          <td className=" text-balance  text-center p-1">{x.ACCESSORIES_COST.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.EMBLISHMENT_COST.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.COMMERCIAL_COST.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.CM_COST.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.TOTAL_COST.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.SHIP_VALUE.toFixed(2)}</td>
          <td className=" text-balance  text-center p-1">{x.PROFIT_LOSS.toFixed(2)}</td> */}
        </tr>
      ))}
      {/* <TotalRow data={data} title="PO-wise Sub-Total" /> */}
    </>

  );
}
