import useApiUrl from "../../../../hooks/use-ApiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "../../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";

function StyleWiseAvgEfficiencyReport() {
  const [data, setData] = useState<IStyleWiseAvgEfficiencyReport[]>([]);
  const [gmtSizes, setGMTSizes] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var buyerId = 0;
  var styleId = 0;
  var poId = 0;
  var fromDate = "01-Dec-2024";
  var toDate = "30-Dec-2024";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("poId")) {
    poId = Number(searchParams.get("poId"));
  }
  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  // `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/GmtSewingReport/StyleWiseAvgEfficiencyReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, []);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report data={data} searchParams={{ toDate, fromDate }}></Report>
      </div>
    </>
  );
}
export default StyleWiseAvgEfficiencyReport;
