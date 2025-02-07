import moment from "moment";
import React from "react";
import ReportTotal from "./report-total";

interface props {
  yarnIssue: outsideYIssueGRcvStatus_YarnIssue[];
  greyRcv: outsideYIssueGRcvStatus_GreyRcv[];
  loseYanRcv: outsideYIssueGRcvStatus_LoseyarnRcv[];
}

function getRowSpan(
  yarn: outsideYIssueGRcvStatus_YarnIssue[],
  fabric: outsideYIssueGRcvStatus_GreyRcv[]
) {
  return yarn.length > fabric.length ? yarn.length : fabric.length;
}

export default function YarnChallanWiseGroup({
  yarnIssue,
  greyRcv,
  loseYanRcv,
}: props) {
  function getTotalYarnIssueQty() {
    let qty: number = 0;
    yarnIssue.forEach((element) => {
      qty += element.QUANTITY;
    });
    return qty.toFixed(2);
  }
  function getTotalYarnReturnQty() {
    let qty: number = 0;
    yarnIssue.forEach((element) => {
      qty += element.RETURN_QUANTITY;
    });
    return qty.toFixed(2);
  }

  function getTotalGreyFabricRcvQty() {
    let qty: number = 0;
    greyRcv.forEach((element) => {
      qty += element.GREY_WEIGHT;
    });
    return qty.toFixed(2);
  }

  function getLoseYarnQty() {
    let qty: number = 0;
    loseYanRcv.forEach((element) => {
      qty += element.QUANTITY;
    });
    return qty.toFixed(2);
  }

  const getGreyRcvBalanceQty = () => {
    let yarnQty: any = getTotalYarnIssueQty();
    let yarnReturnQty: any = getTotalYarnReturnQty();
    let greyQty: any = getTotalGreyFabricRcvQty();
    let loseYarn: any = getLoseYarnQty();

    return (yarnQty - greyQty - loseYarn - yarnReturnQty).toFixed(2);
  };

  return (
    <>
      {/* this is the first row */}
      <tr>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {moment(yarnIssue[0]?.CHALLAN_DATE.toString()).format("DD-MMM-YYYY")}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {yarnIssue[0]?.CHALLAN_NO}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {yarnIssue[0]?.BUYER}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {yarnIssue[0]?.PO}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {yarnIssue[0]?.YARN}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {yarnIssue[0]?.YARN_BRAND}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {yarnIssue[0]?.YARN_LOT_NO}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {yarnIssue[0]?.QUANTITY}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {yarnIssue[0]?.RETURN_QUANTITY}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {moment(greyRcv[0]?.RCV_CHALLAN_DATE).format("DD-MMM-YYYY")}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {greyRcv[0]?.RCV_CHALLAN}
        </td>
        <td className="border border-black text-[8px] text-center p-1">
          {greyRcv[0]?.GREY_WEIGHT}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {getLoseYarnQty()}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {getTotalGreyFabricRcvQty()}
        </td>
        <td
          className="border border-black text-[8px] text-center p-1"
          rowSpan={getRowSpan(yarnIssue, greyRcv)}
        >
          {getGreyRcvBalanceQty()}
        </td>
      </tr>
      {/* end first row */}

      {/* other rows with in yarn total rows */}

      {yarnIssue
        ?.filter((d, i) => i !== 0)
        .map((y, yi) => (
          <tr key={Math.random()}>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.YARN}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.YARN_BRAND}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.YARN_LOT_NO}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.QUANTITY}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.RETURN_QUANTITY}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {greyRcv[yi + 1] == null
                ? ""
                : moment(greyRcv[yi + 1]?.RCV_CHALLAN_DATE).format(
                    "DD-MMM-YYYY"
                  )}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {greyRcv[yi + 1]?.RCV_CHALLAN}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {greyRcv[yi + 1]?.GREY_WEIGHT}
            </td>
          </tr>
        ))}
      {/* end other rows with in yarn total rows */}

      {/* other rows where grey rcv all rows not yet show. */}
      {greyRcv
        ?.filter((d, i) => i >= yarnIssue.length)
        .map((y, yi) => (
          <tr key={Math.random()}>
            <td className="border border-black text-[8px] text-center p-1"></td>
            <td className="border border-black text-[8px] text-center p-1"></td>
            <td className="border border-black text-[8px] text-center p-1"></td>
            <td className="border border-black text-[8px] text-center p-1"></td>
            <td className="border border-black text-[8px] text-center p-1"></td>
            <td className="border border-black text-[8px] text-center p-1">
              {moment(y?.RCV_CHALLAN_DATE).format("DD-MMM-YYYY")}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.RCV_CHALLAN}
            </td>
            <td className="border border-black text-[8px] text-center p-1">
              {y?.GREY_WEIGHT}
            </td>
          </tr>
        ))}
      {/* other rows where grey rcv all rows not yet show. */}

      {/* subTotal */}
      <ReportTotal
        yarnIssue={yarnIssue}
        greyRcv={greyRcv}
        loseYanRcv={loseYanRcv}
        title="Sub Total"
      />
      {/*           
      <tr>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          Total
        </td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          {getTotalYarnIssueQty()}
        </td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1"></td>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          {getTotalGreyFabricRcvQty()}
        </td>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          {getLoseYarnQty()}
        </td>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          {getTotalGreyFabricRcvQty()}
        </td>
        <td className="border border-black text-[8px] text-center p-1 font-bold">
          {getGreyRcvBalanceQty()}
        </td>
      </tr> */}
      {/* end subTotal */}
    </>
  );
}
