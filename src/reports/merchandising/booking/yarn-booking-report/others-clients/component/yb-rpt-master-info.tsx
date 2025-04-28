import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  YarnBookingReportDto_MasterData,
  YarnBookingReportDto_SpecialTreatment,
} from "../../yb-rpt-type";
import useApiUrl from "@/hooks/use-ApiUrl";

type params = {
  masterData: YarnBookingReportDto_MasterData;
  lstSpecialTreatment: YarnBookingReportDto_SpecialTreatment[];
};
export default function YarnBookingMasterInfo({
  masterData,
  lstSpecialTreatment,
}: params) {
  const [imageSrc, setImageSrc] = useState<string>();
  const api = useApiUrl();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${masterData?.STYLEID}`
        );
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [api.ProductionUrl, masterData?.STYLEID]);

  let specialTreatment = "";
  lstSpecialTreatment.forEach((element) => {
    specialTreatment +=
      specialTreatment == "" ? element.TREATMENT : ", " + element.TREATMENT;
  });

  return (
    <div className="mt-5">
      <div className="flex gap-24 mt-3">
        <ul className="basis-4/12">
          <li className="flex">
            <label className="w-28 font-bold">Order/Job No.</label>
            <span>:{masterData?.PONO}</span>
          </li>
          <li className="flex">
            <label className="w-28 font-bold">Style</label>
            <span>:{masterData?.STYLENAME}</span>
          </li>
          <li className="flex">
            <label className="w-28 font-bold">Buyer Name</label>
            <span>:{masterData?.BUYER_NAME}</span>
          </li>
          <li className="flex">
            <label className="w-28 font-bold">Revise</label>
            <span>:{masterData?.REVISED_NO}</span>
          </li>
        </ul>
        <ul className="basis-4/12">
          <li className="flex">
            <label className="w-28 font-bold">Order Qty</label>
            <span>:{masterData?.ORDER_QTY}</span>
          </li>
          <li className="flex">
            <label className="w-28 font-bold">Season</label>
            <span>:{masterData?.SESSIONNO}</span>
          </li>
        </ul>
        <div className="basis-4/12 flex justify-end">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="GMT image"
              className="max-w-[200px] border h-auto"
            />
          ) : (
            <Skeleton width={200} height={200} />
          )}
        </div>
      </div>
      <div className="flex gap-5 mt-4 ">
        {masterData?.IS_OPEN_DIA == "1" ? (
          <div className="w-auto p-1 border-2 border-black">
            <h4>OPEN FINISH</h4>
          </div>
        ) : (
          ""
        )}

        {specialTreatment ? (
          <div className="w-auto border-2 border-black p-1">
            <h4>{specialTreatment}</h4>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
