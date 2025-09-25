/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";
import { ICompany } from "@/reports/production/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import moment from "moment";

function ReportHeader({
  data,
}: {
  data: PrintEmbellishmentQualityReportMasterType[];
}) {
  const [companyData, setCompanyData] = useState<ICompany>();
  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${api.ProductionUrl}/production/Company/3`);
        if (res.data) {
          setCompanyData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="w-full pb-3 mb-4">
      {/* Date */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>{moment().format("DD-MMM-YYYY")}</span>
        <span className="italic">"CLICK"</span>
      </div>

      {/* Company Info */}
      {companyData?.NAME && (
        <div className="text-center">
          <h1 className="font-extrabold text-2xl text-gray-900 tracking-wide">
            {companyData?.NAME}
          </h1>
          <p className="text-sm text-gray-700">{companyData?.ADDRESS}</p>
        </div>
      )}

      {/* Report Title */}
      <div className="mt-3">
        <h2 className="font-bold text-lg text-center uppercase tracking-wide">
          <span className="px-4 py-1 bg-gray-100">
            {data[0]?.EmbType} Quality Check Report
          </span>
        </h2>
      </div>
    </div>
  );
}

export default ReportHeader;
