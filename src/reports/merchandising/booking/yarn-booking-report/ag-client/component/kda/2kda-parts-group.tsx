/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";
import KittingDyeingAdviceColorGroup from "./3ksa-color-grou";
import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

function getAllColors(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[]) {
  const colorList: string[] = [];
  if (lstKda) {
    lstKda.forEach((element) => {
      if (!colorList.includes(element.COLORNAME)) {
        colorList.push(element.COLORNAME);
      }
    });
  }
  return colorList;
}


export default function KittingDyeingAdvicePartsGroup({ lstKda }: prams) {
  const sizeList = useContext(YarnBookingReportContext)?.knittingSizeNameList;
  const data = useContext(YarnBookingReportContext);
  const colorList = getAllColors(lstKda!);
  const qty: number = parseFloat(
    lstKda?.reduce((acc, curr) => acc + curr.QTY, 0).toFixed(2) ?? "0"
  );
  if (lstKda)
    return (
      <>
        <thead>
          <tr>
            <th className="border border-black w-12">SL</th>
            <th className="border border-black w-44">Color & Color Code</th>
            {data?.knittingSizeNameList.map((size: any) => (
              <th className="border border-black w-20">{size}</th>
            ))}
            <th className="border border-black">SUB TOTAL</th>
            <th className="border border-black w-20">RIB</th>
            <th className="border border-black">TOTAL (KG)</th>
          </tr>
        </thead>
        <tbody>
          {colorList?.map((color, index) => (
            <tr key={Math.random()}>
              <td className="text-center border border-black">{index + 1}</td>
              <KittingDyeingAdviceColorGroup
                lstKda={lstKda?.filter((f) => f.COLORNAME === color)}
              />
            </tr>
          ))}
          <tr>
            <td colSpan={4+ (sizeList?sizeList.length:0)} className="text-center font-bold">Total</td>
            <td className="text-center border border-black">
              {
                lstKda[0].MTL_NAME.toUpperCase().includes('LYCRA')?qty.toFixed(2): qty.toFixed(0)
              }
            </td>
          </tr>
        </tbody>
      </>
    );
  return <></>;
}
