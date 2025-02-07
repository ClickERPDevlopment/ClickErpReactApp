import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "date-fns";
import TableSkeleton from "src/components/table-skeleton";
import useApiUrl from "src/hooks/use-ApiUrl";
import ReportPDF from "./components/report-pdf";

function ShipmentDelayReport() {
  const [data, setData] = useState<IShipmentDelayReport[]>([]);
  const [gmtSizes, setGMTSizes] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var workorderId = 0;
  var buyerId = 0;
  var challanId = 0;
  var isBlockFabric = 0;

  var fromDate = "01-Jan-01";
  var toDate = "01-Jan-40";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }

  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Shipment Delay Report";
  }, []);

  // `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/MerchReport/ShipmentDelayReport?fromDate=${fromDate}&toDate=${toDate}&buyerId=${buyerId}`
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
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <div className="text-right px-10 print:hidden hidden">
          <ReportPDF
            data={data}
            searchParams={{ toDate, fromDate }}
          ></ReportPDF>
        </div>
        <Report data={data} searchParams={{ toDate, fromDate }}></Report>
      </div>
    </>
  );
}
export default ShipmentDelayReport;
