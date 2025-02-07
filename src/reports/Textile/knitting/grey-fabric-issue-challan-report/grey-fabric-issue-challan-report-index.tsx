/* eslint-disable no-var */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios, { AxiosError } from "axios";

//import ReportTable from "./components/report-table";
import useApiUrl from "src/hooks/use-ApiUrl";
import ReportSkeleton from "src/components/report-skeleton";
import { IGreyFabricIssueChallanReport } from "./grey-fabric-issue-challan-report-type";
import ReportTable from "./components/report-table";

export default function GreyFabricIssueChallanReport() {
  const [data, setData] = useState<IGreyFabricIssueChallanReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var buyerId: string | null = "1";
  var poId: string | null = "0";
  var fabricId: string | null = "0";
  var woId: string | null = "0";
  var orderRef: string | null = "";
  var isStockAvl: string | null = "true";
  var fromDate: string | null = "01-Jan-24";
  var toDate: string | null = "01-Jan-25";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
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

  // console.log("buyerId: ", buyerId);
  // console.log("fabricId: ", fabricId);
  // console.log("orderRef: ", orderRef);
  // console.log("isStockAvl: ", isStockAvl);
  //

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/KnittingReport/GreyFabricIssueChallanReport?buyerId=${buyerId}&poId=${poId}&fromDate=${fromDate}&toDate=${toDate}`
          )
          .then((res) => setData(res.data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log((error as AxiosError).message);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, fabricId, isStockAvl, orderRef, woId]);

  // console.log(masterData);
  // console.log("Mydate", data);
  // return (<ReportSkeleton />);
  //

  var uniqueKeys: Set<string> = new Set();

  function groupBy(data: IGreyFabricIssueChallanReport[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface groupedByStyle {
    [key: string]: {
      items: IGreyFabricIssueChallanReport[];
    };
  }

  var groupedByStyle: groupedByStyle = {};

  if (data) {
    groupedByStyle = groupBy(data, ["STYLE"]);
  }

  var uniqueKeysArray: string[] = Array.from(uniqueKeys);

  if (isLoading) {
    return <ReportSkeleton />;
  } else {
    return (
      <>
        <div className="m-3 print:overflow-visible">
          <h3 className="text-center text-slate-700 mb-1 font-bold text-2xl">
            {data[0]?.COMPANY_NAME}
          </h3>
          <h4 className="text-center text-slate-700 mb-1 font-bold text-sm">
            {data[0]?.COMPANY_ADDRESS}
          </h4>
          <h3 className="text-center text-slate-700 mb-3 font-bold text-xl">
            Grey Fabric Issue Challan Report
          </h3>
          <div className="h-auto print:overflow-visible rounded">
            <h4 className="font-semibold p-1">
              <span>Buyer: {data[0]?.BUYER}</span>
              <span className="ml-2">Order: {data[0]?.PO}</span>
            </h4>
            {uniqueKeysArray?.map((key) => (
              <div className="mb-3">
                <ReportTable data={groupedByStyle[key].items}></ReportTable>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
