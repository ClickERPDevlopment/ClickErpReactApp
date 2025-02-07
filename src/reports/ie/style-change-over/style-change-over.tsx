import useApiUrl from "../../../hooks/use-ApiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";

function StyleChangeOverReport() {
  const [data, setData] = useState<IStyleChangeOver[]>([]);
  const [gmtSizes, setGMTSizes] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  var buyerId = 0;
  var styleId = 0;
  var floorId = 0;
  var lineId = 0;
  var fromDate = "01-Jun-0001";
  var toDate = "06-Oct-2025";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("floorId")) {
    floorId = Number(searchParams.get("floorId"));
  }
  if (searchParams.get("lineId")) {
    lineId = Number(searchParams.get("lineId"));
  }
  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  console.log("dd", data);

  useEffect(() => {
    document.title = "Accessories work order";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/ie/StyleChangeOver/StyleChangeReport?buyerId=${buyerId}&styleId=${styleId}&floorId=${floorId}&lineId=${lineId}&fromDate=${fromDate}&toDate=${toDate}`
          )
          .then((res) => {
            console.log(res);
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

  //console.log(data);

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
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default StyleChangeOverReport;
