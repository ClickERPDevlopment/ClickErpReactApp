import { InternalProductPlacementSheetSummaryReportType } from "../internal-product-placement-sheet-summary-report-type";

function ReportSummary({
  data,
  index,
}: {
  data: InternalProductPlacementSheetSummaryReportType[];
  firstHeader: string[] | null;
  index: number;
}) {
  const totalOrderQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.ORDERQTY),
    0
  );

  return (
    <>
      {
        <tr className="text-center">
          <td className="border border-gray-950 p-0.1 font-bold">
            {index + 1}
          </td>
          <td className="border border-gray-950 p-0.1 font-bold">
            {data[0]?.ITEMTYPE}
          </td>
          <td className="border border-gray-950 p-0.1 font-bold">
            {totalOrderQuantiy && totalOrderQuantiy.toFixed(3)}
          </td>
          <td className="border border-gray-950 p-0.1 font-bold">
            {new Set(data?.map(item => item?.STYLEID)).size}
          </td>
          <td className="border border-gray-950 p-0.1 font-bold">
            {new Set(data?.map(item => item?.NOCOLOR)).size}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportSummary;
