/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useApiUrl from "../../../../hooks/use-ApiUrl";
import TableSkeleton from "../../../../components/table-skeleton";
import { IAtoZReport } from "./components/IAtoZReport";
import TotalRow from "./components/total-row";
import BuyerGroupSection from "./components/buyer-group-section";
import { Skeleton } from "@/components/ui/skeleton";
import AppAlert from "@/components/app-alert";
import useAxiosInstance from "@/lib/axios-instance";

export default function AtoZReportIndex() {
  const [data, setData] = useState<IAtoZReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const axios = useAxiosInstance();


  let isOpmWise: boolean = false;
  let fromOpmDate: string | null = "";
  let toOpmDate: string | null = "";
  let companyId: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let styleId: string | null = "";

  if (searchParams.get("isOpmWise")) {
    isOpmWise = true;
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

  const api = useApiUrl();

  useEffect(() => {
    document.title = "A-Z Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/AtoZReport??isOpmWise=${isOpmWise}&fromOpmDate=${fromOpmDate}&toOpmDate=${toOpmDate}&companyId=${companyId}&buyerId=${buyerId}&poId=${poId}&styleId=${styleId}`
          )
          .then((res) => {
            if (res.data) {
              setData(res.data);
              requestAnimationFrame(() => {
                setIsRendering(false);
              });
              setIsLoading(false);
            } else {
              console.log('error', res);
              setError('Can not load data. Please try again later.');
            }
          })
          .catch((m) => {
            setError('Can not load data. Please try again later.');
            console.log('error', m)
            setIsLoading(false);
            setIsRendering(false);
          }
          );

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const uniqueBuyer = [...new Set(data?.map(item => item.BUYER))];

  return (
    <>
      {isLoading || isRendering ? (
        <>
          <h3 className=" text-center p-1 m-4 text-3xl font-bold ">
            <Skeleton className="min-h-10 min-w-64" />
          </h3>
          <TableSkeleton />
        </>
      ) : (
        error ? <AppAlert message={error} type="error" /> :
          <div className="">
            <div className="">
              {/* <h1 className="text-center font-bold text-2xl">A-Z Report</h1>
              <h5 className="text-center font-bold text-base">Order Placement Month from {moment(fromOpmDate).format("MMM-YYYY")} to {moment(toOpmDate).format("MMM-YYYY")}</h5> */}
            </div>

            <div className="border border-gray-500 rounded-md my-5 max-h-screen/20 m-1">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="min-w-[100px]  text-balance  text-center p-1 rounded-tl-md border-r border-gray-500" rowSpan={2}>
                      Buyer
                    </th>
                    <th className="min-w-[100px]  text-balance  text-center p-1 border-r border-gray-500 " rowSpan={2}>
                      Order/Job #
                    </th>
                    <th className="min-w-[100px] text-balance  text-center p-1  border-r border-gray-500" rowSpan={2}>
                      Style
                    </th>
                    <th className="min-w-[70px] text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>
                      Qrder Qty [A]
                    </th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Consumption release Dt. </th>
                    <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={6}>Yarn</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Yarn Issue Last.Dt.</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Start Dt.</th>
                    <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Knitting</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Close Dt.</th>
                    <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={7}>Dyeing</th>
                    <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Finish fabric</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Fin Fabrics Del. Last Date</th>
                  </tr>
                  <tr>
                    {/* <th colSpan={6}>Yarn</th> */}

                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Required (KG) [B]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Allocation [C]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Bal <span className="text-nowrap">[D=B-C]</span>	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Yarn Allocation Close Dt.	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Issue [E]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Issue Bal <span className="text-nowrap">[F=C-E] </span></th>


                    {/* <th colSpan={3}>Knitting</th> */}
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Knitting Qty [G]	<span className="hidden">(Grey rcv by gmt) </span></th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  "> Knitting Bal <span className="text-nowrap">[H=B-G]</span></th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  "> WIP <span className="text-nowrap">[I=E-G]</span></th>


                    {/* <th colSpan={7}>Dyeing</th> */}
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Gray rcvd [J]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Batch Qty [K]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Ready for batch <span className="text-nowrap">[L=J-K]</span> 	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500  ">Dyeing Qty [M]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Finishing Qty [N]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Deliver Qty [O]	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">RFT <span className="text-nowrap">[P=N-O]</span> 	</th>

                    {/* <th colSpan={3}>Finish fabric</th> */}
                    <th className="text-balance text-center p-1 border-r border-gray-500">Req Qty<span className="text-nowrap">[Q=B*0.89]</span> 	</th>
                    <th className="text-balance text-center p-1 border-r border-gray-500">Rcvd Qty [R]	</th>
                    <th className="text-balance text-center p-1  border-r border-gray-500">Revd Bal <span className="text-nowrap">[S=Q-R]</span> </th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {uniqueBuyer?.map((x, i) => (
                    <BuyerGroupSection data={data?.filter(y => y.BUYER === x)} key={i} />
                  ))}
                  <TotalRow data={data} title="Total" />
                </tbody>
              </table>
            </div>
          </div>
      )}
    </>
  );
}
