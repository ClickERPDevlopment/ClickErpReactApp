/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { BudgetReportType } from "./budget-report-type";

function BudgetReport() {
  const [data, setData] = useState<BudgetReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id = "0";

  if (searchParams.get("id")) {
    id = String(searchParams.get("id"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Budget Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/BudgetReport?id=${id}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, []);


  useEffect(() => {

    setIsLoading(true)

    const getData = async () => {

      setIsLoading(true);

      await axios.get(api + "MerchReport/BudgetReport?id=" + id)
        .then(res => {
          setData(res?.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => { setIsLoading(false) })

      getData();

    }
  }, []);

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
      <div className="min-w-[50%]">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default BudgetReport;
