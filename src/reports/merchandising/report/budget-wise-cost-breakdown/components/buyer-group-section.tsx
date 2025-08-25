import StyleImage from "@/components/style-image";
import { ICommission } from "../budget-wise-cost-breakdown-index";
import { IBudgetWiseCostBreakdown, IBudgetWiseCostBreakdownDto_Booking } from "./IBudgetWiseCostBreakdown";

type props = {
  data: IBudgetWiseCostBreakdown,
  bookingData: IBudgetWiseCostBreakdownDto_Booking[];
  children?: React.ReactNode,
  fabricProcessType?: string[],
  gmtProcessType?: string[],
  commissionType?: string[],
  updateCommission: (com: ICommission) => void,
  index: number,
}

export default function PoStyleGroupSection({ data, bookingData, fabricProcessType, gmtProcessType, commissionType, updateCommission, index }: props) {

  const poData = () =>
    data?.
      BudgetWiseCostBreakdownDto_PO?.
      filter(item => item.PO_ID === bookingData[0].PO_ID && item.STYLE_ID === bookingData[0].STYLE_ID)


  const mainFabricData = (fabricId: number) =>
    fabricId === 0 ?
      data?.
        BudgetWiseCostBreakdownDto_MainFabric?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID) :
      data?.
        BudgetWiseCostBreakdownDto_MainFabric?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID && item.FABRIC_ITEM_ID === fabricId)

  const otherFabricData = () =>
    data?.
      BudgetWiseCostBreakdownDto_OtherFabric?.
      filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID)

  const accessoriesData = () =>
    data?.
      BudgetWiseCostBreakdownDto_Accessories?.
      filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID)


  const fabricProcessData = (fabricId: number, process: string) =>
    fabricId === 0 ?
      data?.
        BudgetWiseCostBreakdownDto_FabricProcessCost?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID) :
      data?.
        BudgetWiseCostBreakdownDto_FabricProcessCost?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID && item.FABRIC_ID === fabricId && item.PROCESS_NAME === process)


  const gmtProcessData = (process: string) =>
    process === "" ?
      data?.
        BudgetWiseCostBreakdownDto_GmtOtherCost?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID) :
      data?.
        BudgetWiseCostBreakdownDto_GmtOtherCost?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID && item.PROCESS_NAME === process)

  const commissionData = (costName: string) =>
    costName === "" ?
      data?.
        BudgetWiseCostBreakdownDto_Commission?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID) :
      data?.
        BudgetWiseCostBreakdownDto_Commission?.
        filter(item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID && item.COST_NAME === costName)

  const netCost = () =>
    mainFabricData(0)?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0) +
    otherFabricData()?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0) +
    accessoriesData()?.reduce((p, c) => p + Number(c.TOTAL_COST), 0) +
    fabricProcessData(0, '')?.reduce((p, c) => p + Number(c.TOTAL_PRICE), 0) +
    gmtProcessData('')?.reduce((p, c) => p + Number(c.TOTAL_PRICE), 0);

  const getCommissionCost = ({ comPercentage, commissinType, comValueCost }: { comPercentage: number, commissinType?: string, comValueCost?: number }) => {
    const net_cost = netCost();
    const n = ((net_cost ?? 0) * (comPercentage ?? 0) / 100);

    if (commissinType) {
      updateCommission({
        commissinType: commissinType ?? '',
        poid: bookingData[0].PO_ID,
        styelid: bookingData[0].STYLE_ID,
        amount: (n ?? 0) + (comValueCost ?? 0)
      });
    }


    return (n ?? 0) + (comValueCost ?? 0);
  }

  const grossCost = () => {
    const net_cost = netCost();
    let totalCost: number = net_cost;
    if (commissionType) {
      for (let index = 0; index < commissionType?.length; index++) {
        const element = commissionType[index];
        const comValueCost = commissionData(element)?.reduce((p, c) => p + Number(c.COMMISSION_VALUE_BUDGET), 0)
        const comCost = getCommissionCost(
          {
            comPercentage: commissionData(element)?.reduce((p, c) => p + Number(c.COMMISSION_PERCENTAGE_BUDGET), 0),
            comValueCost
          })

        totalCost += comCost;
      }
    }
    localStorage.setItem('grossCost', totalCost.toString())
    return totalCost;
  }

  return (
    bookingData?.map((item, i) =>
      i == 0 ?
        <tr key={i}>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{index + i + 1}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.BUYER}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.STYLENO} </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.PONO}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.JOB_POS}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            <div className="w-full">
              <StyleImage styleId={item.STYLE_ID} />
            </div>
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{poData()?.reduce((p, c) => p + Number(c.QTY), 0)}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.ITEMTYPE}</th>

          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{bookingData[i]?.FABRIC}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)?.reduce((p, c) => p + Number(c.FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET), 0)}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)[0]?.UOM}</th>

          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {data?.BudgetWiseCostBreakdownDto_PO?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)?.FOB}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {data?.BudgetWiseCostBreakdownDto_PO?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)?.MASTER_LC_VALUE}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">
            {mainFabricData(item.FABRIC_OR_MTL_ID)?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2)}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {(otherFabricData()?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2))}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {(accessoriesData()?.reduce((p, c) => p + Number(c.TOTAL_COST), 0).toFixed(2))}
          </th>
          {gmtProcessType?.map((fp_item, i) =>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length} key={i}>
              {gmtProcessData(fp_item)?.reduce((p, c) => p + Number(c.TOTAL_PRICE), 0).toFixed(2)}
            </th>
          )}
          {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>Total CM Achieve</th> */}

          {commissionType?.map((fp_item, i) =>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length} key={i}>
              {/* {commissionData(fp_item)?.reduce((p, c) => p + Number(c.COMMISSION_PERCENTAGE_BUDGET), 0)}- */}
              {(getCommissionCost({
                comPercentage: commissionData(fp_item)?.reduce((p, c) => p + Number(c.COMMISSION_PERCENTAGE_BUDGET), 0),
                commissinType: fp_item,
                comValueCost: commissionData(fp_item)?.reduce((p, c) => p + Number(c.COMMISSION_VALUE_BUDGET), 0)
              })
              ).toFixed(2)}
            </th>
          )}
          {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>Commercial</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>Head Office Cost </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>Buyeing commission</th> */}
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {
              grossCost()?.toFixed(2)
            }</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {/* SHORT+ EXTRA */}
            {((data?.BudgetWiseCostBreakdownDto_PO?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)?.MASTER_LC_VALUE ?? 0) - grossCost()).toFixed(2)}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {/* CM per dzn Achieve */}
            {data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID && f.PROCESS_NAME === "CM")?.DZN_PRICE}


          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {/* SMV */}
            {bookingData[0]?.SMVSEWING}

          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {/* Target CM per dzn */}
            {((bookingData[0]?.SMVSEWING ?? 0) * 0.06 * 12)?.toFixed(2)}
          </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
            {/* PROFIT/ LOSS */}
            {
              (((((data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID && f.PROCESS_NAME === "CM")?.DZN_PRICE ?? 0) -
                (bookingData[0]?.SMVSEWING ? bookingData[0].SMVSEWING * 0.06 * 12 : 0)) * (poData()?.reduce((p, c) => p + Number(c.QTY), 0))) / 12))?.toFixed(2)

            }
          </th>
        </tr>
        :
        <tr key={i}>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{i + 1}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{bookingData[i]?.FABRIC}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)?.reduce((p, c) => p + c.FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET, 0)}</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)[0]?.UOM} </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500">
            {(mainFabricData(item.FABRIC_OR_MTL_ID)?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0))?.toFixed(2)}
          </th>

          {fabricProcessType?.map((fp_item, i) =>
            <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
              {(fabricProcessData(item.FABRIC_OR_MTL_ID, fp_item)?.reduce((p, c) => p + Number(c.TOTAL_PRICE), 0))?.toFixed(2)}
            </th>
          )}

        </tr>
    )
  );
}
