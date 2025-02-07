import useApiUrl from "../../../../hooks/use-ApiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import YarnBookingReport from "./yarn-booking-rpt";
import ReportSkeleton from "../../../../components/report-skeleton";

export default function YarnBookingReportIndex() {
  const [data, setData] = useState<YarnBookingReportDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const api = useApiUrl();

  var buyerId: string | null = "";
  var poId: string | null = "";
  var poNo: string | null = "";
  var styleId: string | null = "";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("poNo")) {
    poNo = searchParams.get("poNo");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }

  // console.log("buyerId: ", buyerId);
  // console.log("poId: ", poId);
  // console.log("poNo: ", poNo);
  // console.log("styleId: ", styleId);

  useEffect(() => {
    document.title = "Yarn consumption";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/Booking/YarnBookingReport?buyerId=${buyerId}&poId=${poId}&poNo=${poNo}&styleId=${styleId}`
          )
          .then((res) => {
            if (res.data) {
              var result = res.data;
              setData(result);
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log("error ", m));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <ReportSkeleton />
        </div>
      ) : (
        <YarnBookingReport data={data!} />
      )}
    </>
  );
}
