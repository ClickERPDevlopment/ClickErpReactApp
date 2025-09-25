/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import moment from "moment";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";

interface ReportTableProps {
  data: PrintEmbellishmentQualityReportMasterType[];
  defectHeader: string[];
}

const ReportTable: React.FC<ReportTableProps> = ({ data, defectHeader }) => {
  return (
    <>
      {data.map((item, index) =>
        item.Details.map((detail, detailIndex) => (
          <tr key={`${index}-${detailIndex}`} style={{ fontSize: "12px" }}>
            {/* First header columns */}
            <td className="border border-gray-950 p-0.5 font-bold">
              {item.EntryDate ? moment(item.EntryDate).format("DD-MMM-YY") : ""}
            </td>
            <td className="border border-gray-950 p-0.5 font-bold">{item.Party}</td>
            <td className="border border-gray-950 p-0.5 font-bold">{item.WorkStation}</td>
            <td className="border border-gray-950 p-0.5 font-bold">{detail.Buyer || detail.OsBuyer}</td>
            <td className="border border-gray-950 p-0.5 font-bold">{detail.Style || detail.OsStyle}</td>
            <td className="border border-gray-950 p-0.5 font-bold">{detail.Po || detail.OsPo}</td>
            <td className="border border-gray-950 p-0.5 font-bold">{detail.Color}</td>

            {/* Defect columns dynamically */}
            {defectHeader.map((defectName, defectIndex) => {
              const defect = detail.Defects.find(d => d.DefectName === defectName);
              return (
                <td key={defectIndex} className="border border-gray-950 p-0.5 font-bold text-center">
                  {defect ? defect.Qty : 0}
                </td>
              );
            })}

            {/* Second header columns */}
            <td className="border border-gray-950 p-0.5 font-bold text-center">{detail.CheckQty || 0}</td>
            <td className="border border-gray-950 p-0.5 font-bold text-center">{detail.DefectQty || 0}</td>
            <td className="border border-gray-950 p-0.5 font-bold text-center">{detail.RectifyQty || 0}</td>
            <td className="border border-gray-950 p-0.5 font-bold text-center">{detail.QcPassedQty || 0}</td>
            <td className="border border-gray-950 p-0.5 font-bold text-center">{item.Remarks || ""}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default ReportTable;
