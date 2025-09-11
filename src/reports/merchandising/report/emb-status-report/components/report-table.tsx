/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import { EmbStatusReportEmbDataType } from "../emb-status-emb-data-type";
import moment from "moment";
import React from "react";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
  embData: EmbStatusReportEmbDataType[];
};


// &&
//   (emb.EMB_CATEGORY_ID === item.PRINT_CATEGORY_ID ||
//     emb.EMB_CATEGORY_ID === item.EMB_CATEGORY_ID ||
//     emb.EMB_CATEGORY_ID === item.WASH_CATEGORY_ID ||
//     emb.EMB_CATEGORY_ID === item.PRINT_EMB_CATEGORY_ID ||
//     emb.EMB_CATEGORY_ID === item.SMOCK_CATEGORY_ID)


function ReportTable({ styleData, embData }: ReportProps) {

  let totalQty = 0;
  let totalWoQty = 0;
  let buyerExist = 0;

  return (
    <>
      {styleData.map((item, index) => {
        const filteredEmbData = embData.filter(
          (emb) =>
            emb.STYLEID === item.STYLEID && emb.PONO == item.PONO &&
            (emb.EMB_CATEGORY_ID === item.PRINT_CATEGORY_ID ||
              emb.EMB_CATEGORY_ID === item.EMB_CATEGORY_ID ||
              emb.EMB_CATEGORY_ID === item.WASH_CATEGORY_ID ||
              emb.EMB_CATEGORY_ID === item.PRINT_EMB_CATEGORY_ID ||
              emb.EMB_CATEGORY_ID === item.SMOCK_CATEGORY_ID)
        );

        if (filteredEmbData.length === 0) {
          return null;
        };

        let balance = item.QTY;
        totalQty += item.QTY;
        buyerExist = 1;

        return (
          <React.Fragment key={index}>

            {filteredEmbData.map((embItem, embIndex) => {

              balance -= embItem.WO_QTY;

              totalWoQty += embItem.WO_QTY;

              return (
                <tr key={embIndex}>
                  {embIndex === 0 && (
                    <>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.COMPANY_NAME}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.STYLENO}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.ITEMTYPE}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.PONO}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.COLORNAME}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5">
                        {item.QTY}
                      </td>
                      <td rowSpan={filteredEmbData.length} className="border border-gray-950 p-0.5 text-nowrap">
                        {moment(item.DELIVERYDATE).format("DD-MMM-YY")}
                      </td>
                    </>
                  )}
                  <td className="border border-gray-950 p-0.5">{embItem.EMB_TYPE}</td>
                  <td className="border border-gray-950 p-0.5">{embItem.EMB_CATEGORY}</td>
                  <td className="border border-gray-950 p-0.5">{embItem.EMBELLISHMENT_ORDERNO}</td>
                  <td className="border border-gray-950 p-0.5">{embItem.WO_QTY}</td>
                  <td className="border border-gray-950 p-0.5">{balance}</td>
                </tr>
              );
            })}
          </React.Fragment>
        );
      })}
      {
        buyerExist == 1 && <tr className="bg-lime-50">
          <td colSpan={5} className="border border-gray-950 p-0.5 text-center">{styleData[0]?.BUYER}</td>
          <td className="border border-gray-950 p-0.5">{totalQty}</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{totalWoQty}</td>
          <td className="border border-gray-950 p-0.5">{totalQty - totalWoQty}</td>
        </tr>
      }

    </>
  );
}

export default ReportTable;
