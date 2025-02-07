import useApiUrl from "../../../../hooks/use-ApiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "../../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "date-fns";
import ReportSkeleton from "src/components/report-skeleton";

function MonthlyYarnCostingReport() {
  const [data, setData] = useState<IMonthlyYarnCosting[]>([]);
  const [gmtSizes, setGMTSizes] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var knittingHouseId = 0;

  var fromDate = "01-Sep-2024";
  var toDate = "1-Oct-2024";

  if (searchParams.get("knittingHouseId")) {
    knittingHouseId = Number(searchParams.get("knittingHouseId"));
  }

  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Monthly Yarn Costing Report";
  }, []);

  // `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/YarnStoreReport/MonthlyYarnCostingReport?fromDate=${fromDate}&toDate=${toDate}&knittingHouseId=${knittingHouseId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log(res.data);
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
        <ReportSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="container">
        <Report data={data} searchParams={{ toDate, fromDate }}></Report>
      </div>
    </>
  );
}
export default MonthlyYarnCostingReport;
