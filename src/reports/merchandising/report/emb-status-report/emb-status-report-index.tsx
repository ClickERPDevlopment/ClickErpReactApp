/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { EmbStatusReportEmbDataType } from "./emb-status-emb-data-type";
import { EmbStatusReportStyleDataType } from "./emb-status-report-style-data-type";

function EmbStatusReport() {

  const [embData, setEmbData] = useState<EmbStatusReportEmbDataType[]>(
    []
  );

  const [styleData, setStyleData] = useState<EmbStatusReportStyleDataType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromOpmDate = "01-Jan-20";
  const toOpmDate = "01-Jan-26";
  const fromShipDate = "01-Jan-20";
  const toShipDate = "01-Jan-26";
  const companyId = searchParams.get("companyId") || "0";
  const buyerId = searchParams.get("companyId") || "0";
  const poId = searchParams.get("companyId") || "0";
  const styleId = searchParams.get("companyId") || "0";
  const isEmbDone = searchParams.get("isEmbDone") || false;
  const isEmbNotDone = searchParams.get("isEmbNotDone") || false;
  const isOpmDate = searchParams.get("isOpmDate") || false;
  const isShipDate = searchParams.get("isShipDate") || false;


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {

      try {
        setIsLoading(true);

        const res = await axios.get(`${api.ProductionUrl}/production/MerchReport/EmbStatusReportStyleData`, {
          params: {
            fromOpmDate,
            toOpmDate,
            fromShipDate,
            toShipDate,
            companyId,
            buyerId,
            poId,
            styleId,
            isOpmDate,
            isShipDate
          },
        });

        if (res.data) {
          setStyleData(res.data);
        } else {
          console.warn("No data received:", res);
        }

        const res2 = await axios.get(
          `${api.ProductionUrl}/production/MerchReport/EmbStatusReportEmbData`
        );

        if (res2.data) {
          setEmbData(res2.data);
        } else {
          console.warn("No data received:", res2);
        }

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);


  let filteredStyleData = styleData;

  if (isEmbDone) {
    filteredStyleData = styleData.filter(item => {
      const hasEmb = embData.some(
        emb =>
          emb.STYLEID === item.STYLEID &&
          emb.PONO == item.PONO
      );
      return hasEmb;
    });
  }


  if (isEmbNotDone) {
    filteredStyleData = styleData.filter(item => {
      const hasEmb = embData.some(
        emb =>
          emb.STYLEID === item.STYLEID &&
          emb.PONO == item.PONO
      );
      return !hasEmb;
    });
  }

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report styleData={filteredStyleData} embData={embData}></Report>
      </div>
    </>
  );
}
export default EmbStatusReport;
