import useApiUrl from "../../../../hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "../../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { SewingProductionStatusReportType } from "./sewing-production-status-report-type";
import { SewingHourlyProductionStatusReportType } from "./sewing-hourly-production-status-report-type";

function SewingProductionStatusReport() {
  const [data, setData] = useState<SewingProductionStatusReportType[]>([]);
  const [sewingHourlyProductionData, setSewingHourlyProductionData] = useState<SewingHourlyProductionStatusReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const companyId: number = Number(searchParams.get("companyId")) || 0;
  const dtDate: string = searchParams.get("dtDate") || "06-Jul-25";

  useEffect(() => {
    document.title = "Report";
  }, []);

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GmtSewingReport/SewingProductionStatusReport`,
          {
            params: {
              dtDate,
              companyId,
            },
          }
        );

        if (response.data) {
          setData(response.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }

    }

    getData();
  }, []);



  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GmtSewingReport/SewingHourlyProductionStatusReport`,
          {
            params: {
              dtDate,
              companyId,
            },
          }
        );

        if (response.data) {
          setSewingHourlyProductionData(response.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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
      <div className="min-w-[70%]">
        <Report data={data} sewingHourlyProductionData={sewingHourlyProductionData}></Report>
      </div>
    </>
  );
}
export default SewingProductionStatusReport;
