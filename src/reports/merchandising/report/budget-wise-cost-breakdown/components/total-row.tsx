import { ICommission } from "../budget-wise-cost-breakdown-index";
import { IBudgetWiseCostBreakdown } from "./IBudgetWiseCostBreakdown";

type props = {
  data: IBudgetWiseCostBreakdown,
  title: string,
  gmtProcessType?: string[],
  commissionType?: string[],
  children?: React.ReactNode,
  fabricProcessType?: string[],
}

const stored = localStorage.getItem('commissions');
const commissionData: ICommission[] = stored ? JSON.parse(stored) : [];

export default function TotalRow({ data, title, gmtProcessType, commissionType }: props) {
  console.log('start')
  const ddd = data?.BudgetWiseCostBreakdownDto_PO.map(f => { const dd = { poid: f.PO_ID, styleId: f.STYLE_ID, qty: f.QTY }; return dd; })
  console.log('end', ddd)

  return (
    <tr>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" colSpan={6}>{title}</th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">{data?.BudgetWiseCostBreakdownDto_PO.reduce((p, c) => p + Number(c.QTY), 0)}</th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">
        {data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">
        {data?.BudgetWiseCostBreakdownDto_MainFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {(data?.BudgetWiseCostBreakdownDto_OtherFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2))}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {(data?.BudgetWiseCostBreakdownDto_Accessories?.reduce((p, c) => p + Number(c.TOTAL_COST), 0).toFixed(2))}
      </th>
      {gmtProcessType?.map((fp_item, i) =>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
          {data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(f => f.PROCESS_NAME === fp_item).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0).toFixed(2)}
        </th>
      )}
      {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Total CM Achieve</th> */}

      {commissionType?.map((fp_item, i) =>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
          {commissionData.filter(f => f.commissinType === fp_item)?.reduce((p, c) => p + Number(c.amount), 0)?.toFixed(2)}
        </th>
      )}
      {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Commercial</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Head Office Cost </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Buyeing commission</th> */}
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* {grossCost()?.toFixed(2)} */}
        {Number(localStorage.getItem('grossCost'))?.toFixed(2)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* SHORT+ EXTRA */}
        {Number((data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Math.round(c.MASTER_LC_VALUE), 0)) - (Number(localStorage.getItem('grossCost') ?? 0))).toFixed(2)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* CM per dzn Achieve */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* SMV */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* Target CM per dzn */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* PROFIT/ LOSS */}
      </th>
    </tr>
  );
}
