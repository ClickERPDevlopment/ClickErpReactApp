/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";

function Report({
  data,
}: {
  data: PrintEmbellishmentQualityReportMasterType[];
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PrintEmbellishmentQualityReportMasterType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: PrintEmbellishmentQualityReportMasterType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Date",
    "Party Name",
    "Machine No.",
    "Buyer",
    "Style",
    "Order No.",
    "Color",
  ];


  const secondHeader = [
    "Check Qty",
    "Defect Qty.",
    "Alter Qty.",
    "Total Ok",
    "Remarks",
  ];

  function getUniqueDefectHeaders(
    masters: PrintEmbellishmentQualityReportMasterType[]
  ): string[] {
    const defectSet = new Set<string>();

    masters.forEach(master => {
      master.Details.forEach(detail => {
        detail.Defects.forEach(defect => {
          defectSet.add(defect.DefectName);
        });
      });
    });

    return Array.from(defectSet);
  }


  function getDefectGrandTotalsByKey(
    masters: PrintEmbellishmentQualityReportMasterType[]
  ): Record<string, number> {
    return masters.reduce((acc, master) => {
      master.Details.forEach(detail => {
        detail.Defects.forEach(defect => {
          acc[defect.DefectName] = (acc[defect.DefectName] || 0) + defect.Qty;
        });
      });
      return acc;
    }, {} as Record<string, number>);
  }

  const defectHeader = getUniqueDefectHeaders(data);
  const defectGrandTotals = getDefectGrandTotalsByKey(data);


  const totalCheckQty = data.reduce((sum, master) => {
    return sum + master.Details.reduce((detailSum, detail) => detailSum + (detail.CheckQty || 0), 0);
  }, 0);

  const totalDefectQty = data.reduce((sum, master) => {
    return sum + master.Details.reduce((detailSum, detail) => detailSum + (detail.DefectQty || 0), 0);
  }, 0);
  const totalAlterQty = data.reduce((sum, master) => {
    return sum + master.Details.reduce((detailSum, detail) => detailSum + (detail.RectifyQty || 0), 0);
  }
    , 0);

  const totalOkQty = data.reduce((sum, master) => {
    return sum + master.Details.reduce((detailSum, detail) => detailSum + (detail.QcPassedQty || 0), 0);
  }, 0);



  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
              )}
              <th colSpan={defectHeader.length} className="border border-gray-950 p-0.5">{data[0]?.EmbType} Defect Points</th>
              {secondHeader?.map((item) =>
                <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
            <tr>
              {defectHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                defectHeader={defectHeader}
              ></ReportTable>
            ))}
            <tr className="font-bold bg-indigo-200 text-center" style={{ fontSize: "12px" }}>
              <td colSpan={firstHeader.length} className="text-right font-bold border border-gray-950 p-0.5">Grand Total</td>
              {

                defectHeader.map(defect => (
                  <td key={defect} className="border border-gray-950 p-0.5">{defectGrandTotals[defect] ?? 0}</td>
                ))

              }
              <td className="border border-gray-950 p-0.5">{totalCheckQty}</td>
              <td className="border border-gray-950 p-0.5">{totalDefectQty}</td>
              <td className="border border-gray-950 p-0.5">{totalAlterQty}</td>
              <td className="border border-gray-950 p-0.5">{totalOkQty}</td>
              <td className="border border-gray-950 p-0.5"></td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Report;
