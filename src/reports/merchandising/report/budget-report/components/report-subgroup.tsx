import { BudgetReportType } from "../budget-report-type";

function ReportSubgroup({
  data
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QTY),
    0);

  return (
    <>
      {data[0].DS === 'COST CENTER' ?
        <tr style={{ fontSize: "11px" }} className="font-bold">
          <td className="border border-gray-950 p-0.5">{data[0]?.DS}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.MTL + '(Dzn: ' + (data[0]?.BUDGET_PRICE * 12).toFixed(2) + ')'}</td>
          <td className="border border-gray-950 p-0.5">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr> :
        <tr style={{ fontSize: "11px" }} className="font-bold">
          <td className="border border-gray-950 p-0.5">{data[0]?.DS}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.MTL}</td>
          <td className="border border-gray-950 p-0.5">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.5">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr>
      }
    </>
  );
}

export default ReportSubgroup;
