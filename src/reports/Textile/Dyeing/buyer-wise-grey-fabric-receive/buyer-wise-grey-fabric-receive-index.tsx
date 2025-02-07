import { useToast } from "src/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import useApiUrl from "src/hooks/use-ApiUrl";
import ReportSkeleton from "src/components/report-skeleton";
import BuyerWiseGreyFabricReceiveReport from "./buyer-wise-grey-fabric-receive-report";

export default function BuyerWiseGreyFabricReceiveIndex() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const api = useApiUrl();

  const [data, setData] = useState<BuyerWiseGreyFabricReceiveType[]>();

  const [isLoading, setIsLoading] = useState(true);

  var rptSearchParams: {
    fromDate: string | null;
    toDate: string | null;
    buyerId: string | null;
    supplierId: string | null;
  } = {
    fromDate: "",
    toDate: "",
    buyerId: "0",
    supplierId: "0",
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
  if (searchParams.get("supplierId")) {
    rptSearchParams.supplierId = searchParams.get("supplierId");
  }
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      var res = await axios.get<BuyerWiseGreyFabricReceiveType[]>(
        // `${api.ProductionUrl}/production/DyeingReport/GetBuyerWiseGreyFabricReceiveReport?fromDate=1-Oct-2024&toDate=30-Oct-2024&buyerId=0&supplierId=0`
        `${api.ProductionUrl}/production/DyeingReport/GetBuyerWiseGreyFabricReceiveReport?fromDate=${rptSearchParams.fromDate}&toDate=${rptSearchParams.toDate}&buyerId=${rptSearchParams.buyerId}&supplierId=${rptSearchParams.supplierId}`
      );
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, [
    api.ProductionUrl,
    rptSearchParams.buyerId,
    rptSearchParams.supplierId,
    rptSearchParams.fromDate,
    rptSearchParams.toDate,
  ]);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {isLoading ? (
          <ReportSkeleton />
        ) : (
          <BuyerWiseGreyFabricReceiveReport data={data ? data : []} />
        )}
      </div>
    </>
  );
}
