/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";
import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

function getSizeWiseQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined,
  sizeName: string,
  yarnName:string,
) {
  let qty = 0;
  data?.forEach((element) => {
    if (element.SIZENAME === sizeName) qty += element.QTY;
  });
  return qty === 0 ? "" : yarnName.toUpperCase().includes('LYCRA')?qty.toFixed(2): qty.toFixed(0);
}

function getTotalQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined,
  yarnName:string,
) {
  let qty = 0;
  data?.forEach((element) => {
    qty += element.QTY;
  });

  return qty === 0 ? "" : yarnName.toUpperCase().includes('LYCRA')?qty.toFixed(2): qty.toFixed(0);
}


// function gatAllparts(
//   lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined
// ) {
//   let partsList: string[] = [];
//   if (lstKda) {
//     lstKda.forEach((element) => {
//       if (!partsList.includes(element.FABRIC_PART)) {
//         partsList.push(element.FABRIC_PART);
//       }
//     });
//   }
//   partsList = partsList.sort((a, b) =>
//     a?.toUpperCase().includes("BODY")
//       ? -1
//       : b?.toUpperCase().includes("COLLAR")
//       ? 1
//       : b?.toUpperCase().includes("CUFF")
//       ? 2
//       : 0
//   );
//   return partsList;
//   // return partsList.sort();
// }

export default function KittingDyeingAdviceColorGroup({ lstKda }: prams) {
  const sizeList = useContext(YarnBookingReportContext)?.knittingSizeNameList;
  // const partsList = gatAllparts(lstKda);
  if (lstKda)
    return (
      <>
        <td className="text-center border border-black">
          {lstKda[0].COLORNAME}
        </td>

        {sizeList?.map((s: any) => (
          <td className="text-center border border-black">
            {getSizeWiseQty(lstKda?.filter((f) => f.FABRIC_PART.toUpperCase() !=='RIB'), s, lstKda[0].MTL_NAME)}
          </td>
        ))}

        <td className="text-center border border-black">
          {getTotalQty(lstKda?.filter((f) => f.FABRIC_PART.toUpperCase() !=='RIB'), lstKda[0].MTL_NAME)}
        </td>

        <td className="text-center border border-black">
          {getTotalQty(lstKda?.filter((f) => f.FABRIC_PART.toUpperCase() ==='RIB'), lstKda[0].MTL_NAME)}
        </td>
       
        <td className="text-center border border-black">
          {getTotalQty(lstKda, lstKda[0].MTL_NAME)}
        </td>

      </>
    );
  return <></>;
}
