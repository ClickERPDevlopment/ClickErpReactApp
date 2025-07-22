/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { OperationBulletinReportType } from "./operation-bulletin-report-type";
import { OperationBulletinMCDayWiseTargetReportType } from "./operation-bulletin-mc-day-wise-target-report-type";
import { OperationBulletinNameRemarksReportType } from "./operation-bulletin-name-remarks-report-type";
import { OperationBulletinSummaryReportType } from "./operation-bulletin-summary-report-type";
import OperationBulletinSummary from "./operation-bulletin-summary/operation-bulletin-summary";
import OperationBulletinMCDayWiseTarget from "./operation-bulletin-mc-day-wise-target/operation-bulletin-mc-day-wise-target";
import OperationBulletinMCSummary from "./operation-bulletin-mc-summary/operation-bulletin-mc-summary";
import OperationBulletinNameRemarks from "./operation-bulletin-name-remarks/operation-bulletin-name-remarks";
import ReportHeader from "./components/report-header";
import ReportFooter from "./components/report-footer";

function OperationBulletinReport() {

  const [bulletinData, setBulletinData] = useState<OperationBulletinReportType[]>(
    []
  );

  const [bulletinMCDayWiseTargetData, setBulletinMCDayWiseTargetData] = useState<OperationBulletinMCDayWiseTargetReportType[]>(
    []
  );

  const [bulletinNameRemarksData, setBulletinNameRemarksData] = useState<OperationBulletinNameRemarksReportType[]>(
    []
  );

  const [bulletinSummaryData, setBulletinSummaryData] = useState<OperationBulletinSummaryReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const factoryId = searchParams.get("factoryId") || "0";
  const sectionId = searchParams.get("sectionId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const learningCurveId = searchParams.get("learningCurveId") || "0";


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/OperationBulletinReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setBulletinData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));


        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/OperationBulletinMCDayWiseTargetReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setBulletinMCDayWiseTargetData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/OperationBulletinSummaryReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setBulletinSummaryData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));


        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/OperationBulletinNameRemarksReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setBulletinNameRemarksData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));


        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, []);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-[50%] print:min-w-[50%] font-bold mb-5" style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}>
        <div>
          <ReportHeader data={bulletinData} />
        </div>
        <div>

          <div className="flex justify-between mt-3">
            <div>
              <table className="font-bold align-top">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="align-top">Buyer</td>
                    <td className="align-top">: {bulletinData[0]?.BUYERNAME}</td>
                  </tr>
                  <tr>
                    <td className="align-top">Style No</td>
                    <td className="align-top">: {bulletinData[0]?.STYLENO}</td>
                  </tr>
                  <tr>
                    <td className="align-top">Style Description</td>
                    <td className="align-top">: {bulletinData[0]?.STYLENAME}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="font-bold">
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="align-top">Planned Tr</td>
                    <td className="align-top">: {bulletinData[0]?.TARGERPERHOUR}</td>
                  </tr>
                  <tr>
                    <td className="align-top">Planned Eff</td>
                    <td className="align-top">: {bulletinData[0]?.EFFICIENCY} %</td>
                  </tr>
                  <tr>
                    <td className="align-top">Tr 100% Eff</td>
                    <td className="align-top">: {(bulletinData[0]?.TOTALALLOTTEDMP * 60) / bulletinData[0]?.TOTALSMV} %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
        <div className="flex justify-between mt-3 gap-2">
          <div className="w-[75%]">
            <OperationBulletinSummary data={bulletinSummaryData} />
          </div>
          <div className="w-[25%]">
            <table className="border-collapse border border-gray-300  w-[100%] mt-3">
              <thead className="sticky top-0 print:static bg-white print:bg-transparent">
                <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
                  <th colSpan={2} className="border border-gray-950 p-0.5">Summary View</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border border-gray-950 p-0.5">Total SMV</td>
                  <td className="border border-gray-950 p-0.5">{bulletinData[0]?.TOTALSMV}</td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-950 p-0.5">Total Req. MP</td>
                  <td className="border border-gray-950 p-0.5">{bulletinData[0]?.TOTALREQUIREMP}</td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-950 p-0.5">Total All. MP</td>
                  <td className="border border-gray-950 p-0.5">{bulletinData[0]?.TOTALALLOTTEDMP}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-3">
          <div className="min-w-[80%]">
            <OperationBulletinMCDayWiseTarget data={bulletinMCDayWiseTargetData} />
          </div>
          <div className="min-w-[20%]">
            <OperationBulletinMCSummary data={bulletinData} />
          </div>
        </div>
        <Report data={bulletinData}></Report>
        <div>
          <OperationBulletinNameRemarks data={bulletinNameRemarksData} />
        </div>
        <div>
          <ReportFooter data={bulletinData}></ReportFooter>
        </div>
      </div>
    </>
  );
}
export default OperationBulletinReport;
