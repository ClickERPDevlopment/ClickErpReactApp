import useApiUrl from "src/hooks/use-ApiUrl";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportSkeleton from "src/components/report-skeleton";
import DyeingBuyerWiseGreyStockReportDesign from "./dyeing-buyer-wise-grey-stock-report-design";

export default function DyeingBuyerWiseGreyStockReport() {
  const api = useApiUrl();
  const [data, setData] =
    React.useState<DyeingBuyerWiseGreyStockReportType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      var res = await axios.get<DyeingBuyerWiseGreyStockReportType[]>(
        `${api.ProductionUrl}/production/DyeingReport/GetBuyerWiseGreyStockReport`
      );

      console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, [api.ProductionUrl]);
  //up
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {isLoading ? (
          <ReportSkeleton />
        ) : (
          <DyeingBuyerWiseGreyStockReportDesign data={data!} />
        )}
      </div>
    </>
  );
}
