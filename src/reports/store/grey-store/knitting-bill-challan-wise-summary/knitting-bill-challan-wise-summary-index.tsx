import useApiUrl from "src/hooks/use-ApiUrl";
import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router";
import ReportSkeleton from "src/components/report-skeleton";
import KnittingBillChallanWiseSummaryReport from "./knitting-bill-challan-wise-summary-report";
import { KnittingBillChallanWiseSummaryType } from "./knitting-bill-challan-wise-summary-type";

export default function KnittingBillChallanWiseSummaryReportIndex() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] =
    React.useState<KnittingBillChallanWiseSummaryType[]>();
  const api = useApiUrl();
  const [searchParams] = useSearchParams();

  var poId: string | null = "";
  var styleId: string | null = "";

  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }

  React.useEffect(() => {
    const getData = async () => {
      return (
        await axios.get(
          `${api.ProductionUrl}/production/GreyStoreReport/KnittingBillChallanWiseSummaryReport?poId=${poId}&styleId=${styleId}`
        )
      ).data;
    };
    getData().then((res) => setData(res));
  }, [api.ProductionUrl, poId, styleId]);

  return (
    <>
      {isLoading ? (
        <>
          <ReportSkeleton />
        </>
      ) : data ? (
        <KnittingBillChallanWiseSummaryReport data={data!} />
      ) : null}
    </>
  );
}
