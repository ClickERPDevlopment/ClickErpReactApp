import React, { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

function getSizeWiseQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined,
  sizeName: string
) {
  var qty = 0;
  data?.forEach((element) => {
    if (element.SIZENAME === sizeName) qty += element.QTY;
  });
  return qty === 0 ? "" : qty.toFixed(2);
}

function getTotalQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined
) {
  var qty = 0;
  data?.forEach((element) => {
    qty += element.QTY;
  });

  return qty === 0 ? "" : qty.toFixed(2);
}

export default function KittingDyeingAdviceColorGroup({ lstKda }: prams) {
  var sizeList = useContext(YarnBookingReportContext)?.knittingSizeNameList;
  if (lstKda)
    return (
      <>
        <td className="text-center border border-black">
          {lstKda[0].COLORNAME}
        </td>
        {sizeList?.map((s) => (
          <td className="text-center border border-black">
            {getSizeWiseQty(lstKda, s)}
          </td>
        ))}
        {lstKda?.map((c, index) => (
          <></>
        ))}
        <td className="text-center border border-black">
          {getTotalQty(lstKda)}
        </td>
      </>
    );
  return <></>;
}
