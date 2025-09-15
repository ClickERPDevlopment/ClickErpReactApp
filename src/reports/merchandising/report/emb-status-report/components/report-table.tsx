/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import { EmbStatusReportEmbDataType } from "../emb-status-emb-data-type";
import moment from "moment";
import React from "react";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
  embData: EmbStatusReportEmbDataType[];
};

function ReportTable({ styleData, embData }: ReportProps) {

  let totalQty = [...new Map(styleData.map(item => [item.EMB_TYPE, item])).values()]
    .reduce((acc, item) => acc + item.QTY, 0);

  let totalWoQty = 0;

  let buyerTotalQty = 0
  let buyerTotalWoQty = 0

  return (
    <>
      {styleData.map((item, index) => {

        let filteredEmbData = embData.filter((emb) => {

          const sameStylePo = emb.STYLEID === item.STYLEID && emb.PONO == item.PONO;

          // const activeCategoryId =
          //   item.PRINT_CATEGORY_ID ||
          //   item.EMB_CATEGORY_ID ||
          //   item.WASH_CATEGORY_ID ||
          //   item.PRINT_EMB_CATEGORY_ID ||
          //   item.SMOCK_CATEGORY_ID ||
          //   0;

          // if (activeCategoryId > 0) {
          //   return (
          //     sameStylePo &&
          //     emb.EMB_CATEGORY_ID != null &&
          //     emb.EMB_CATEGORY_ID > 0 &&
          //     emb.EMB_CATEGORY_ID === activeCategoryId
          //   );
          // }

          return sameStylePo;
        });

        totalWoQty = (filteredEmbData[0]?.WO_QTY || 0);

        buyerTotalQty += item.QTY;
        buyerTotalWoQty += (filteredEmbData[0]?.WO_QTY || 0);

        let balance = totalQty - (filteredEmbData[0]?.WO_QTY || 0);

        return (
          <React.Fragment key={index}>
            <tr key={index}>
              <>
                <td className="border border-gray-950 p-0.5">
                  {item.COMPANY_PREFIX}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.BUYER}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.STYLENO}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.ITEMTYPE}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.PONO}
                </td>
                <td className="border border-gray-950 p-0.5 text-center">
                  {item.QTY}
                </td>
                <td className="border border-gray-950 p-0.5 text-nowrap">
                  {moment(item.DELIVERYDATE).format("DD-MMM-YY")}
                </td>
                <td className="border border-gray-950 p-0.5">{item?.EMB_TYPE}</td>
              </>
              <td className="border border-gray-950 p-0.5">{item?.CATEGORY_NAME}</td>
              <td className="border border-gray-950 p-0.5">{filteredEmbData[0]?.EMBELLISHMENT_ORDERNO}</td>
              <td className="border border-gray-950 p-0.5 text-center">{filteredEmbData[0]?.WO_QTY}</td>
              <td className="border border-gray-950 p-0.5 text-center">{balance}</td>
              <td className="border border-gray-950 p-0.5 max-w-md">
                {item.COLORNAME}
              </td>
            </tr>

            {filteredEmbData.slice(1).map((embItem, embIndex) => {

              balance -= embItem.WO_QTY;
              totalWoQty += embItem.WO_QTY;
              buyerTotalWoQty += embItem.WO_QTY;

              return (
                <tr key={embIndex + 1}>
                  <td className="border border-gray-950 p-0.5">{item.COMPANY_PREFIX}</td>
                  <td className="border border-gray-950 p-0.5">{item.BUYER}</td>
                  <td className="border border-gray-950 p-0.5">{item.STYLENO}</td>
                  <td className="border border-gray-950 p-0.5">{item.ITEMTYPE}</td>
                  <td className="border border-gray-950 p-0.5">{item.PONO}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{item.QTY}</td>
                  <td className="border border-gray-950 p-0.5 text-nowrap">
                    {moment(item.DELIVERYDATE).format("DD-MMM-YY")}
                  </td>
                  <td className="border border-gray-950 p-0.5">{item?.EMB_TYPE}</td>
                  <td className="border border-gray-950 p-0.5">{item.CATEGORY_NAME}</td>
                  <td className="border border-gray-950 p-0.5">{embItem.EMBELLISHMENT_ORDERNO}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{embItem.WO_QTY}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{balance}</td>
                  <td className="border border-gray-950 p-0.5 max-w-md">{item.COLORNAME}</td>
                </tr>
              );
            })}


          </React.Fragment>
        );
      })}
      {
        <tr className="bg-lime-50 font-bold">
          <td colSpan={5} className="border border-gray-950 p-0.5 text-center">{styleData[0]?.BUYER} Total</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalQty}</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalWoQty}</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalQty - buyerTotalWoQty}</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
        </tr>
      }

    </>
  );
}

export default ReportTable;
