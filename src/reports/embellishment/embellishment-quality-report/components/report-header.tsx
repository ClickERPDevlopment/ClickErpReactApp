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
        await axios
          .get(
            `${api.ProductionUrl}/production/Company/3`, {
          }
          )
          .then((res) => {
            if (res.data) {
              setCompanyData(res.data);
            } else {
            }
          })
          .catch((m) => console.log(m));

      } catch {
      }
    }
    getData();
  }, []);

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        companyData?.NAME && <>
          <h1 className="font-bold text-xl text-center">
            {
              companyData?.NAME
            }
          </h1>
          <h4 className="font-bold text-sm text-center mb-2">
            {
              companyData?.ADDRESS
            }
          </h4>
        </>
      }
      <h3 className="font-bold text-xl text-center uppercase ">
        {data[0]?.EmbType} Quality Check Report
      </h3>
    </div>
  );
}

export default ReportHeader;
