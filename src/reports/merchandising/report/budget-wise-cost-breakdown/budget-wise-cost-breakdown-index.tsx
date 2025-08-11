/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

import useApiUrl from "../../../../hooks/use-ApiUrl";
import TableSkeleton from "../../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IBudgetWiseCostBreakdown } from "./components/IBudgetWiseCostBreakdown";
import PoStyleGroupSection from "./components/buyer-group-section";
import TotalRow from "./components/total-row";
import React from "react";
import Summary from "./components/summary";

export type ICommission = {
  commissinType: string,
  poid: number,
  styelid: number,
  amount: number
}

export default function BudgetWiseCostBreakdownIndex() {
  const [data, setData] = useState<IBudgetWiseCostBreakdown>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  React.useEffect(() => localStorage.removeItem('commissions'), [0])

  let isOpmWise: string | null = "";
  let fromOpmDate: string | null = "";
  let toOpmDate: string | null = "";
  let companyId: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let styleId: string | null = "";
  let salesContactId: string | null = "";

  if (searchParams.get("isOpmWise")) {
    isOpmWise = searchParams.get("isOpmWise");
  }
  if (searchParams.get("fromOpmDate")) {
    fromOpmDate = searchParams.get("fromOpmDate");
  }
  if (searchParams.get("toOpmDate")) {
    toOpmDate = searchParams.get("toOpmDate");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }
  if (searchParams.get("salesContactId")) {
    salesContactId = searchParams.get("salesContactId");
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Budget-Wise Cost Breakdown";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/BudgetWiseCostBreakdown?isOpmWise=${isOpmWise}&fromOpmDate=${fromOpmDate}&toOpmDate=${toOpmDate}&companyId=${companyId}&buyerId=${buyerId}&poId=${poId}&styleId=${styleId}&salesContactId=${salesContactId}`
          )
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              setData(res.data);
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const fabricProcessType = [...new Set(data?.BudgetWiseCostBreakdownDto_FabricProcessCost.map(item => item.PROCESS_NAME))];
  const gmtProcessType = [...new Set(data?.BudgetWiseCostBreakdownDto_GmtOtherCost.map(item => item.PROCESS_NAME))];
  const commissionType = [...new Set(data?.BudgetWiseCostBreakdownDto_Commission.map(item => item.COST_NAME))];

  const uniquePoStyle = Array.from(
    new Map(
      data?.BudgetWiseCostBreakdownDto_Booking.filter(item => item.PO_ID && item.STYLE_ID)
        .map(item => [
          `${item.PO_ID}__${item.STYLE_ID}`, // composite key
          { PO_ID: item.PO_ID, STYLE_ID: item.STYLE_ID }
        ])
    ).values()
  );



  const commissions: ICommission[] = [];

  const updateCommission = (com: ICommission) => {
    const stored = localStorage.getItem('commissions');
    const d: ICommission[] = stored ? JSON.parse(stored) : [];

    d.push(com);

    const uniqueFabricCombos = Array.from(
      new Map(
        d
          .filter(item => item.poid && item.styelid && item.commissinType && item.amount)
          .map(item => [
            `${item.poid}__${item.styelid}__${item.commissinType}__${item.amount}`,
            { poid: item.poid, styelid: item.styelid, commissinType: item.commissinType, amount: item.amount }
          ])
      ).values()
    );

    localStorage.setItem('commissions', JSON.stringify(uniqueFabricCombos));
  };

  console.log('commissions', commissions);
  return (
    <>
      {isLoading ? (
        <>
          <h3 className=" text-center p-1 m-4 text-3xl font-bold">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </>
      ) : (

        !data ?
          <div className="print:m-0 overflow-hidden  bg-sky-100 border-t border-b border-sky-500 text-sky-700 px-4 py-3 mt-16" role="alert">
            <p className="font-bold text-xl">Informational message</p>
            <p className="text-base">No Data Found. Please check"Style Wise Cost Breakdown" Entry.</p>
          </div>
          :
          <div className="">

            <div className="flex flex-col">
              <h1 className="text-center font-bold text-2xl">{data?.CompanyName}</h1>
              <h1 className="text-center font-bold text-sm">{data?.CompanyAddress}</h1>
              <h1 className="text-center font-bold text-lg mt-5">BUDGET WISE COST BEAKDOWN</h1>
              <h5 className="text-center font-bold text-base">SALES CONTRACT NO : ###</h5>
            </div>

            <div className="border border-gray-500 rounded-md my-5 max-h-screen/20 overflow-auto m-1">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="text-balance text-center p-1 border-r border-gray-500">SL/NO</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 min-w-28">Buyer</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 min-w-28">STYLE </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 min-w-28">JOB NO/PO</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Sub PO NO</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">IMAGE </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">ORDER QTY PCS</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">ITEMS NAME</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 min-w-48">MAIN FABRIC FABRICATION</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">MAIN FABRIC PRICE PER UNIT</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">UOM</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">PO  FOB </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">MASTER L/C VALUE [FOB*OrderQty]</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">TOTAL MAIN FABRIC VALUE  </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">POCKETING /OTHER FABRIC</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">ACCESSORIES </th>
                    {fabricProcessType.map((item, i) =>
                      <th className="text-balance text-center p-1 border-r border-gray-500" key={i}>{item}</th>
                    )}
                    {/* <th className="text-balance text-center p-1 border-r border-gray-500">WASH COST</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">TEST COST </th> */}
                    {gmtProcessType.map((item, i) =>
                      <th className="text-balance text-center p-1 border-r border-gray-500" key={i}>{item}</th>
                    )}
                    {/* <th className="text-balance text-center p-1 border-r border-gray-500">Total CM Achieve</th> */}
                    {commissionType.map((item, i) =>
                      <th className="text-balance text-center p-1 border-r border-gray-500" key={i}>{item}</th>
                    )}
                    {/* <th className="text-balance text-center p-1 border-r border-gray-500">Commercial</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Head Office Cost </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Buyeing commission</th> */}
                    <th className="text-balance text-center p-1 border-r border-gray-500">Total Exp</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">SHORT+ EXTRA </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">CM per dzn Achieve</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">SMV</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Target CM per dzn</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">PROFIT/ LOSS</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {uniquePoStyle?.map((po_style, buyeri) => (
                    <PoStyleGroupSection
                      key={buyeri}
                      data={data}
                      bookingData={data.BudgetWiseCostBreakdownDto_Booking?.filter(f => f.PO_ID === po_style.PO_ID && f.STYLE_ID === po_style.STYLE_ID)}
                      fabricProcessType={fabricProcessType}
                      gmtProcessType={gmtProcessType}
                      commissionType={commissionType}
                      updateCommission={updateCommission}
                    />
                  ))}
                  <TotalRow
                    data={data}
                    title="Total"
                    gmtProcessType={gmtProcessType}
                    commissionType={commissionType}
                    fabricProcessType={fabricProcessType}
                  />
                </tbody>
              </table>

            </div>

            <Summary
              data={data}
              title="Total"
              gmtProcessType={gmtProcessType}
              commissionType={commissionType}
              fabricProcessType={fabricProcessType}
            />
          </div>
      )}
    </>
  );
}
