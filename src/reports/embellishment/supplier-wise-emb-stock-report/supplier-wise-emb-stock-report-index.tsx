/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { SupplierWiseEmbStockReportType } from "./supplier-wise-emb-stock-report-type";

function SupplierWiseEmbStockReport() {
  const [data, setData] = useState<SupplierWiseEmbStockReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const buyerId = searchParams.get("buyerId") || 0;
  const supplierId = searchParams.get("supplierId") || 0;
  const styleId = searchParams.get("styleId") || 0;
  const companyId = searchParams.get("companyId") || 1;

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams({
          buyerId: String(buyerId),
          supplierId: String(supplierId),
          styleId: String(styleId),
          companyId: String(companyId),
        });

        const url = `${api.ProductionUrl}/production/EmbReport/SupplierWiseEmbStockReport?${queryParams.toString()}`;

        const res = await axios.get(url);
        if (res.data) {
          setData(res.data);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    getData();
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
      <div>
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default SupplierWiseEmbStockReport;
