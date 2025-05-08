import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";
import KittingDyeingAdvicePartsGroup from "./2kda-parts-group";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

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
// function getGrandTotal(
//   lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined
// ) {
//   let qty = 0;
//   lstKda?.forEach((element) => {
//     qty += element.QTY;
//   });
//   return qty;
// }

export default function KittingDyeingAdviceYarnGroup({ lstKda }: prams) {
  // const partsList = gatAllparts(lstKda);
  if (lstKda) {
    return (
      <div>
        <h1 className="font-bold text-base text-left">
          Mtl Name: {lstKda[0]?.MTL_NAME}
        </h1>
        <div className="flex flex-row">
          <table className="w-full border border-black">

            <KittingDyeingAdvicePartsGroup
              key={Math.random()}
              lstKda={lstKda}
            />
          </table>
        </div>
      </div>
    );
  }
  return <></>;
}
