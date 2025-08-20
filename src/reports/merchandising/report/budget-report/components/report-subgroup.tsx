import { BudgetReportType } from "../budget-report-type";

function ReportSubgroup({
  data,
  gorupLength,
  index
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
  gorupLength: number;
  index: number;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QTY),
    0);

  return (
    <>
      {data[0].DS.includes('COST CENTER') ?
        <tr style={{ fontSize: "12px" }} className="font-light">
          {
            index == 0 && <td rowSpan={gorupLength} className="border border-gray-950 p-0.1 font-bold">{data[0]?.DS}</td>
          }
          <td className="border border-gray-950 p-0.1">{data[0]?.MTL + '(Dzn: ' + (data[0]?.BUDGET_PRICE * 12).toFixed(2) + ')'}</td>
          <td className="border border-gray-950 p-0.1 text-center">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr> :
        <tr style={{ fontSize: "12px" }} className="font-light">
          {
            index == 0 && <td rowSpan={gorupLength} className="border border-gray-950 p-0.1 font-bold">{data[0]?.DS}</td>
          }
          <td className="border border-gray-950 p-0.1">{data[0]?.MTL}</td>
          <td className="border bor~der-gray-950 p-0.1 text-center">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.1 text-center">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr>
      }
    </>
  );
}

export default ReportSubgroup;
