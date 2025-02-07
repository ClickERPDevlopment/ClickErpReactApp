import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios, { AxiosError } from "axios";

import useApiUrl from "../../hooks/use-ApiUrl";
import ReportSkeleton from "../../components/report-skeleton";
import {
  FinishFabricAllocatinReportDetailsType,
  FinishFabricAllocatinReportMasterType,
} from "./finish-fabric-allocation-report-type";
import FFATable from "./components/ffa-table";

export default function FinishFabricAllocationReport() {
  const [masterData, setMasterData] = useState<
    FinishFabricAllocatinReportMasterType[]
  >([]);
  const [detailsData, setDetailsData] = useState<
    FinishFabricAllocatinReportDetailsType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var buyerId: string | null = "0";
  var fabricId: string | null = "0";
  var woId: string | null = "0";
  var orderRef: string | null = "";
  var isStockAvl: string | null = "true";
  var fromDate: string | null = "01-Jan-24";
  var toDate: string | null = "01-Jan-25";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("fabricId")) {
    fabricId = searchParams.get("fabricId");
  }
  if (searchParams.get("woId")) {
    woId = searchParams.get("woId");
  }
  if (searchParams.get("orderRef")) {
    orderRef = searchParams.get("orderRef");
  }
  if (searchParams.get("isStockAvl")) {
    isStockAvl = searchParams.get("isStockAvl");
  }

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }

  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }

  console.log("buyerId: ", buyerId);
  console.log("fabricId: ", fabricId);
  console.log("orderRef: ", orderRef);
  console.log("isStockAvl: ", isStockAvl);

  console.log("FFFFFFFF", toDate);

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/FinishFabricStore/FinishFabricAllocationReportMaster?buyerId=${buyerId}&fabricId=${fabricId}&orderRef=${orderRef}&isStockAvl=${isStockAvl}&woId=${woId}&fromDate=${fromDate}&toDate=${toDate}`
          )
          .then((res) => setMasterData(res.data));

        await axios
          .get(
            `${api.ProductionUrl}/production/FinishFabricStore/FinishFabricAllocationReportDetails?buyerId=${buyerId}&fabricId=${fabricId}&orderRef=${orderRef}&isStockAvl=${isStockAvl}&woId=${woId}`
          )
          .then((res) => setDetailsData(res.data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log((error as AxiosError).message);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, fabricId, isStockAvl, orderRef, woId]);

  //   console.log(masterData);
  console.log(detailsData);
  // return (<ReportSkeleton />);
  if (isLoading) {
    return <ReportSkeleton />;
  } else {
    return (
      <>
        <div className="m-3 print:overflow-visible">
          <h3 className="text-center text-slate-700 m-3 font-bold text-2xl">
            {masterData[0]?.COMPANY_NAME}
          </h3>
          <h3 className="text-center text-slate-700 m-3 font-bold text-xl">
            Finish Fabric Allocation Report
          </h3>
          <div className="border h-auto print:overflow-visible rounded">
            <table className="border-collapse table-fixed rounded">
              {masterData.map((mData) => (
                <FFATable
                  key={Math.random()}
                  masterData={mData}
                  detailsData={detailsData.filter(
                    (dData) =>
                      dData.BLOCK_WORK_ORDER_ID === mData.WO_ID &&
                      dData.FABRIC_ID === mData.FABRIC_ID &&
                      dData.STOCK_FABRIC_COLOR_ID === mData.GMT_COLOR_ID &&
                      dData.ORDER_REFERENCE === mData.ORDER_REFERENCE
                  )}
                />
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }
}
