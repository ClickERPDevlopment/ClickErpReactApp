/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import { useEffect, useState } from "react";

function ReportHeader({
  data,
}: {
  data: OperationBulletinReportType[];
}) {

  const api = useApiUrl();

  const [styleImage, setStyleImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImage(data[0]?.STYLEID || 0);
  }, [data[0]?.STYLEID]);

  const fetchImage = async (id: number) => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (styleImage) {
          URL.revokeObjectURL(styleImage);
        }
        setStyleImage(url);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="w-[100%] ">
      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <div className="flex justify-between">
        <div className="w-[80%]">

          <h1 className="font-bold text-xl text-start">
            {
              data[0]?.FACCOMPANYNAME
            }
          </h1>
          <h1 className="font-bold text-md text-start">
            {
              data[0]?.FACCOMPANYADDRESS + " " + data[0]?.COMPANYUTILITY
            }
          </h1>

          <h3 className="font-bold text-lg text-start">
            {data[0]?.MAINSECTION} Operation Bulletin
          </h3>
        </div>
        <div className="w-[20%] text-end ms-auto">
          <img
            src={styleImage || ""}
            alt="Style Image"
            className="w-[100%] h-auto object-cover"
          />
        </div>
      </div>

    </div>
  );
}

export default ReportHeader;
