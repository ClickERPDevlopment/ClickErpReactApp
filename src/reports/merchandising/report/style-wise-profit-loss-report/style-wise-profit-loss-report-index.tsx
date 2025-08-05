import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import moment from "moment";

import useApiUrl from "../../../../hooks/use-ApiUrl";
import TableSkeleton from "../../../../components/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IStyleWiseProfitLossReport } from "./components/IStyleWiseProfitLossReport";
import { cn } from "@/lib/utils";

export default function StyleWiseProfitLossReportIndex() {
  const [data, setData] = useState<IStyleWiseProfitLossReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  //
  let month: string | null = "";
  let buyerId: string | null = "";
  let companyId: string | null = "";


  if (searchParams.get("month")) {
    month = searchParams.get("month");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }
  console.log("month: ", month);
  console.log("buyerId: ", buyerId);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Style-wise profit loss report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/StyleWiseProfitLossReport?month=${month}&buyerId=${buyerId}&companyId=${companyId}`
          )
          .then((res) => {
            if (res.data) {
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

  return (
    <>
      {isLoading ? (
        <>
          <h3 className=" text-center p-1 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </>
      ) : (

        data.length === 0 ?
          <div className="bg-sky-100 border-t border-b border-sky-500 text-sky-700 px-4 py-3 mt-16" role="alert">
            <p className="font-bold text-xl">Informational message</p>
            <p className="text-base">No Data Found. Please check "Style Wise Cost Breakdown" Entry.</p>
          </div>
          :
          <div className="m-5 print:m-0">

            <div>
              <h1 className="text-center font-bold text-2xl">Style-wise Profit & Loss Report</h1>
              <h5 className="text-center font-bold text-base">Month: {moment(month).format("MMM-YYYY")}</h5>
            </div>

            <div className="border border-gray-500 rounded-md my-5">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="min-w-[100px]  text-balance  text-center p-1 rounded-tl-md">
                      Buyer
                    </th>
                    <th className="min-w-[100px]  text-balance  text-center p-1 ">
                      Style
                    </th>
                    <th className="min-w-[100px] text-balance  text-center p-1 ">
                      Job No
                    </th>
                    <th className="text-balance text-center p-1 ">
                      Order Qty
                    </th>
                    <th className="text-balance text-center p-1 ">Ship Qty </th>
                    <th className="text-balance text-center p-1 ">Fabric Cost</th>
                    <th className="text-balance text-center p-1 ">Accessories Cost</th>
                    <th className="text-balance text-center p-1 ">Emblishment Cost</th>
                    <th className="text-balance text-center p-1 ">Commercial Cost</th>
                    <th className="text-balance text-center p-1 ">CM Cost</th>
                    <th className="text-balance text-center p-1 ">Total Cost</th>
                    <th className="text-balance text-center p-1 ">Ship Value</th>
                    <th className="text-balance text-center p-1 rounded-tr-md ">Profit/Loss</th>

                  </tr>
                </thead>
                <tbody id="table-body">
                  {data?.map((x, i) => (
                    <tr className={cn("border-t border-gray-500",
                      i % 2 ? 'bg-emerald-50' : ''
                    )} key={i}>
                      <td className="text-balance  text-center p-1">
                        {x.BUYER}
                      </td>
                      <td className="text-balance text-center p-1">
                        {x.STYLENO}
                      </td>
                      <td className=" text-balance  text-center p-1">{x.PONO}</td>
                      <td className=" text-balance  text-center p-1">{x.ORDER_QTY}</td>
                      <td className=" text-balance  text-center p-1">{x.SHIP_QTY}</td>
                      <td className=" text-balance  text-center p-1">{x.FABRIC_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.ACCESSORIES_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.EMBLISHMENT_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.COMMERCIAL_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.CM_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.TOTAL_COST}</td>
                      <td className=" text-balance  text-center p-1">{x.SHIP_VALUE}</td>
                      <td className=" text-balance  text-center p-1">{x.PROFIT_LOSS}</td>
                    </tr>
                  ))}

                  <tr className={cn("border-t border-gray-500 font-bold")} >
                    <td className="text-balance  text-center p-1" colSpan={4}>
                      Total
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.SHIP_QTY, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.FABRIC_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.ACCESSORIES_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.EMBLISHMENT_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.COMMERCIAL_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.CM_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.TOTAL_COST, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.SHIP_VALUE, 0).toFixed(2)
                      }
                    </td>
                    <td className=" text-balance  text-center p-1">
                      {
                        data.reduce((p, c) => p + c.PROFIT_LOSS, 0).toFixed(2)
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      )}
    </>
  );
}
