import React, { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";

import Loader from "../../../../components/loader";
import Report from "./report-oygs";

export default function OutSideYIssueGrcvStatusReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  var fromDate: string | null = "";
  var toDate: string | null = "";
  var isDateWise: string | null = "";
  var buyerId: string | null = "";
  var styleId: string | null = "";
  var poId: string | null = "";
  var partyId: string | null = "";
  var yarnChallan: string | null = "";
  var isBalanceZeroNotShow: string | null = "";
  var styleIds: string | null = "";
  var poIds: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("isDateWise")) {
    isDateWise = searchParams.get("isDateWise");
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
  if (searchParams.get("partyId")) {
    partyId = searchParams.get("partyId");
  }
  if (searchParams.get("yarnChallan")) {
    yarnChallan = searchParams.get("yarnChallan");
  }
  if (searchParams.get("isBalanceZeroNotShow")) {
    isBalanceZeroNotShow = searchParams.get("isBalanceZeroNotShow");
  }

  if (searchParams.get("styleIds")) {
    styleIds = searchParams.get("styleIds");
  }
  if (searchParams.get("poIds")) {
    poIds = searchParams.get("poIds");
  }

  // console.log("fromDate: ", fromDate);
  // console.log("toDate: ", toDate);
  // console.log("isDateWise: ", isDateWise);
  // console.log("buyerId: ", buyerId);
  console.log("styleId: ", styleId);
  // console.log("poId: ", poId);
  // console.log("partyId: ", partyId);
  // console.log("yarnChallan: ", yarnChallan);
  // console.log("isBalanceZeroNotShow: ", isBalanceZeroNotShow);

  useEffect(() => {
    document.title = "Outside yarn issue and grey receive status";
  }, []);

  // console.log(masterData);

  return (
    <Suspense fallback={<Loader />}>
      <Report
        fromDate={fromDate!}
        toDate={toDate!}
        isDateWise={isDateWise!}
        buyerId={buyerId!}
        styleId={styleId!}
        poId={poId!}
        partyId={partyId!}
        yarnChallan={yarnChallan!}
        isBalanceZeroNotShow={isBalanceZeroNotShow!}
        styleIds={styleIds!}
        poIds={poIds!}
      />
    </Suspense>
  );
}
