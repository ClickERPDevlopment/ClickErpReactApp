import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import YarnIssueStatusReport from "./yarn-issue-status-report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnIssueStatusReportType } from "./yarn-issue-status-report-type";

export default function YarnIssueStatusReportIndex() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<YarnIssueStatusReportType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiUrl();

  let fromDate: string | null = "";
  let toDate: string | null = "";
  let buyerId: string | null = "";
  let styleId: string | null = "";
  let poId: string | null = "";
  let knittingHouseId: string | null = "";
  let companyId: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("knittingHouseId")) {
    knittingHouseId = searchParams.get("knittingHouseId");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }

  useEffect(() => {
    document.title = "Yarn issue status.";

    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/YarnIssueStatusReport?` +
            `fromDate=${fromDate}&` +
            `toDate=${toDate}&` +
            `buyerId=${buyerId}&` +
            `poId=${poId}&` +
            `styleId=${styleId}&` +
            `knittingHouseId=${knittingHouseId}&` +
            `companyId=${companyId}`
          )
          .then((res) => {
            if (res.data) {
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, companyId, fromDate, knittingHouseId, poId, styleId, toDate]);

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
    <YarnIssueStatusReport data={data} />
  );

}
