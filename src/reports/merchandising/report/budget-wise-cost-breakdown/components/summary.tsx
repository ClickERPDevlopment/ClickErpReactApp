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



export default function Summary({ data, gmtProcessType, fabricProcessType, commissionType }: props) {

  const rowspan = 3 +
    (fabricProcessType?.length ?? 0) +
    (gmtProcessType?.length ?? 0) +
    (commissionType?.length ?? 0)

  const showData: { particular: string, amount: number, isBBLCash: boolean, percentage?: number }[] = [
    {
      particular: "Main  FABRICS",
      amount: data?.BudgetWiseCostBreakdownDto_MainFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0),
      isBBLCash: true
    },
    {
      particular: "Other  FABRICS",
      amount: data?.BudgetWiseCostBreakdownDto_OtherFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0),
      isBBLCash: true
    },
    {
      particular: "Accessories",
      amount: data?.BudgetWiseCostBreakdownDto_Accessories?.reduce((p, c) => p + Number(c.TOTAL_COST), 0),
      isBBLCash: true
    },
  ]

  fabricProcessType?.forEach(element => {
    showData.push(
      {
        particular: element,
        amount: data?.BudgetWiseCostBreakdownDto_FabricProcessCost?.filter(f => f.PROCESS_NAME === element).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0),
        isBBLCash: true
      }
    )
  });

  gmtProcessType?.forEach(element => {
    showData.push(
      {
        particular: element,
        amount: data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(f => f.PROCESS_NAME === element).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0),
        isBBLCash: false
      }
    )
  });

  commissionType?.forEach(element => {
    showData.push(
      {
        particular: element,
        amount: commissionData.filter(f => f.commissinType === element)?.reduce((p, c) => p + Number(c.amount), 0),
        isBBLCash: false
      }
    )
  });

  const total = data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0);
  showData.forEach(element => {
    element.percentage = (element.amount / total) * 100;
  });

  return (
    <div>

      <table className="border border-gray-500 m-5">
        <thead>
          <tr>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" colSpan={6}>SUM UP</th>
          </tr>
          <tr>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" colSpan={3}>SUM UP</th>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" colSpan={3} >CR</th>
          </tr>
        </thead>
        <tbody>
          {showData?.map((item, i) =>
            i === 0 ?
              <tr>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={rowspan}>MASTER  L/C </td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={rowspan}>SALES CONTRACT NO : {data?.SalesContractNo}</td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={rowspan}>{data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0)}</td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">{item.particular}</td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">
                  {item.amount.toFixed(2)}
                </td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">{item.percentage?.toFixed(3)}%</td>

              </tr> :
              <tr>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">{item.particular}</td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">
                  {item.amount.toFixed(2)}
                </td>
                <td className="text-balance text-center p-1 border-r border-t border-gray-500">{item.percentage?.toFixed(3)}%</td>
              </tr>
          )}

          <tr>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500 font-bold">Total</td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500"></td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500 font-bold">{data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0)}</td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500"></td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500 font-bold">
              {(showData.reduce((p, c) => p + c.amount, 0)).toFixed(2)}
            </td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500"></td>
          </tr>

          <tr>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500 font-bold">Balance</td>
            <td className="text-balance text-center p-1 border-r border-t border-gray-500 font-bold" colSpan={5}>
              {(data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0) -
                (showData.reduce((p, c) => p + c.amount, 0))).toFixed(2)}
            </td>
          </tr>

        </tbody>
      </table>

      <div className="m-5 w-64">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-500 text-center p-1">BTB & Cash</th>
              <th className="border border-gray-500 text-center p-1">
                {(showData?.filter(f => f.isBBLCash)?.reduce((p, c) => p + (c.amount ?? 0), 0))?.toFixed(2)}
              </th>
              <th className="border border-gray-500 text-center p-1">
                {(showData?.filter(f => f.isBBLCash)?.reduce((p, c) => p + (c.percentage ?? 0), 0))?.toFixed(2)}%
              </th>
            </tr>
            <tr>
              <th className="border border-gray-500 text-center p-1">CM+Comercial</th>
              <th className="border border-gray-500 text-center p-1">
                {(showData?.filter(f => !f.isBBLCash)?.reduce((p, c) => p + (c.amount ?? 0), 0))?.toFixed(2)}
              </th>
              <th className="border border-gray-500 text-center p-1">
                {(showData?.filter(f => !f.isBBLCash)?.reduce((p, c) => p + (c.percentage ?? 0), 0))?.toFixed(2)}%
              </th>
            </tr>
          </thead>
        </table>
      </div>

    </div>


  );
}
