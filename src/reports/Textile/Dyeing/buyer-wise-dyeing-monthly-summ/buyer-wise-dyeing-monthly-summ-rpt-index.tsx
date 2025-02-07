import { useToast } from "src/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import useApiUrl from "src/hooks/use-ApiUrl";
import BuyerWiseDyeingMonthlySummaryReport from "./buyer-wise-dyeing-monthly-summ-rpt";
import ReportSkeleton from "src/components/report-skeleton";

export default function BuyerWiseDyeingMonthlySummaryReportIndex() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const api = useApiUrl();
  const [data, setData] = useState<BuyerWiseDyeingMonthlySummaryReportType[]>();
  const [isLoading, setIsLoading] = useState(true);

  var rptSearchParams: {
    fromDate: string | null;
    toDate: string | null;
    buyerId: string | null;
  } = {
    fromDate: "",
    toDate: "",
    buyerId: "0",
  };

  if (searchParams.get("fromDate")) {
    rptSearchParams.fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    rptSearchParams.toDate = searchParams.get("toDate");
  }
  if (searchParams.get("buyerId")) {
    rptSearchParams.buyerId = searchParams.get("buyerId");
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      var res = await axios.get<BuyerWiseDyeingMonthlySummaryReportType[]>(
        `${api.ProductionUrl}/production/DyeingReport/GetBuyerwiseDyeingMonthlySummaryreport?fromDate=${rptSearchParams.fromDate}&toDate=${rptSearchParams.toDate}&buyerId=${rptSearchParams.buyerId}`
      );
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, [
    api.ProductionUrl,
    rptSearchParams.buyerId,
    rptSearchParams.fromDate,
    rptSearchParams.toDate,
  ]);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {isLoading ? (
          <ReportSkeleton />
        ) : (
          <BuyerWiseDyeingMonthlySummaryReport data={data ? data : []} />
        )}
      </div>
    </>
  );
}
