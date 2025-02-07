import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { GetOrderWiseFFAllocationData } from "./owffdr-data";
import Report from "./report-owffdr";
import ReportSkeleton from "../../../../components/report-skeleton";

export default function OrderWiseFinishFabricDeliveryReport() {
  const [allocation, setAllocation] = useState<
    OrderWiseFFDeliveryAllocationDto[]
  >([]);
  const [allocationSummary, setallocationSummary] = useState<
    OrderWiseFFDeliveryAllocationDto[]
  >([]);

  const [booking, setBooking] = useState<OrderWiseFFDeliveryBookingDto[]>([]);
  const [bookingSummary, setbookingSummary] = useState<
    OrderWiseFFDeliveryBookingDto[]
  >([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  var buyerId: string | null = "";
  var styleId: string | null = "";
  var poId: string | null = "";
  var seasonId: string | null = "";
  var colorId: string | null = "";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("colorId")) {
    colorId = searchParams.get("colorId");
  }
  if (searchParams.get("seasonId")) {
    seasonId = searchParams.get("seasonId");
  }

  console.log("buyerId: ", buyerId);
  console.log("styleId: ", styleId);
  console.log("poId: ", poId);
  console.log("colorId: ", colorId);
  console.log("seasonId: ", seasonId);

  useEffect(() => {
    document.title = "Order wise finish fabric delivery report";

    async function getData() {
      try {
        setIsLoading(true);

        await GetOrderWiseFFAllocationData({
          buyerId,
          styleId,
          poId,
          colorId,
          seasonId,
        }).then((r) => {
          console.log(r);
          setBooking(r.booking);
          setbookingSummary(r.bookingSummary);

          setAllocation(r.allocation);
          setallocationSummary(r.allocationSummary);
        });

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
    getData();
  }, []);

  /*
    0.Report
    1. po-color wise group
    2. summary table
    2.1. fabric wise group row
    3. Details
    4. Batch Details
  */

  return (
    <>
      {isLoading ? (
        <ReportSkeleton />
      ) : (
        <Report
          lstBooking={booking}
          lstAllocation={allocation}
          lstAllocationSummary={allocationSummary}
          lstBookingSummary={bookingSummary}
        />
      )}
    </>
  );
}
